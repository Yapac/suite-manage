import { Space, Tag } from "antd";

import { Staff } from "@/utils/schemas.types";
import CustomAvatar from "./custom-avatar";

type Props = {
  user: Staff;
};

// display a user's avatar and name in a tag
export const UserTag = ({ user }: Props) => {
  return (
    <Tag
      key={user.id}
      style={{
        padding: 2,
        paddingRight: 8,
        borderRadius: 24,
        lineHeight: "unset",
        marginRight: "unset",
      }}
    >
      <Space size={4}>
        <CustomAvatar
          src={user.avatar}
          name={user.name}
          style={{ display: "inline-flex" }}
        />
        {user.name}
      </Space>
    </Tag>
  );
};
