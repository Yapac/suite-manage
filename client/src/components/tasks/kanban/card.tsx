import CustomAvatar from "@/components/custom-avatar";
import { Text } from "@/components/text";
import { TextIcon } from "@/components/text-icon";
import { getDateColor } from "@/utils/date";
import { getRandomColorFromString } from "@/utils/get-random-color";
import { DELETE_TASK_MUTATION } from "@/utils/queries";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  FireOutlined,
  IeOutlined,
  MoreOutlined,
  SmileOutlined,
  WarningOutlined,
} from "@ant-design/icons";
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
import { memo, useMemo } from "react";

type ProjectCardProps = {
  id: string;
  title: string;
  createdAt: string;
  priority: string;
  assignedTo: {
    id: string;
    name: string;
    avatarUrl: any;
  }[];
};
const TaskCard = ({ id, title, createdAt, assignedTo, priority }: ProjectCardProps) => {
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
            mutationMode: "optimistic",
            meta: {
              gqlMutation: DELETE_TASK_MUTATION,
            },
          });
        },
      },
    ];
    return dropDownItems;
  }, []);
  const createdDateOptions = useMemo(() => {
    if (!createdAt) return null;

    const color = getDateColor({
      date: createdAt,
      defaultColor: "processing",
    });
    const date = dayjs(createdAt);

    const getTagText = () => {
      switch (color) {
        case "success":
          return "Today";
        case "warning":
          return "Yesterday";
        case "processing":
          return "Two days ago";
        case "error":
          return "Overdue";
        default:
          return date.format("MMM DD");
      }
    };

    return {
      color,
      text: getTagText(),
    };
  }, [createdAt]);
  const PriorityOptions = useMemo(() => {
    if (!priority) return null;

    const color = getRandomColorFromString(priority);

    const getTagIcon = () => {
      switch(priority) {
        case 'normal':
          return <SmileOutlined  style={{ color: 'green', fontSize: "14px" }} />;
        case 'urgent':
          return <WarningOutlined style={{ color: 'orange', fontSize: "14px" }} />;
        case 'immediate':
          return <FireOutlined style={{ color: 'red', fontSize: "14px" }} />;
      }
    };

    return {
      color,
      text:  priority,
      icon: getTagIcon()
    };
  }, [priority]);
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
        title={          
         <div style={{display: "inline-block",
              flex: 1,
              alignItems: "center",
              overflow: "clip",
              width: "-webkit-fill-available"}}> 
              
            {PriorityOptions && (
              <Tooltip title={`Priority: ${PriorityOptions.text}`}>
                <Tag
                  icon={PriorityOptions.icon}
                  style={{
                    padding: "0 6px 0 0",
                    marginTop: "1px",
                    marginInlineEnd: "0",
                    backgroundColor: "transparent",
                  }}
                  color={PriorityOptions.color}
                  bordered={PriorityOptions.color !== "default"}
                />
              </Tooltip>
            )}
            <Text ellipsis={{ tooltip: title }} >{title}</Text>
          </div>
        }
        onClick={() => edit("tasks", id, "replace")}
        extra={
          <Dropdown
            trigger={["click"]}
            menu={{
              items: dropDownItems,
              onPointerDown: (e) => {
                e.stopPropagation();
              },
              onClick: (e) => {
                e.domEvent.stopPropagation();
              },
            }}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
          >
            <Button
              type="text"
              shape="circle"
              icon={<MoreOutlined />}
              style={{ transform: "rotate(90deg)", pointerEvents: "fill" }}
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
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

          {createdDateOptions && (
            <Tag
              icon={<ClockCircleOutlined style={{ fontSize: "12px" }} />}
              style={{
                padding: "0 4px",
                marginInlineEnd: "0",
                backgroundColor:
                  createdDateOptions.color === "default"
                    ? "transparent"
                    : "unset",
              }}
              color={createdDateOptions.color}
              bordered={createdDateOptions.color !== "default"}
            >
              {createdDateOptions.text}
            </Tag>
          )}
          {!!assignedTo?.length && (
            <Space
              size={4}
              wrap
              direction="horizontal"
              align="center"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginLeft: "auto",
                marginRight: "0",
              }}
            >
              {assignedTo.map((user) => {
                return (
                  <Tooltip key={user.id} title={user.name}>
                    <CustomAvatar name={user.name} src={user.avatarUrl} />
                  </Tooltip>
                );
              })}
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
