import {
  KanbanBoard,
  KanbanBoardContainer,
} from "@/components/tasks/kanban/board";
import TaskCard from "@/components/tasks/kanban/card";
import KanbanColumn from "@/components/tasks/kanban/column";
import KanbanItem from "@/components/tasks/kanban/item";
import { DASHBOARD_CALENDAR_UPCOMING_TASKS_QUERY } from "@/utils/queries";
import { useList } from "@refinedev/core";
import React from "react";

const TasksList = () => {
  const stages = ["pending", "in-progress", "completed", "cancelled"];
  const { data: tasks, isLoading: isLoadingTasks } = useList({
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

  const handleAddCard = ({ stageId }: any) => {
    console.log("create new stage Id");
  };
  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard>
          <KanbanColumn
            id="pending"
            title="pending"
            count={
              taskStages.columns ? taskStages?.columns[0]?.tasks.length : 0
            }
            onAddClick={() => handleAddCard({ stageId: "pending" })}
          >
            {taskStages.columns ? (
              taskStages?.columns[0]?.tasks.map((task: any) => (
                <KanbanItem
                  key={task.id}
                  id={task.id}
                  data={{ ...task, status: "pending" }}
                >
                  <TaskCard {...task} createdAt={task.createdAt} />
                </KanbanItem>
              ))
            ) : (
              <p>None</p>
            )}
          </KanbanColumn>
        </KanbanBoard>
      </KanbanBoardContainer>
    </>
  );
};

export default TasksList;
