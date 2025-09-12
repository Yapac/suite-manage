import { useState } from "react";

import { DeleteButton, useModalForm } from "@refinedev/antd";
import { useDelete, useNavigation } from "@refinedev/core";

import {
  AlignLeftOutlined,
  BankOutlined,
  FieldTimeOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";

import { DELETE_TASK_MUTATION, UPDATE_TASK_MUTATION } from "@/utils/queries";
import {
  DescriptionForm,
  DescriptionHeader,
  StageForm,
  TitleForm,
  UsersForm,
} from "@/components/form";
import {
  DueDateHeader,
  RoomHeader,
  UsersHeader,
} from "@/components/form/header";
import { Accordion } from "@/components/accordion";
import { RoomForm } from "@/components/form/room";

const TasksEdit = () => {
  const [activeKey, setActiveKey] = useState<string | undefined>();

  // use the list method to navigate to the list page of the tasks resource from the navigation hook
  const { list } = useNavigation();

  // create a modal form to edit a task using the useModalForm hook
  // modalProps -> It's an instance of Modal that manages modal state and actions like onOk, onCancel, etc.
  // close -> It's a function that closes the modal
  // queryResult -> It's an instance of useQuery from react-query
  const {
    modalProps,
    close,
    query: queryResult,
  } = useModalForm<any>({
    // specify the action to perform i.e., create or edit
    action: "edit",
    // specify whether the modal should be visible by default
    defaultVisible: true,
    // specify the gql mutation to be performed
    meta: {
      gqlMutation: UPDATE_TASK_MUTATION,
    },
  });

  // get the data of the task from the queryResult
  const { description, createdAt, assignedTo, roomId, title, id } =
    queryResult?.data?.data ?? {};

  const isLoading = queryResult?.isLoading ?? true;

  const { mutate: deleteMutation } = useDelete();

  return (
    <Modal
      {...modalProps}
      className="kanban-update-modal"
      onCancel={() => {
        close();
        list("tasks", "replace");
      }}
      title={<TitleForm initialValues={{ title }} isLoading={isLoading} />}
      width={586}
      footer={
        <DeleteButton
          type="link"
          recordItemId={id}
          resource="tasks"
          mutationMode="optimistic"
          meta={{
            gqlMutation: DELETE_TASK_MUTATION,
          }}
          onSuccess={() => {
            list("tasks", "replace");
          }}
        >
          Delete card
        </DeleteButton>
      }
    >
      {/* Render the stage form */}
      <StageForm isLoading={isLoading} />

      {/* Render the description form inside an accordion */}
      <Accordion
        accordionKey="description"
        activeKey={activeKey}
        setActive={setActiveKey}
        fallback={<DescriptionHeader description={description} />}
        isLoading={isLoading}
        icon={<AlignLeftOutlined />}
        label="Description"
      >
        <DescriptionForm
          initialValues={{ description }}
          cancelForm={() => setActiveKey(undefined)}
        />
      </Accordion>

      {/* Render the due date form inside an accordion */}
      <Accordion
        accordionKey="due-date"
        activeKey={"activeKey"}
        setActive={() => {}}
        fallback={<DueDateHeader dueData={createdAt} />}
        isLoading={isLoading}
        icon={<FieldTimeOutlined />}
        label="Due date"
      ></Accordion>

      {/* Render the users form inside an accordion */}
      <Accordion
        accordionKey="users"
        activeKey={activeKey}
        setActive={setActiveKey}
        fallback={<UsersHeader users={assignedTo} />}
        isLoading={isLoading}
        icon={<UsergroupAddOutlined />}
        label="Users"
      >
        <UsersForm
          initialValues={{
            assignedTo: assignedTo?.map((user: any) => ({
              label: user.name,
              value: user.id,
            })),
          }}
          cancelForm={() => setActiveKey(undefined)}
        />
      </Accordion>

      {/* Render the room form inside an accordion */}
      <Accordion
        accordionKey="roomId"
        activeKey={activeKey}
        setActive={setActiveKey}
        fallback={<RoomHeader room={roomId} />}
        isLoading={isLoading}
        icon={<HomeOutlined />}
        label="Room"
      >
        <RoomForm
          initialValues={{
            roomId: roomId
              ? [{ label: `Room ${roomId.number}`, value: roomId.id }]
              : [],
          }}
          cancelForm={() => setActiveKey(undefined)}
        />
      </Accordion>
    </Modal>
  );
};

export default TasksEdit;
