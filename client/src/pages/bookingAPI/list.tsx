import { Text } from "@/components/text";
import {
  SaveOutlined,
  ReloadOutlined,
  ApiOutlined,
  CloudSyncOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Typography,
} from "antd";

const { Title } = Typography;

const BookingAPIConfig = () => {
  return (
    <>
      {/* Header with logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingBottom: 32,
          borderBottom: "1px solid #cfcfcf",
          marginBottom: "42px",
        }}
      >
        <img
          src="/icons/booking-com.svg"
          alt="Logo"
          style={{ width: 90, marginRight: 16 }}
        />
        <Text
          size="xxl"
          style={{ paddingBottom: "5px", fontWeight: 700, opacity: 0.95 }}
        >
          Booking.com Configuration
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        {/* Left column - Config form */}
        <Col xs={24} md={16}>
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ApiOutlined />
                <Text size="sm" style={{ marginLeft: "0.5rem" }}>
                  API Credentials
                </Text>
              </div>
            }
            bordered
          >
            <Form layout="vertical">
              {/* Partner ID */}
              <Form.Item label="Partner ID" required>
                <Input placeholder="Enter your Booking.com Partner ID" />
              </Form.Item>

              {/* API Key */}
              <Form.Item label="API Key" required>
                <Input.Password placeholder="Enter API key" />
              </Form.Item>

              {/* API Secret */}
              <Form.Item label="API Secret">
                <Input.Password placeholder="Enter API secret" />
              </Form.Item>

              {/* Environment Selector */}
              <Form.Item label="Environment">
                <Select
                  defaultValue="sandbox"
                  options={[
                    { value: "sandbox", label: "Sandbox (Test)" },
                    { value: "production", label: "Production" },
                  ]}
                />
              </Form.Item>

              {/* Auto-sync toggle */}
              <Form.Item label="Enable Auto-Sync">
                <Switch defaultChecked />
              </Form.Item>

              {/* Sync frequency */}
              <Form.Item label="Sync Frequency">
                <Select
                  defaultValue="15"
                  options={[
                    { value: "5", label: "Every 5 min" },
                    { value: "15", label: "Every 15 min" },
                    { value: "60", label: "Every hour" },
                  ]}
                />
              </Form.Item>

              <Divider />

              {/* Action buttons */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Button type="primary" icon={<SaveOutlined />}>
                  Save Configuration
                </Button>
                <Button icon={<ReloadOutlined />}>Test Connection</Button>
                <Button danger>Disconnect</Button>
              </div>
            </Form>
          </Card>
        </Col>

        {/* Right column - Info card */}
        <Col xs={24} md={8}>
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CloudSyncOutlined />
                <Text size="sm" style={{ marginLeft: "0.5rem" }}>
                  Sync Info
                </Text>
              </div>
            }
            type="inner"
          >
            <Text type="secondary">
              Configure your Booking.com connectivity settings here.  please refer to the documentation or contact support for assistance.
            </Text>

            <div style={{ marginTop: 24 }}>
              <Title level={5}>Tech support Info</Title>
               <Text></Text>
              <br />
              <Text type="secondary">Yapacdev, Product Builder. Creative Engineer.</Text>
              <br />
              <Text type="secondary">+212 656 03 42 48</Text>
              <br />
              <Text type="secondary">info@yapacdev.com</Text>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default BookingAPIConfig;
