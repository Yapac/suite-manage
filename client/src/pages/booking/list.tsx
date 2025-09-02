import { RoomAvatar } from "@/components/home/ongoing-bookings";
import { Text } from "@/components/text";
import {
  DELETE_BOOKING_MUTATION,
  LIST_BOOKINGS_ALLDATA_QUERY,
  LIST_ROOMS_QUERY,
} from "@/utils/queries";
import { SearchOutlined } from "@ant-design/icons";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  useTable,
} from "@refinedev/antd";
import { getDefaultFilter, useGo } from "@refinedev/core";
import { Input, Space, Table, Tag } from "antd";
import dayjs from "dayjs";

export const BookingsList = () => {
  const go = useGo();
  const { tableProps, filters } = useTable({
    resource: "bookings",
    pagination: {
      pageSize: 10,
    },

    meta: {
      gqlQuery: LIST_BOOKINGS_ALLDATA_QUERY,
    },
  });

  return (
    <List
      breadcrumb={false}
      headerButtons={() => (
        <CreateButton
          onClick={() => {
            go({
              to: {
                resource: "bookings",
                action: "create",
              },
              options: {
                keepQuery: true,
              },
              type: "replace",
            });
          }}
        />
      )}
    >
      <Table
        {...tableProps}
        pagination={tableProps.pagination}
        dataSource={[...(tableProps.dataSource || [])].sort(
          (a, b) =>
            new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime()
        )}
      >
        <Table.Column
          dataIndex="guestId.name"
          title="Booked By"
          render={(value, record) => (
            <Space>
              <RoomAvatar roomType={record.roomId.type} size={48} />
              <Text style={{ whiteSpace: "nowrap" }}>
                {record.guestId.name}
              </Text>
            </Space>
          )}
          defaultFilteredValue={getDefaultFilter("id", filters)}
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Room" />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="roomId"
          title="Room"
          render={(value, record) => (
            <Space>
              <Text style={{ whiteSpace: "nowrap" }}>
                Room {record.roomId.number}{" "}
                <span style={{ color: "#555" }}>
                  ( type {record.roomId.type} )
                </span>
              </Text>
            </Space>
          )}
        />
        <Table.Column
          dataIndex="checkIn"
          title="Check In / Check Out"
          sorter={(a, b) =>
            new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime()
          }
          render={(value, record) => (
            <Space>
              <Text
                style={{ whiteSpace: "nowrap", textTransform: "capitalize" }}
              >
                {dayjs(value).format("MMM D, YYYY")} →{" "}
                {dayjs(record.checkOut).format("MMM D, YYYY")}
              </Text>
            </Space>
          )}
        />
        <Table.Column
          dataIndex="status"
          title="Room status"
          render={(value, record) => {
            const statusColors: Record<string, string> = {
              confirmed: "green",
              "checked-in": "purple",
              "checked-out": "orange",
              canceled: "blue",
            };
            return (
              <Space>
                <Text
                  style={{ whiteSpace: "nowrap", textTransform: "capitalize" }}
                >
                  <Tag color={statusColors[value] || "default"}>{value}</Tag>
                </Text>
              </Space>
            );
          }}
        />
        <Table.Column
          dataIndex="totalPrice"
          title="Total Price"
          render={(value, record) => (
            <Space>
              <Text
                style={{
                  whiteSpace: "nowrap",
                  color: "grey",
                }}
              >
                {value} ( {record.paymentType} )
              </Text>
            </Space>
          )}
        />
        <Table.Column
          dataIndex="id"
          title="Actions"
          fixed="right"
          render={(value, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={value} />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                meta={{ gqlMutation: DELETE_BOOKING_MUTATION }}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
