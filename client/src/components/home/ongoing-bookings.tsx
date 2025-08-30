import { Card, List } from "antd";
import React from "react";
import { Text } from "../text";
import {
  ApartmentOutlined,
  BankOutlined,
  HomeOutlined,
  ShopOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { LatestActivitiesSkeleton } from "../skeleton/latest-activities";
import { useList } from "@refinedev/core";
import { DASHBOARD_BOOKINGS_ALLDATA_QUERY } from "@/utils/queries";
import dayjs from "dayjs";
import { getNameInitials } from "@/utils/get-name-initials";

const OngoingBookings = () => {
  const { data, isLoading } = useList({
    resource: "bookings",
    meta: {
      gqlQuery: DASHBOARD_BOOKINGS_ALLDATA_QUERY,
    },
  });
  // Prepare sorted & limited bookings
  const sortedBookings = data?.data
    ?.slice() // create a copy to avoid mutating original
    .sort(
      (a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime()
    )
    .slice(0, 10); // take only the last 20

  return (
    <Card
      styles={{ header: { padding: "16px" }, body: { padding: "0 1rem" } }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <UnorderedListOutlined />
          <Text size="sm" style={{ marginLeft: "0.7rem" }}>
            On-going Bookings
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, i) => ({ id: i }))}
          renderItem={(_, i) => <LatestActivitiesSkeleton key={i} />}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={sortedBookings || []}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title={
                  <small style={{ color: "#555" }}>
                    {dayjs(item.checkIn).format("MMM D, YYYY")} →{" "}
                    {dayjs(item.checkOut).format("MMM D, YYYY")}
                  </small>
                }
                avatar={
                  <CustomAvatar
                    roomType={item.roomId?.type}
                    shape="square"
                    size={48}
                    name={getNameInitials(item.guestId.name?.toString())}
                  />
                }
                description={
                  <>
                    <Text>
                      <strong>{item.guestId?.name}</strong> currently booking{" "}
                      <strong> Room {item.roomId?.number}</strong> (
                      {item.roomId?.type})
                    </Text>
                    <span style={{ paddingLeft: "16px" }}>
                      <Text type="secondary">
                        {item.paymentType} • {item.totalPrice}
                      </Text>
                    </span>
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default OngoingBookings;

// CustomAvatar.tsx

export const ROOM_TYPE_ICONS: Record<
  string,
  { icon: React.ReactNode; color: string }
> = {
  single: {
    icon: <HomeOutlined style={{ fontSize: 20, color: "#1890ff" }} />,
    color: "#e6f7ff",
  },
  double: {
    icon: <ShopOutlined style={{ fontSize: 20, color: "#52c41a" }} />,
    color: "#edfddc",
  },
  suite: {
    icon: <BankOutlined style={{ fontSize: 20, color: "#722ed1" }} />,
    color: "#f9f0ff",
  },
  default: {
    icon: <HomeOutlined style={{ fontSize: 20, color: "#8c8c8c" }} />,
    color: "#f5f5f5",
  },
};
const CustomAvatar: React.FC<any> = ({
  name,
  roomType,
  size = 48,
  shape = "square",
}) => {
  const typeData = roomType
    ? ROOM_TYPE_ICONS[roomType.toLowerCase()] || ROOM_TYPE_ICONS.default
    : null;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: shape === "circle" ? "50%" : "12px",
        background: typeData ? typeData.color : "#f5f5f5",
        border: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        fontSize: 14,
        color: "#555",
      }}
    >
      {typeData ? typeData.icon : name}
    </div>
  );
};
