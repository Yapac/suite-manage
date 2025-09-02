import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { CREATE_ROOM_MUTATION } from "@/utils/queries";

const RoomCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm({
    action: "create",
    resource: "rooms",
    redirect: "list",
    mutationMode: "pessimistic",
    meta: {
      gqlMutation: CREATE_ROOM_MUTATION,
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps} title="Create Room">
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={
            <Tooltip title="Unique number that identifies the room">
              Room Number <InfoCircleOutlined style={{ color: "#999" }} />
            </Tooltip>
          }
          name="number"
          rules={[{ required: true, message: "Room number is required" }]}
        >
          <Input placeholder="Enter room number" />
        </Form.Item>

        <Form.Item
          label={
            <Tooltip title="Type of room (e.g., Single, Double, Suite)">
              Room Type <InfoCircleOutlined style={{ color: "#999" }} />
            </Tooltip>
          }
          name="type"
          rules={[{ required: true, message: "Room type is required" }]}
        >
          <Select
            options={[
              { label: "Single", value: "single" },
              { label: "Double", value: "double" },
              { label: "Suite", value: "suite" },
              { label: "Family", value: "family" },
            ]}
            placeholder="Choose room type"
          />
        </Form.Item>

        <Form.Item
          label={
            <Tooltip title="Price per night (in DH)">
              Price per Night <InfoCircleOutlined style={{ color: "#999" }} />
            </Tooltip>
          }
          name="pricePerNight"
          rules={[{ required: true, message: "Price is required" }]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            suffix="DH"
            placeholder="Enter room price ( per DH )"
          />
        </Form.Item>

        <Form.Item
          label={
            <Tooltip title="Current availability status of the room">
              Status <InfoCircleOutlined style={{ color: "#999" }} />
            </Tooltip>
          }
          name="status"
          initialValue={"available"}
        >
          <Select
            options={[
              { label: "Available", value: "available" },
              { label: "Booked", value: "booked" },
              { label: "Maintenance", value: "maintenance" },
              { label: "Cleaning", value: "cleaning" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label={
            <Tooltip title="Optional description or notes about the room">
              Description <InfoCircleOutlined style={{ color: "#999" }} />
            </Tooltip>
          }
          name="description"
        >
          <Input.TextArea rows={4} placeholder="Enter description" />
        </Form.Item>
      </Form>
    </Create>
  );
};

export default RoomCreate;
