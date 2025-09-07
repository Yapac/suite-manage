import React from "react";

import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, theme } from "antd";
import { Text } from "@/components/text";

interface Props {
  onClick: () => void;
}

export const KanbanAddCardButton = ({
  children,
  onClick,
}: React.PropsWithChildren<Props>) => {
  const { token } = theme.useToken();
  return (
    <Button
      size="large"
      icon={<PlusSquareOutlined className="md" />}
      style={{
        margin: "16px",
        backgroundColor: token.colorBgContainer,
      }}
      onClick={onClick}
    >
      {children ?? (
        <Text size="md" type="secondary">
          Add new card
        </Text>
      )}
    </Button>
  );
};
