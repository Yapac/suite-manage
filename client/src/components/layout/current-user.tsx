import { Button, Popover } from "antd";
import React, { useState } from "react";
import CustomAvatar from "../custom-avatar";
import { useGetIdentity, useLogout } from "@refinedev/core";
import { Staff } from "../../utils/schemas.types";
import { Text } from "../text";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { AccountSettings } from "./account-settings";

export const CurrentUser = () => {
  const { data: user } = useGetIdentity<Staff>();

  console.log(user);
  
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: logout } = useLogout();

  const content = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Text strong style={{ padding: "12px 20px" }}>
        {user?.name} (
        <span style={{ color: "#A71C71", textTransform: "capitalize" }}>
          {" "}
          {user?.role}{" "}
        </span>
        )
      </Text>

      <div
        style={{
          padding: "4px 8px",
          borderTop: "1px solid #d9d9d9",
          display: "flex",
          flexDirection: "column",
          gap: "4px ",
        }}
      >
        <Button
          style={{ textAlign: "left" }}
          icon={<SettingOutlined />}
          type="text"
          block
          onClick={() => setIsOpen(true)}
        >
          Account settings
        </Button>
      </div>
      <div
        style={{
          padding: "4px 8px",
          borderTop: "1px solid #d9d9d96f",
          display: "flex",
          flexDirection: "column",
          gap: "4px ",
        }}
      >
        <Button
          style={{ textAlign: "left" }}
          icon={<LogoutOutlined />}
          type="text"
          block
          onClick={() => logout()}
        >
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Popover
        placement="bottomRight"
        trigger={"click"}
        styles={{ body: { padding: 0 }, root: { zIndex: 999 } }}
        content={content}
      >
        <CustomAvatar
          name={user?.name}
          src={user?.avatar}
          size="default"
          style={{ cursor: "pointer" }}
        />
      </Popover>

      {user && (
        <AccountSettings
          opened={isOpen}
          setOpened={setIsOpen}
          userId={user.id}
        />
      )}
    </>
  );
};
