import { KanbanColumnSkeleton, ProjectCardSkeleton } from "@/components";
import { KanbanAddCardButton } from "@/components/tasks/kanban/add-card-button";
import {
  KanbanBoard,
  KanbanBoardContainer,
} from "@/components/tasks/kanban/board";
import TaskCard, { TaskCardMemo } from "@/components/tasks/kanban/card";
import KanbanColumn from "@/components/tasks/kanban/column";
import KanbanItem from "@/components/tasks/kanban/item";
import {
  DASHBOARD_CALENDAR_UPCOMING_TASKS_QUERY,
  UPDATE_TASK_MUTATION,
} from "@/utils/queries";
import { DragEndEvent } from "@dnd-kit/core";
import { useList, useNavigation, useUpdate } from "@refinedev/core";
import React from "react";

const TasksList = ({ children }: React.PropsWithChildren) => {
  const { replace } = useNavigation();
  const stages = ["pending", "in-progress", "completed", "cancelled"];
  const { data: tasks, isLoading } = useList({
    resource: "tasks",

    pagination: {
      mode: "off",
    },
    meta: {
      gqlQuery: DASHBOARD_CALENDAR_UPCOMING_TASKS_QUERY,
      variables: {
        sortBy: "createdAt",
        order: "asc",
      },
    },
  });

  const { mutate: updateTask } = useUpdate();
  const taskStages = React.useMemo(() => {
    if (!tasks?.data || !stages) {
      return {
        stages: [],
      };
    }
    const grouped: any = stages.map((stage) => ({
      stage: stage,
      tasks: tasks.data.filter((task) => task.status === stage),
    }));
    return {
      columns: grouped,
    };
  }, [stages, tasks]);

  console.log(taskStages);

  const handleAddCard = (args: { stageId: string }) => {
    const path = `/tasks/new?status=${args.stageId}`;
    replace(path);
  };
  const handleoOnDragEnd = (event: DragEndEvent) => {
    let stageId = event.over?.id as undefined | string | null;
    const taskId = event.active.id as string;
    const taskStageId = event.active.data.current?.status;

    console.log(stageId, taskId, taskStageId);
    if (taskStageId === stageId) return;

    updateTask({
      resource: "tasks",
      id: taskId,
      values: {
        status: stageId,
      },
      mutationMode: "optimistic",
      meta: {
        gqlMutation: UPDATE_TASK_MUTATION,
      },
      successNotification: false,
    });
  };

  if (isLoading) return <PageSkeleton />;
  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard onDragEnd={handleoOnDragEnd}>
          {taskStages.columns?.map((column: any) => (
            <KanbanColumn
              key={column.stage}
              id={column.stage}
              title={column.stage}
              count={column.tasks.length}
              onAddClick={() => handleAddCard({ stageId: column.stage })}
            >
              {!isLoading &&
                column.tasks.map((task: any) => (
                  <KanbanItem key={task.id} id={task.id} data={task}>
                    <TaskCardMemo
                      {...task}
                      createdAt={task.createdAt || undefined}
                    ></TaskCardMemo>
                  </KanbanItem>
                ))}
              {!column.tasks.length && (
                <KanbanAddCardButton
                  onClick={() => handleAddCard({ stageId: column.stage })}
                />
              )}
            </KanbanColumn>
          ))}
        </KanbanBoard>
      </KanbanBoardContainer>
      {children}
    </>
  );
};

export default TasksList;

const PageSkeleton = () => {
  const columnCount = 6;
  const itemCount = 4;
  return (
    <KanbanBoardContainer>
      {Array.from({ length: columnCount }).map((_, index) => (
        <KanbanColumnSkeleton key={index}>
          {Array.from({ length: itemCount }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </KanbanColumnSkeleton>
      ))}
    </KanbanBoardContainer>
  );
};
