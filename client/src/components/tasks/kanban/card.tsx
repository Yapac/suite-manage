import { Text } from "@/components/text";
import { Card, ConfigProvider, theme } from "antd";
import React from "react";

type ProjectCardProps = {
  id: string;
  title: string;
  createdAt: string;
  assignedTo: {
    id: string;
    name: string;
    avatarUrl: any;
  };
};
const TaskCard = ({ id, title, createdAt, assignedTo }: ProjectCardProps) => {
  const { token } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            colorText: token.colorTextSecondary,
          },
          Card: {
            headerBg: "transparent",
          },
        },
      }}
    >
      <Card
        size="small"
        title={<Text ellipsis={{ tooltip: title }}>{title}</Text>}
      ></Card>
    </ConfigProvider>
  );
};

export default TaskCard;
