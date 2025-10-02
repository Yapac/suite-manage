import { useList } from "@refinedev/core";
import { Descriptions, Tag, Typography, Card, Space, Divider } from "antd";
import dayjs from "dayjs";
import { Show } from "@refinedev/antd";
import { GET_BOOKINGS_QUERY } from "@/utils/queries";
import { BookingStatusColors } from "@/utils/helpers";

const { Title, Text } = Typography;

const BookingShow: React.FC = () => {
  const pathSegments = window.location.pathname.split("/"); 
  const id = pathSegments[pathSegments.length - 1]; 

  const { data, isLoading } = useList({
    resource: "bookings",
    meta: { gqlQuery: GET_BOOKINGS_QUERY },
  });

  if (isLoading) return <div>Loading…</div>;

  const record = data?.data.find((booking: any) => booking.id === id);
  if (!record) return <div>Booking not found</div>;

  const roomTypeColors: Record<string, string> = {
    single: "#5B8FF9",
    double: "#5ad86fff",
    family: "#9f6bffff",
    suite: "#FFC53D",
  };

  return (
    <Show title="Booking Details" headerButtons={null}>

        <Title level={3} style={{ marginBottom: 32 }}>
          Booking: #{record.id}
        </Title>

        {/* Guest Info */}
        <Card
          type="inner"
          title="Guest Information"
          style={{ borderRadius: 8, marginBottom: 24 }}
        >
          <Descriptions column={1} bordered size="small"
          labelStyle={{ width: 200, fontWeight: 500 }}
          >
            <Descriptions.Item label="Name">
              <Text strong>{record.guestId?.name}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Document">
              <Space>
                <Text>{record.guestId?.documentType.toUpperCase()}</Text>
                <Text copyable>{record.guestId?.documentId}</Text>
              </Space>
            </Descriptions.Item>

            {record.guestId?.email && (
              <Descriptions.Item label="Email">
                <Text copyable>{record.guestId.email}</Text>
              </Descriptions.Item>
            )}
            {record.guestId?.phone && (
              <Descriptions.Item label="Phone">
                <Text copyable>{record.guestId.phone}</Text>
              </Descriptions.Item>
            )}

          </Descriptions>
        </Card>

        {/* Room Info */}
        <Card
          type="inner"
          title="Room Information"
          style={{ borderRadius: 8, marginBottom: 24 }}
        >
          <Descriptions column={1} bordered size="small" 
          labelStyle={{ width: 200, fontWeight: 500 }}
          >
            <Descriptions.Item label="Room">
              <Text strong>
                Number {record.roomId?.number}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Type">
              <Space>
                {/* Colored circle */}
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    backgroundColor: roomTypeColors[record.roomId?.type] || "#d9d9d9",
                  }}
                />
                {/* Type text */}
                <Text style={{ textTransform: "capitalize", fontWeight: 500 }}>
                  {record.roomId?.type}
                </Text>
              </Space>
            </Descriptions.Item>

            <Descriptions.Item label="Check-In / Check-Out">
              <Text>
                {dayjs(record.checkIn).format("MMM D, YYYY")} →{" "}
                {dayjs(record.checkOut).format("MMM D, YYYY")}
              </Text>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Booking Details */}
        <Card
          type="inner"
          title="Booking Details"
          style={{ borderRadius: 8 }}
        >
          <Descriptions column={1} bordered size="small"
          labelStyle={{ width: 200, fontWeight: 500 }}
          >
            <Descriptions.Item label="Status">
              <Tag
                color={BookingStatusColors[record.status] || "default"}
                style={{ fontWeight: 600, textTransform: "capitalize" }}
              >
                {record.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Total Price">
              <Text strong style={{ fontSize: 16 }}>
                ${record.totalPrice} ({record.paymentType})
              </Text>
            </Descriptions.Item>
          </Descriptions>
        </Card>

    </Show>
  );
};

export default BookingShow;
