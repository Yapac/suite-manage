import { SaveButton, useForm } from "@refinedev/antd";
import type { HttpError } from "@refinedev/core";

import {
  CloseOutlined,
  MailOutlined,
  PhoneOutlined,
  PictureOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Drawer, Form, Input, List, message, Spin, Upload } from "antd";

import CustomAvatar from "../../custom-avatar";
import { getNameInitials } from "@/utils/get-name-initials";
import { Text } from "../../text";
import { Staff, StaffInputDTO } from "@/utils/schemas.types";
import { UPDATE_STAFF_MUTATION } from "@/utils/queries";
import { data } from "react-router";
import { getBase64 } from "@/utils/helpers";

type Props = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  userId: string;
};

export const AccountSettings = ({ opened, setOpened, userId }: Props) => {
  const {
    saveButtonProps,
    formProps,

    query: queryResult,
  } = useForm<any, HttpError>({
    resource: "staffs",
    action: "edit",
    id: userId,
    mutationMode: "optimistic",
    redirect: false,
    meta: {
      gqlMutation: UPDATE_STAFF_MUTATION,
    },

    onMutationSuccess: () => {
      // Close drawer instead of navigating
      setOpened(false);
    },
  });

  const closeModal = () => {
    setOpened(false);
  };

  if (queryResult?.isLoading) {
    return (
      <Drawer
        open={opened}
        width={756}
        mask={true}
        styles={{
          body: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Spin />
      </Drawer>
    );
  }

  const staff = queryResult?.data?.data;

  return (
    <Drawer
      onClose={closeModal}
      open={opened}
      mask={true}
      width={756}
      styles={{
        header: { display: "none" },
        body: { padding: 0 },
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
        }}
      >
        <Text strong>Account Settings</Text>
        <Button type="text" icon={<CloseOutlined />} onClick={closeModal} />
      </div>
      <div style={{ padding: "16px" }}>
        <Card>
          <div
            style={{
              display: "flex",

              alignItems: "center",
            }}
          >
            <CustomAvatar
              shape="square"
              src={staff?.avatar}
              name={getNameInitials(`${staff?.name || ""} `)}
              style={{
                width: 96,
                height: 96,
                marginBottom: "24px",
              }}
            />
            <div style={{ marginLeft: "16px", paddingBottom: "24px" }}>
              <Text size="xl" strong>
                {staff.name}
              </Text>
              <br />

              <Text
                type="secondary"
                strong
                style={{ textTransform: "capitalize" }}
              >
                {staff.role ?? "No role assigned"}
              </Text>
            </div>
          </div>

          <Form {...formProps} layout="vertical">
            <Form.Item label="Name" name="name">
              <Input placeholder="Name" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input
                placeholder="Email"
                type="email"
                prefix={<MailOutlined />}
              />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input placeholder="Phone" prefix={<PhoneOutlined />} />
            </Form.Item>
            <Form.Item label="Avatar" name="avatar">
              <Upload
                maxCount={1}
                showUploadList={true}
                listType="picture"
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
                <Button icon={<UploadOutlined />}>Change Avatar</Button>
  
              </Upload>     
            </Form.Item>
          </Form>
          <SaveButton
            {...saveButtonProps}
            style={{
              display: "flex",
              gap: "5px",
              marginLeft: "auto",
            }}
          />
        </Card>
      </div>
    </Drawer>
  );
};
