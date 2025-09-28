import {
  CreateButton,
  Edit,
  useForm,
  useModalForm,
  useSelect,
} from "@refinedev/antd";
import {
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Tooltip,
} from "antd";
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  CREATE_GUEST_MUTATION,
  LIST_GUESTS_QUERY,
  LIST_ROOMS_QUERY,
  UPDATE_BOOKING_MUTATION,
} from "@/utils/queries";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const BookingEdit = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({
    redirect: "list",
    meta: {
      gqlMutation: UPDATE_BOOKING_MUTATION,
    },
    queryOptions: {
      onSuccess: (data) => {
        const booking = data?.data;
        formProps.form?.setFieldsValue({
          ...booking,
          roomId: booking?.roomId?.id, // flatten roomId
          guestId: booking?.guestId?.id, // flatten guestId
          checkDates: [dayjs(booking?.checkIn), dayjs(booking?.checkOut)], // map into RangePicker format
          totalPrice: booking?.totalPrice
            ? Number(String(booking.totalPrice).replace(/[^\d.-]/g, ""))
            : 0,
        });
      },
    },
  });

  type Room = { id: string; number: string; type: string; status: string };
  type Guest = {
    id: string;
    name: string;
    documentType: string;
    documentId: string;
    phone: string;
    email: string;
  };

  // Select Rooms
  const { selectProps: roomSelectProps, query: roomQuery } = useSelect<Room>({
    resource: "rooms",
    meta: { gqlQuery: LIST_ROOMS_QUERY },
    optionLabel: (room) => `${room.number} (${room.type})– ${room.status}`,
    optionValue: "id",
  });

  // Ant Design Select expects each option like {label, value, disabled}
  const roomOptions =
    roomQuery.data?.data.map((room) => ({
      label: `${room.number} (${room.type}) – ${room.status}`,
      value: room.id,
      disabled: room.status !== "available", // disable if not available
    })) || [];

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
      <Edit
        saveButtonProps={saveButtonProps}
        isLoading={formLoading}
        title="Edit Booking"
      >
        <Form {...formProps} layout="vertical">
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
              value={formProps.initialValues?.roomId.id}
              options={roomOptions}
              placeholder="Select a room"
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
            <InputNumber min={0} style={{ width: "100%" }} suffix="DH" />
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
      </Edit>
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

export default BookingEdit;
