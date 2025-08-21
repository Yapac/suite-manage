import React from "react";
import { CurrentUser } from "./current-user";
import { Button, Layout, Space, theme as antdTheme } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useAppContext } from "../../context/AppContext";

const Header = () => {
  const { token } = antdTheme.useToken();
  const headerStyles: React.CSSProperties = {
    background: token.colorBgContainer,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0 24px",
    position: "sticky",
    top: 0,
    zIndex: 999,
  };
  const { state, dispatch } = useAppContext();

  return (
    <Layout.Header style={headerStyles}>
      <Space align="center" size="middle">
        <Button
          onClick={() => dispatch({ type: "TOGGLE_THEME" })}
          icon={state.theme === "light" ? <MoonOutlined /> : <SunOutlined />}
        />
        <CurrentUser />
      </Space>
    </Layout.Header>
  );
};

export default Header;
