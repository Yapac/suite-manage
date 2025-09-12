import { Text } from "@/components/text";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  useTable,
} from "@refinedev/antd";
import { getDefaultFilter, useGo } from "@refinedev/core";
import {
  CrownOutlined,
  HomeOutlined,
  SearchOutlined,
  ShopOutlined,
  SmileOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Card,
  Col,
  Flex,
  Input,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";

import { LIST_STAFFS_QUERY } from "@/utils/queries";

const StaffsList = () => {
  const go = useGo();

  const { tableProps, filters } = useTable({
    resource: "staffs",
    pagination: { pageSize: 8 },
    meta: { gqlQuery: LIST_STAFFS_QUERY },
  });

  const { Title } = Typography;

  const roleConfig: Record<
    string,
    { color: string; icon: React.ReactNode; label: string }
  > = {
    admin: {
      color: "red",
      icon: <CrownOutlined />,
      label: "Admin",
    },
    receptionist: {
      color: "blue",
      icon: <SmileOutlined />,
      label: "Receptionist",
    },
    housekeeping: {
      color: "green",
      icon: <HomeOutlined />,
      label: "Housekeeping",
    },
    maintenance: {
      color: "magenta",
      icon: <ToolOutlined />,
      label: "Maintenance",
    },
  };

  const renderRoleTag = (role?: string) => {
    if (!role) {
      return <Tag color="default">Unknown</Tag>;
    }

    const config = roleConfig[role.toLowerCase()];
    if (!config) {
      return <Tag color="default">{role}</Tag>;
    }

    return (
      <Tag color={config.color} icon={config.icon}>
        {config.label}
      </Tag>
    );
  };
  return (
    <>
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
          src="/hotel-bell.png"
          alt="Logo"
          style={{ width: 90, marginRight: 16, borderRadius: 48 }}
        />
        <Text
          size="xxl"
          style={{ paddingBottom: "5px", fontWeight: 700, opacity: 0.95 }}
        >
          Suite Manage
        </Text>
      </div>
      <Row gutter={[24, 24]}>
        {/* Right column - Staffs List */}
        <Col xs={24} md={16}>
          <List
            title="Staff Members"
            breadcrumb={false}
            headerButtons={() => (
              <CreateButton
                title="Add New Staff Member"
                onClick={() =>
                  go({
                    to: { resource: "staffs", action: "create" },

                    options: { keepQuery: true },
                    type: "replace",
                  })
                }
              />
            )}
          >
            <Table {...tableProps} pagination={tableProps.pagination}>
              {/* Name + Avatar */}
              <Table.Column
                dataIndex="name"
                title="Name"
                render={(value, record: any) => (
                  <Space>
                    <Avatar src={record.avatarUrl} size={32}>
                      {record.name?.[0]}
                    </Avatar>
                    <Text style={{ whiteSpace: "nowrap" }}>{record.name}</Text>
                  </Space>
                )}
                defaultFilteredValue={getDefaultFilter("id", filters)}
                filterIcon={<SearchOutlined />}
                filterDropdown={(props) => (
                  <FilterDropdown {...props}>
                    <Input placeholder="Search staff" />
                  </FilterDropdown>
                )}
              />

              {/* Email */}
              <Table.Column
                dataIndex="email"
                title="Email"
                render={(value: string) => (
                  <Text style={{ whiteSpace: "nowrap" }}>{value}</Text>
                )}
              />

              {/* Phone */}
              <Table.Column
                dataIndex="phone"
                title="Phone"
                render={(value: string) => (
                  <Text style={{ whiteSpace: "nowrap" }}>{value}</Text>
                )}
              />

              {/* Role */}
              <Table.Column
                dataIndex="role"
                title="Role"
                render={(value: string) => renderRoleTag(value)}
              />

              {/* Actions */}
              <Table.Column
                dataIndex="id"
                title="Actions"
                fixed="right"
                render={(value, record: any) => (
                  <Space>
                    <EditButton hideText size="small" recordItemId={value} />
                    <DeleteButton
                      hideText
                      size="small"
                      recordItemId={record.id}
                      // meta={{ gqlMutation: DELETE_STAFF_MUTATION }}
                    />
                  </Space>
                )}
              />
            </Table>
          </List>
        </Col>
        {/* Left column - Title & Details */}
        <Col xs={24} md={8}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <ShopOutlined />
                <Text size="sm" style={{ marginLeft: "0.5rem" }}>
                  Tech Directory
                </Text>
              </div>
            }
            type="inner"
          >
            <Text type="secondary">
              If you have any questions about managing staff members, please
              refer to the documentation or contact support for assistance.
            </Text>

            <div style={{ marginTop: 24 }}>
              <Title level={5}>Tech support Info</Title>
              <Text></Text>
              <br />
              <Text type="secondary">
                Yapacdev, Product Builder. Creative Engineer.
              </Text>
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
export default StaffsList;
