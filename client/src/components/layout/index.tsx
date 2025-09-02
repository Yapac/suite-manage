import { ThemedLayoutV2, ThemedSiderV2, ThemedTitleV2 } from "@refinedev/antd";
import React from "react";
import Header from "./header";
import "./layout.css";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2
      Sider={(props) => <ThemedSiderV2 {...props} />}
      Header={Header}
      Title={(titleProps) => (
        <ThemedTitleV2
          {...titleProps}
          text="Suite Manage"
          icon={<img src="hotel-bell.png" style={{ width: "23px" }} />}
        />
      )}
    >
      {children}
    </ThemedLayoutV2>
  );
};

export default Layout;
