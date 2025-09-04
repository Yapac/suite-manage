import {
  CREATE_TASK_MUTATION,
  LIST_GUESTS_QUERY,
  LIST_STAFFS_QUERY,
} from "@/utils/queries";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useModalForm, useSelect } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core";

import { Divider, Form, Input, Modal, Select, Tooltip } from "antd";

import { useSearchParams } from "react-router";

const TasksCreate = () => {
  // get search params from the url
  const [searchParams] = useSearchParams();

  const { list } = useNavigation();

  const { formProps, modalProps, close } = useModalForm({
    // specify the action to perform i.e., create or edit
    action: "create",
    // specify whether the modal should be visible by default
    defaultVisible: true,
    // specify the gql mutation to be performed
    resource: "tasks",
    meta: {
      gqlMutation: CREATE_TASK_MUTATION,
    },
  });

  type Staff = {
    id: string;
    name: string;
    role: string;
    email: string;
    phone: String;
    hireDate: string;
    avatarUrl: String;
  };
  // Select Tasks
  const { selectProps: staffsSelectProps } = useSelect<Staff>({
    resource: "staffs",
    meta: { gqlQuery: LIST_STAFFS_QUERY },
    optionLabel: (staff) => `${staff.name} (${staff.role})`,
    optionValue: "id",
  });

  return (
    <Modal
      {...modalProps}
      onCancel={() => {
        // close the modal
        close();

        // navigate to the list page of the tasks resource
        list("tasks", "replace");
      }}
      title="Add new card"
      width={512}
    >
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          // send to backend in correct shape
          formProps?.onFinish?.({
            ...values,
            status: searchParams.get("status") ?? "pending",
          });
        }}
      >
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <Tooltip title="Select the staff member to whom the task is assigned">
              Assigned to <InfoCircleOutlined style={{ color: "#999" }} />
            </Tooltip>
          }
          name="assignedTo"
          rules={[{ required: true, message: "Assigned to is required" }]}
        >
          <Select {...staffsSelectProps} placeholder="Select a staff member" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TasksCreate;
