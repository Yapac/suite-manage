import { Create, useForm } from "@refinedev/antd";
import { Button, Form, Input, message, Select, Tooltip, Upload } from "antd";
import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { CREATE_STAFF_MUTATION } from "@/utils/queries";
import React from "react";
import { getBase64 } from "@/utils/helpers";

const StaffCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm({
    action: "create",
    resource: "staffs",
    redirect: "list",
    mutationMode: "pessimistic",
    meta: {
      gqlMutation: CREATE_STAFF_MUTATION,
    },
  });

  return (
    <>
      <Create saveButtonProps={saveButtonProps} title="Add Staff Member">
        <Form {...formProps} layout="vertical">
          {/* Full Name */}
          <Form.Item
            label={
              <Tooltip title="Enter the staff member's full name">
                Full Name <InfoCircleOutlined style={{ color: "#999" }} />
              </Tooltip>
            }
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Enter staff name" />
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
              options={[
                { label: "Admin", value: "admin" },
                { label: "Receptionist", value: "receptionist" },
                { label: "Housekeeping", value: "housekeeping" },
                { label: "Maintenance", value: "maintenance" },
              ]}
              placeholder="Select role"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label={
              <Tooltip title="Email of the staff member">
                Email <InfoCircleOutlined style={{ color: "#999" }} />
              </Tooltip>
            }
            name="email"
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label={
              <Tooltip title="Set a secure password for the staff member">
                Password <InfoCircleOutlined style={{ color: "#999" }} />
              </Tooltip>
            }
            name="password"
            rules={[
              { required: true, message: "Password is required" },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          {/* Phone */}
          <Form.Item
            label={
              <Tooltip title="Phone number of the staff member">
                Phone <InfoCircleOutlined style={{ color: "#999" }} />
              </Tooltip>
            }
            name="phone"
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          {/* Avatar URL */}
          <Form.Item label="Avatar" name="avatar">
            <Upload
              listType="text"
              maxCount={1}
              beforeUpload={async (file) => {
                const base64 = await getBase64(file);
                // save Base64 into the form field
                formProps.form?.setFieldsValue({ avatar: base64 });
                message.success(`${file.name} uploaded successfully.`);
                // prevent automatic upload
                return Upload.LIST_IGNORE;
              }}
              onRemove={() => {
                formProps.form?.setFieldsValue({ avatar: null });
              }}
            >
              <Button icon={<UploadOutlined />}>Upload Avatar</Button>
            </Upload>     
          </Form.Item>
        </Form>
      </Create>
    </>
  );
};

export default StaffCreate;
