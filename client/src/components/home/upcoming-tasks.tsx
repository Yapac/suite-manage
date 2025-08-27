import { Badge, Card, List } from "antd";
import { Text } from "../text";
import { CalendarOutlined } from "@ant-design/icons";
import { UpcomingEventsSkeleton } from "../skeleton/upcoming-events";
import { useList } from "@refinedev/core";
import { DASHBOARD_CALENDAR_UPCOMING_TASKS_QUERY } from "../../utils/queries";

const UpcomingTasks = () => {
  const { data, isLoading, isError } = useList({
    resource: "tasks",
    liveMode: "off", // optional, for live updates
    meta: {
      gqlQuery: DASHBOARD_CALENDAR_UPCOMING_TASKS_QUERY,
      transform: (response: any) => {
        return {
          data: response || [],
          total: response.tasks?.length || 0,
        };
      },
    },
    successNotification: (res) => {
      return { message: "Fetched successfully", type: "success" };
    },
    errorNotification: (err) => {
      return {
        message: "Error",
        description: "Error: " + err?.errors,
        type: "error",
      };
    },
  });

  return (
    <Card
      style={{ height: "100%" }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <CalendarOutlined />
          <Text size="sm" style={{ marginLeft: "0.7rem" }}>
            Upcoming Tasks
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index,
          }))}
          renderItem={() => <UpcomingEventsSkeleton />}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={data?.data || []}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Badge color={"blue"} />}
                title={<Text size="xs">{item.status}</Text>}
                description={
                  <Text ellipsis={{ tooltip: true }} strong>
                    {item.title} — Assigned to {item.assignedTo}
                  </Text>
                }
              />
            </List.Item>
          )}
        />
      )}

      {!isLoading && (data?.data?.length ?? 0) === 0 && (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "220px",
          }}
        >
          <Text style={{ color: "gray" }}>No upcoming tasks</Text>
        </span>
      )}
    </Card>
  );
};

export default UpcomingTasks;
