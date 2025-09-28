import { UPDATE_BOOKING_MUTATION } from "@/utils/queries";
import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Descriptions, Tag } from "antd";
import dayjs from "dayjs";
import gql from "graphql-tag";

const BookingShow: React.FC = () => {
  const { query } = useShow({
    resource: "bookings",
    meta: {
      gqlQuery: UPDATE_BOOKING_MUTATION,
    },
  });
  const { data, isLoading } = query;
  const record = data?.data;
  console.log(query);

  if (isLoading) return <div>Loading…</div>;

  return (
    <Show title="View Booking">
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Guest">
          {record?.guestId?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Room">
          Room {record?.roomId?.number} ({record?.roomId?.type})
        </Descriptions.Item>
        <Descriptions.Item label="Check-In / Check-Out">
          {dayjs(record?.checkIn).format("MMM D, YYYY")} →{" "}
          {dayjs(record?.checkOut).format("MMM D, YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag>{record?.status}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Total Price">
          {record?.totalPrice} ({record?.paymentType})
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
};

export default BookingShow;
