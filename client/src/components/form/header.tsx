import { MarkdownField } from "@refinedev/antd";

import { Typography, Space, Tag } from "antd";

import dayjs from "dayjs";

import { Text } from "../text";
import { UserTag } from "../user-tag";
import { Staff, Task } from "@/utils/schemas.types";
import { getDateColor } from "@/utils/date";

type DescriptionProps = {
  description?: Task["description"];
};

type DueDateProps = {
  dueData?: Task["createdAt"];
};

type UserProps = {
  users?: Staff[];
};

// display a task's descriptio if it exists, otherwise display a link to add one
export const DescriptionHeader = ({ description }: DescriptionProps) => {
  if (description) {
    return (
      <Typography.Paragraph ellipsis={{ rows: 8 }}>
        <MarkdownField value={description} />
      </Typography.Paragraph>
    );
  }

  // if the task doesn't have a description, display a link to add one
  return <Typography.Link>Add task description</Typography.Link>;
};

// display a task's due date if it exists, otherwise display a link to add one
export const DueDateHeader = ({ dueData }: DueDateProps) => {
  if (dueData) {
    const color = getDateColor({
      date: dueData,
      defaultColor: "processing",
    });

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
          return "Processing";
      }
    };

    return (
      <Space size={[0, 8]}>
        <Tag color={color}>{getTagText()}</Tag>
        <Text>{dayjs(dueData).format("MMMM D, YYYY - h:ma")}</Text>
      </Space>
    );
  }

  return <Typography.Link>Add due date</Typography.Link>;
};

// display a task's users if it exists, otherwise display a link to add one
export const UsersHeader = ({ users = [] }: UserProps) => {
  if (users.length > 0) {
    return (
      <Space size={[0, 8]} wrap>
        {users.map((user) => (
          <UserTag key={user.id} user={user} />
        ))}
      </Space>
    );
  }

  // if the task doesn't have users, display a link to add one
  return <Typography.Link>Assign to users</Typography.Link>;
};
