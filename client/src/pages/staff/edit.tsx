import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { UPDATE_STAFF_MUTATION } from "@/utils/queries";

const StaffEdit = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({
    redirect: "list",
    meta: {
      gqlMutation: UPDATE_STAFF_MUTATION,
    },
    queryOptions: {
      onSuccess: (data) => {
        const staff = data?.data;
        formProps.form?.setFieldsValue({
          ...staff,
        });
      },
    },
  });

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
      title="Edit Staff"
    >
      <Form {...formProps} layout="vertical">
        {/* Name */}
        <Form.Item
          label={
            <Tooltip title="The full name of the staff member">
              Name <InfoCircleOutlined style={{ color: "#999" }} />
            </Tooltip>
          }
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Enter staff name" />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label={
            <Tooltip title="Email address of the staff">
              Email <InfoCircleOutlined style={{ color: "#999" }} />
            </Tooltip>
          }
          name="email"
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input placeholder="Enter staff email" />
        </Form.Item>

        {/* Phone */}
        <Form.Item
          label={
            <Tooltip title="Phone number of the staff">
              Phone <InfoCircleOutlined style={{ color: "#999" }} />
            </Tooltip>
          }
          name="phone"
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>

        {/* Role */}
        <Form.Item
          label={
            <Tooltip title="Select the role of the staff member">
              Role <InfoCircleOutlined style={{ color: "#999" }} />
            </Tooltip>
          }
          name="role"
          rules={[{ required: true, message: "Role is required" }]}
        >
          <Select
            placeholder="Select role"
            options={[
              { label: "Admin", value: "admin" },
              { label: "Receptionist", value: "receptionist" },
              { label: "Housekeeping", value: "housekeeping" },
              { label: "Maintenance", value: "maintenance" },
            ]}
          />
        </Form.Item>

        {/* Avatar */}
        <Form.Item
          label={
            <Tooltip title="Optional avatar URL for profile picture">
              Avatar URL <InfoCircleOutlined style={{ color: "#999" }} />
            </Tooltip>
          }
          name="avatarUrl"
        >
          <Input placeholder="Enter avatar URL" />
        </Form.Item>
      </Form>
    </Edit>
  );
};

export default StaffEdit;
