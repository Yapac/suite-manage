import { Col, Row } from "antd";
import React from "react";
import {
  DashBoardTotalCountCard,
  DealsChart,
  UpComingTasks,
} from "../../components";
import { useCustom } from "@refinedev/core";
import {
  DAHBOARD_TOTAL_COUNTS_QUERY,
  DASHBOARD_BOOKINGS_QUERY,
} from "@/utils/queries";
import { API_URL } from "@/providers";
import OngoingBookings from "@/components/home/ongoing-bookings";

export const Home = () => {
  const { data, isLoading } = useCustom({
    url: API_URL,
    method: "get",
    meta: {
      gqlQuery: DAHBOARD_TOTAL_COUNTS_QUERY,
    },
  });

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={8}>
          <DashBoardTotalCountCard
            resource="rooms"
            isLoading={isLoading}
            totalCount={data?.data.rooms.length}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashBoardTotalCountCard
            resource="staffs"
            isLoading={isLoading}
            totalCount={data?.data.staffs.length}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashBoardTotalCountCard
            resource="bookings"
            isLoading={isLoading}
            totalCount={data?.data.bookings.length}
          />
        </Col>
      </Row>
      <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col xs={24} sm={24} xl={8} style={{ height: "460px" }}>
          <UpComingTasks />
        </Col>
        <Col xs={24} sm={24} xl={16} style={{ height: "460px" }}>
          <DealsChart />
        </Col>
      </Row>

      <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col xs={24}>
          <OngoingBookings />
        </Col>
      </Row>
    </div>
  );
};
