import React from "react";
import { CurrentUser } from "./current-user";
import { Button, Layout, Space, theme as antdTheme, Grid } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useAppContext } from "../../context/AppContext";

const Header = () => {
  const { token } = antdTheme.useToken();
  const { state, dispatch } = useAppContext();

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const headerStyles: React.CSSProperties = {
    background: token.colorBgContainer,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
    position: "sticky",
    top: 0,
    zIndex: 999,
  };

  return (
    <Layout.Header style={headerStyles}>
      <Space align="center" size="middle">
        {!screens.md && (
          <div
            style={{ display: "flex", alignItems: "center", columnGap: "8px" }}
          >
            <img src="hotel-bell.png" style={{ width: "23px" }} alt="Logo" />
            <p
              style={{
                margin: "0",
                fontWeight: "bold",
              }}
            >
              Suite Manage
            </p>
          </div>
        )}
      </Space>
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
