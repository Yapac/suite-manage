import { CalendarOutlined, DotChartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import { Text } from "../text";

const DealsChart = () => {
  return (
    <Card
      style={{ height: "100%" }}
      styles={{
        header: { padding: "8px 16px" },
        body: { padding: "0 1rem" },
      }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <DotChartOutlined />
          <Text size="sm" style={{ marginLeft: "0.7rem" }}>
            Deals Chart
          </Text>
        </div>
      }
    ></Card>
  );
};

export default DealsChart;
