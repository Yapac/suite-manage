import { forwardRef } from "react";
import { Avatar as AntdAvatar, AvatarProps } from "antd";
import { getNameInitials } from "../utils/get-name-initials";

type Props = AvatarProps & {
  name?: string;
};

const CustomAvatar = forwardRef<HTMLSpanElement, Props>(
  ({ name, style, ...rest }, ref) => {
    return (
      <AntdAvatar
        ref={ref}
        alt={name?.toString() || "Avatar"}
        size="small"
        style={{
          backgroundColor: rest?.src ? "transparent" : "#a71c71",
          display: "flex",
          alignItems: "center",
          border: "none",
          ...style,
        }}
        {...rest}
      >
        {getNameInitials(name?.toString() || "")}
      </AntdAvatar>
    );
  }
);

export default CustomAvatar;
