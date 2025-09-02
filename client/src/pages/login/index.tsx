import { AuthPage, Title } from "@refinedev/antd";
import { authCredentials } from "../../providers";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            columnGap: "8px",

            fontSize: "20px",
          }}
        >
          <img src="hotel-bell.png" style={{ width: "24px", height: "24px" }} />
          <h1
            style={{
              fontSize: "20px",
              fontWeight: 700,
              margin: "0",
              lineHeight: 1,
            }}
          >
            Suite Manage
          </h1>
        </div>
      }
      formProps={{
        initialValues: authCredentials,
      }}
    />
  );
};
