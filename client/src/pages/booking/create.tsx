import {
  Create,
  CreateButton,
  useForm,
  useSelect,
  useModalForm,
} from "@refinedev/antd";
import {
  Form,
  InputNumber,
  Select,
  DatePicker,
  Tooltip,
  Divider,
  Modal,
  Input,
} from "antd";
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import React, { useMemo } from "react";
import {
  CREATE_BOOKING_MUTATION,
  CREATE_GUEST_MUTATION,
  GET_BOOKINGS_QUERY,
  LIST_GUESTS_QUERY,
  LIST_ROOMS_QUERY,
} from "@/utils/queries";
import { useList } from "@refinedev/core";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

const BookingCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm({
    action: "create",
    resource: "bookings",
    redirect: "list",
    mutationMode: "pessimistic",
    meta: { gqlMutation: CREATE_BOOKING_MUTATION },
  });

  type Room = {
    id: string;
    number: string;
    type: string;
    status: string;
    pricePerNight: string;
  };

  type Guest = {
    id: string;
    name: string;
    documentType: string;
    documentId: string;
    phone?: string;
    email?: string;
  };

  // Rooms
  const { selectProps: roomSelectProps, query: roomQuery } = useSelect<Room>({
    resource: "rooms",
    meta: { gqlQuery: LIST_ROOMS_QUERY },
    optionLabel: (room) =>
      `Room ${room.number} (${room.type} - ${room.pricePerNight}/ night)`,
    optionValue: "id",
  });

  // Guests
  const { selectProps: guestSelectProps, query: guestQuery } = useSelect<Guest>({
    resource: "guests",
    meta: { gqlQuery: LIST_GUESTS_QUERY },
    optionLabel: (guest) =>
      `${guest.name} (${guest.documentType}: ${guest.documentId})`,
    optionValue: "id",
  });

  // All bookings
  const { data: bookingsData } = useList({
    resource: "bookings",
    meta: { gqlQuery: GET_BOOKINGS_QUERY },
  });

  const selectedDates = Form.useWatch("checkDates", formProps.form); 
  // Filter rooms based on selected dates
  const filteredRoomOptions = useMemo(() => {
    if (!roomQuery.data?.data) return [];
    if (!selectedDates || selectedDates.length !== 2) {
      return roomQuery.data.data.map((room) => ({
        label: `${room.number} (${room.type} - ${room.pricePerNight}/ night)`,
        value: room.id,
        disabled: room.status === "maintenance", 
      }));
    }

    const [checkIn, checkOut] = selectedDates.map((d: any) => dayjs(d));

    return roomQuery.data.data.map((room) => {

    if (room.status === "maintenance") {
      return {
        label: `${room.number} (${room.type} - ${room.pricePerNight}/ night) — [Maintenance]`,
        value: room.id,
        disabled: true,
      };
    }

      const overlappingBooking = bookingsData?.data.find((b) => {
        if (b.roomId.id !== room.id) return false;

        const bCheckIn = dayjs(b.checkIn);
        const bCheckOut = dayjs(b.checkOut);

        return checkIn.isBefore(bCheckOut) && checkOut.isAfter(bCheckIn);
      });

      return {
        label: `${room.number} (${room.type} - ${room.pricePerNight}/ night)`,
        value: room.id,
        disabled: !!overlappingBooking,
      };
    });
  }, [selectedDates, roomQuery.data, bookingsData?.data]);


  // Guest modal
  const { modalProps, formProps: guestFormProps, show } = useModalForm({
    action: "create",
    resource: "guests",
    redirect: false,
    meta: { gqlMutation: CREATE_GUEST_MUTATION },
    mutationMode: "pessimistic",
    onMutationSuccess: () => guestQuery?.refetch(),
  });

  // Calculate total price
  const calculatePrice = () => {
    const roomId = formProps.form?.getFieldValue("roomId");
    const dates = formProps.form?.getFieldValue("checkDates");
    if (!roomId || !dates || dates.length !== 2) return;

    const room = roomQuery?.data?.data?.find((r) => r.id === roomId);
    if (!room) return;

    const nights = dayjs(dates[1]).diff(dayjs(dates[0]), "day");
    formProps.form?.setFieldsValue({ totalPrice: nights * parseFloat(room.pricePerNight) });
  };

  return (
    <>
      <Create saveButtonProps={saveButtonProps} title="Initiate Booking">
        <Form
          {...formProps}
          layout="vertical"
          onValuesChange={(changedValues) => {
            if (changedValues.roomId || changedValues.checkDates) calculatePrice();
          }}
        >
          {/* Check-in / Check-out */}
          <Form.Item
            label={
              <Tooltip title="Select check-in and check-out dates">
                Check-in / Check-out <InfoCircleOutlined style={{ color: "#999" }} />
              </Tooltip>
            }
            name="checkDates"
            rules={[{ required: true, message: "Check-in and check-out are required" }]}
          >
            <RangePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              onChange={(dates) => {
                if (dates && dates.length === 2) {
                  formProps.form?.setFieldsValue({
                    checkIn: dayjs(dates[0]).format("YYYY-MM-DD"),
                    checkOut: dayjs(dates[1]).format("YYYY-MM-DD"),
                  });
                }
              }}
            />
          </Form.Item>

          {/* Room */}
          <Form.Item
            label={
              <Tooltip title="Select the room to be booked">
                Room <InfoCircleOutlined style={{ color: "#999" }} />
              </Tooltip>
            }
            name="roomId"
            rules={[{ required: true, message: "Room is required" }]}
          >
            <Select
              {...roomSelectProps}
              placeholder="Select a room"
              options={filteredRoomOptions}
              disabled={!selectedDates || selectedDates.length !== 2}
            />
          </Form.Item>

          {/* Guest */}
          <Form.Item
            label={
              <Tooltip title="Select the guest making the booking">
                Guest <InfoCircleOutlined style={{ color: "#999" }} />
              </Tooltip>
            }
            name="guestId"
            rules={[{ required: true, message: "Guest is required" }]}
          >
            <Select
              {...guestSelectProps}
              showSearch
              filterOption={(input, option) =>
                String(option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
              placeholder="Select a guest"
              popupRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: "4px 0" }} />
                  <div style={{ display: "flex", padding: 8 }}>
                    <CreateButton
                      type="link"
                      icon={<PlusOutlined />}
                      onClick={() => show()}
                      style={{ padding: 0 }}
                    >
                      Create new guest
                    </CreateButton>
                  </div>
                </>
              )}
            />
          </Form.Item>

          {/* Total Price */}
          <Form.Item
            label={
              <Tooltip title="Total price for the booking in DH">
                Total Price <InfoCircleOutlined style={{ color: "#999" }} />
              </Tooltip>
            }
            name="totalPrice"
            rules={[{ required: true, message: "Total price is required" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} type="number" suffix="DH" />
          </Form.Item>

          {/* Payment Type */}
          <Form.Item
            label={
              <Tooltip title="Select payment method">
                Payment Type <InfoCircleOutlined style={{ color: "#999" }} />
              </Tooltip>
            }
            name="paymentType"
            initialValue="cash"
          >
            <Select
              options={[
                { label: "Cash", value: "cash" },
                { label: "Credit Card", value: "credit-card" },
                { label: "Online", value: "online" },
              ]}
            />
          </Form.Item>

          {/* Status */}
          <Form.Item
            label={
              <Tooltip title="Booking status">
                Status <InfoCircleOutlined style={{ color: "#999" }} />
              </Tooltip>
            }
            name="status"
            initialValue="confirmed"
          >
            <Select
              options={[
                { label: "Confirmed", value: "confirmed" },
                { label: "Checked-in", value: "checked-in" },
                { label: "Checked-out", value: "checked-out" },
                { label: "Cancelled", value: "cancelled" },
              ]}
            />
          </Form.Item>
        </Form>
      </Create>

      {/* Guest Create Modal */}
      <Modal {...modalProps} title="Create Guest">
        <Form {...guestFormProps} layout="vertical">
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Guest name is required" }]}
          >
            <Input placeholder="Enter guest name" />
          </Form.Item>
          <Form.Item
            label="Document Type"
            name="documentType"
            rules={[{ required: true, message: "Document type is required" }]}
          >
            <Select
              options={[
                { label: "ID Card", value: "id-card" },
                { label: "Passport", value: "passport" },
                { label: "Driver License", value: "driver-license" },
              ]}
              placeholder="Select document type"
            />
          </Form.Item>
          <Form.Item
            label="Document ID"
            name="documentId"
            rules={[{ required: true, message: "Document ID is required" }]}
          >
            <Input placeholder="Enter document ID" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item label="Phone number" name="phone">
            <Input placeholder="Enter phone number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BookingCreate;
