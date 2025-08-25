import { SaveButton, useForm } from "@refinedev/antd";
import type { HttpError } from "@refinedev/core";

import {
  CloseOutlined,
  MailOutlined,
  PhoneOutlined,
  PictureOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Drawer, Form, Input, Spin } from "antd";

import CustomAvatar from "../../custom-avatar";
import { getNameInitials } from "@/utils/get-name-initials";
import { Text } from "../../text";
import { Staff, StaffInputDTO } from "@/utils/schemas.types";
import { UPDATE_STAFF_MUTATION } from "@/utils/queries";
import { data } from "react-router";

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
    meta: {
      gqlMutation: UPDATE_STAFF_MUTATION,
    },

    onMutationError: (data, variables, context, isAutoSave) => {
      console.log({ data, variables, context, isAutoSave });
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
        styles={{
          body: {
            background: "#f5f5f5",
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
          <CustomAvatar
            shape="square"
            src={staff?.avatarUrl}
            name={getNameInitials(`${staff?.name || ""} `)}
            style={{
              width: 96,
              height: 96,
              marginBottom: "24px",
            }}
          />

          <Form {...formProps} layout="vertical">
            <Form.Item label="Name" name="name">
              <Input placeholder="Name" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input placeholder="Email" prefix={<MailOutlined />} />
            </Form.Item>
            <Form.Item label="Role" name="role">
              <Input placeholder="Role" />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input placeholder="Phone" prefix={<PhoneOutlined />} />
            </Form.Item>
            <Form.Item label="Avatar URL" name="avatarUrl">
              <Input placeholder="Avatar URL" prefix={<PictureOutlined />} />
            </Form.Item>
          </Form>
          <SaveButton
            {...saveButtonProps}
            style={{
              display: "block",
              marginLeft: "auto",
            }}
          />
        </Card>
      </div>
    </Drawer>
  );
};
