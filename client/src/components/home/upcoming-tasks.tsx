import { Badge, Card, List } from "antd";
import { Text } from "../text";
import { CalendarOutlined } from "@ant-design/icons";
import { UpcomingEventsSkeleton } from "../skeleton/upcoming-tasks";
import { useList, useCreate } from "@refinedev/core";
import { DASHBOARD_CALENDAR_UPCOMING_TASKS_QUERY } from "../../utils/queries";
import { getRandomColorFromString } from "@/utils/get-random-color";
import dayjs from "dayjs";

const UpcomingTasks = () => {
  const { data, isLoading } = useList({
    resource: "tasks",
    meta: {
      gqlQuery: DASHBOARD_CALENDAR_UPCOMING_TASKS_QUERY,
      variables: {
        limit: 5,
        offset: 0,
        sortBy: "createdAt",
        order: "desc",
      },
    },
    errorNotification: (err) => {
      console.error("Error fetching tasks", err);
      return {
        message: "Fetch Recent Tasks Error",
        description: "Error: " + err?.errors,
        type: "error",
      };
    },
  });

  const formatDateTime = (dateString: string): string => {
    return dayjs(dateString).format("MMMM D, YYYY h:mm A");
  };

  return (
    <Card
      style={{ height: "100%" }}
      styles={{ body: { padding: "14px 24px" } }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <CalendarOutlined />
          <Text size="sm" style={{ marginLeft: "0.7rem" }}>
            Recent Tasks
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
                avatar={<Badge color={getRandomColorFromString(item.status)} />}
                title={
                  <Text size="xs" style={{ textTransform: "capitalize" }}>
                    {item.status} - {formatDateTime(item.createdAt)}
                  </Text>
                }
                description={
                  <Text ellipsis={{ tooltip: true }} strong>
                    {item.title} — Assigned to{"  "}
                    {item.assignedTo?.length
                      ? item.assignedTo
                          .map((staff: any) => staff.name)
                          .join(", ")
                      : "Unassigned"}{" "}
                    {item.roomId && `in Room ${item.roomId.number}`}
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
