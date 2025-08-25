import { Badge, Card, List } from "antd";
import { Text } from "../text";
import { CalendarOutlined } from "@ant-design/icons";
import { UpcomingEventsSkeleton } from "../skeleton/upcoming-events";
import { getDate } from "../../utils/helpers";
import { useList } from "@refinedev/core";
import { DASHBOARD_CALENDAR_UPCOMING_TASKS_QUERY } from "../../utils/queries";
import dayjs from "dayjs";

const UpcomingTasks = () => {
  const { data, isLoading } = useList({
    resource: "tasks", // 🔹 changed from "events"
    // pagination: { pageSize: 5 },
    // sorters: [
    //   {
    //     field: "startDate",
    //     order: "asc",
    //   },
    // ],
    // filters: [
    //   {
    //     field: "startDate",
    //     operator: "lte",
    //     value: dayjs().format("YYYY-MM-DD"),
    //   },
    // ],
    meta: {
      gqlQuery: DASHBOARD_CALENDAR_UPCOMING_TASKS_QUERY, // 🔹 updated
    },
  });

  return (
    <Card
      style={{ height: "100%" }}
      styles={{
        header: { padding: "8px 16px" },
        body: { padding: "0 1rem" },
      }}
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
          renderItem={(item) => {
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Badge color={"blue"} />}
                  title={<Text size="xs">{item.status}</Text>}
                  description={
                    <Text ellipsis={{ tooltip: true }} strong>
                      {item.title}— Assigned to {item.assignedTo}
                    </Text>
                  }
                />
              </List.Item>
            );
          }}
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
          <Text style={{ color: "gray" }}> No upcoming tasks</Text>
        </span>
      )}
    </Card>
  );
};

export default UpcomingTasks;
