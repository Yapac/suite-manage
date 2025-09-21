import { useBack } from "@refinedev/core";
import { Result, Button, theme } from "antd";

export default function NotFoundPage() {
  const back = useBack();
  const { token } = theme.useToken(); // v5 theming if you want to access design tokens

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: token.colorBgLayout,
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" size="large" onClick={() => back()}>
            Go back
          </Button>
        }
      />
    </div>
  );
}
