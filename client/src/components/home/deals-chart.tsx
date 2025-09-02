import { DollarOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { Text } from "../text";
import { Area, AreaConfig } from "@ant-design/plots";
import dayjs from "dayjs";
import { useList } from "@refinedev/core";
import { DASHBOARD_BOOKINGS_QUERY } from "@/utils/queries";
import { useMemo } from "react";

const DealsChart = () => {
  const { data, isLoading } = useList({
    resource: "bookings",
    meta: { gqlQuery: DASHBOARD_BOOKINGS_QUERY },
  });

  const bookings = data?.data || [];

  // Memoize aggregated data
  const aggregatedData = useMemo(() => {
    const chartData = bookings.map((b: any) => ({
      date: dayjs(b.checkIn).format("YYYY-MM-DD"),
      room: b.roomId,
      roomKey: b.roomId._id || b.roomId.number,
      value: parseFloat(b.totalPrice.replace(/\s*DH$/, "") || "0"),
    }));

    // Aggregate revenue per room per day
    const revenueMap: Record<
      string,
      Record<string, { room: any; value: number }>
    > = {};

    chartData.forEach((item) => {
      if (!revenueMap[item.date]) revenueMap[item.date] = {};
      if (!revenueMap[item.date][item.roomKey]) {
        revenueMap[item.date][item.roomKey] = { room: item.room, value: 0 };
      }
      revenueMap[item.date][item.roomKey].value += item.value;
    });

    const flattenedData: {
      date: string;
      room: any;
      roomKey: string;
      value: number;
    }[] = [];
    Object.entries(revenueMap).forEach(([date, rooms]) => {
      Object.entries(rooms).forEach(([roomKey, { room, value }]) => {
        flattenedData.push({ date, room, roomKey: `Room ${roomKey}`, value });
      });
    });

    return flattenedData.sort(
      (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix()
    );
  }, [bookings]);

  const config: AreaConfig = {
    data: aggregatedData,
    xField: "date",
    yField: "value",
    seriesField: "roomKey",
    isStack: true,
    startOnZero: false,
    smooth: true,
    legend: {
      position: "top-left",
      flipPage: false,
    },

    yAxis: {
      tickCount: 4,
      label: {
        formatter: (v: string) => `${Number(v)} DH`,
      },
    },
    tooltip: {
      formatter: (datum: any) => ({
        name: datum.roomKey,
        value: `${datum.value} DH`,
      }),
    },
  };

  return (
    <Card
      style={{ height: "100%" }}
      styles={{
        header: { padding: "8px 16px" },
        body: { padding: "24px 24px 0 24px" },
      }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <DollarOutlined />
          <Text size="sm" style={{ marginLeft: "0.7rem" }}>
            Deals Chart
          </Text>
        </div>
      }
    >
      <Area {...config} height={350} />
    </Card>
  );
};

export default DealsChart;
