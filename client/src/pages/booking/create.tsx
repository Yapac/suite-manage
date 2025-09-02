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
import {
  CREATE_BOOKING_MUTATION,
  CREATE_GUEST_MUTATION,
  LIST_GUESTS_QUERY,
  LIST_ROOMS_QUERY,
} from "@/utils/queries";
import React from "react";

const { RangePicker } = DatePicker;

const BookingCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm({
    action: "create",
    resource: "bookings",
    redirect: "list",
    mutationMode: "pessimistic",
    meta: {
      gqlMutation: CREATE_BOOKING_MUTATION,
    },
  });

  type Room = { id: string; number: string; type: string };
  type Guest = {
    id: string;
    name: string;
    documentType: string;
    documentId: string;
    phone: string;
    email: string;
  };

  // Select Rooms
  const { selectProps: roomSelectProps } = useSelect<Room>({
    resource: "rooms",
    meta: { gqlQuery: LIST_ROOMS_QUERY },
    optionLabel: (room) => `${room.number} (${room.type})`,
    optionValue: "id",
  });

  // Select Guests
  const { selectProps: guestSelectProps, query: guestQuery } = useSelect<Guest>(
    {
      resource: "guests",
      meta: { gqlQuery: LIST_GUESTS_QUERY },
      optionLabel: (guest) =>
        `${guest.name} (${guest.documentType}: ${guest.documentId})`,
      optionValue: "id",
    }
  );

  // then call refetch like this:

  const {
    modalProps,
    formProps: guestFormProps,
    show,
  } = useModalForm({
    action: "create",
    resource: "guests",
    redirect: false,
    meta: {
      gqlMutation: CREATE_GUEST_MUTATION,
    },
    mutationMode: "pessimistic",
    onMutationSuccess: () => {
      guestQuery?.refetch(); // refresh guest list after creation
    },
  });

  return (
    <>
      <Create saveButtonProps={saveButtonProps} title="Initiate Booking">
        <Form {...formProps} layout="vertical">
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
            <Select {...roomSelectProps} placeholder="Select a room" />
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
              filterOption={(input: any, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
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

          {/* Check-in & Check-out */}
          <Form.Item
            label={
              <Tooltip title="Select check-in and check-out dates">
                Check-in / Check-out{" "}
                <InfoCircleOutlined style={{ color: "#999" }} />
              </Tooltip>
            }
            name="checkDates"
            rules={[
              {
                required: true,
                message: "Check-in and check-out are required",
              },
            ]}
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
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              type="number"
              suffix="DH"
            />
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
