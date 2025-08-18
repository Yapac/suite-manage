import { Avatar as AntdAvatar, AvatarProps } from "antd";

import { getNameInitials } from "../utils/get-name-initials";

type Props = AvatarProps & {
  name?: String;
};
const CustomAvatar = ({ name, style, ...rest }: Props) => {
  return (
    <AntdAvatar
      alt="Yaoacdev"
      size={"small"}
      style={{
        backgroundColor: "#a71c71",
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
};

export default CustomAvatar;
