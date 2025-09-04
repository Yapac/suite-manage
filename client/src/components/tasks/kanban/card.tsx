import CustomAvatar from "@/components/custom-avatar";
import { Text } from "@/components/text";
import { TextIcon } from "@/components/text-icon";
import { DELETE_TASK_MUTATION } from "@/utils/queries";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Edit } from "@refinedev/antd";
import { useDelete, useNavigation } from "@refinedev/core";
import {
  Button,
  Card,
  ConfigProvider,
  Dropdown,
  MenuProps,
  Space,
  Tag,
  theme,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import { title } from "process";
import React, { memo, useMemo } from "react";

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

  const { edit } = useNavigation();

  const { mutate: deleteMutation } = useDelete();

  const dropDownItems = useMemo(() => {
    const dropDownItems: MenuProps["items"] = [
      {
        label: "View card",
        key: "1",
        icon: <EyeOutlined />,
        onClick: () => {
          edit("tasks", id, "replace");
        },
      },
      {
        danger: true,
        label: "Delete card",
        key: "2",
        icon: <DeleteOutlined />,
        onClick: () => {
          deleteMutation({
            resource: "tasks",
            id: id,
            meta: {
              gqlMutation: DELETE_TASK_MUTATION,
            },
          });
        },
      },
    ];
    return dropDownItems;
  }, []);
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
        onClick={() => {}}
        extra={
          <Dropdown
            trigger={["click"]}
            menu={{
              items: dropDownItems,
            }}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
          >
            <Button
              type="text"
              shape="circle"
              icon={<MoreOutlined />}
              style={{ transform: "rotate(90deg)" }}
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
            />
          </Dropdown>
        }
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <TextIcon style={{ marginRight: "4px" }} />
          <Tag
            icon={<ClockCircleOutlined style={{ fontSize: "12px" }} />}
            style={{
              padding: "0 4px",
              marginInlineEnd: "0",
              backgroundColor: "transparent",
            }}
            color="purple"
            bordered={true}
          >
            {dayjs(createdAt).format("MMM DD")}
          </Tag>
          {!!assignedTo && (
            <Space
              size={4}
              wrap
              direction="horizontal"
              align="center"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginLeft: "auto",
                marginRight: 0,
              }}
            >
              <Tooltip key={assignedTo.id} title={assignedTo.name}>
                <CustomAvatar
                  name={assignedTo.name}
                  src={assignedTo.avatarUrl}
                />
              </Tooltip>
            </Space>
          )}
        </div>
      </Card>
    </ConfigProvider>
  );
};

export default TaskCard;

export const TaskCardMemo = memo(TaskCard, (prev, next) => {
  return (
    prev.id === next.id &&
    prev.title === next.title &&
    prev.createdAt === next.createdAt &&
    prev.assignedTo === next.assignedTo
  );
});
