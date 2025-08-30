// src/constants/resourceConfig.tsx

import { TeamOutlined, HomeOutlined, BookOutlined } from "@ant-design/icons";
import React from "react";

interface IconWrapperProps {
  color?: string; // icon color
  backgroundColor?: string; // wrapper bg
  size?: number; // wrapper size
  children: React.ReactNode; // the icon
}

export const IconWrapper: React.FC<IconWrapperProps> = ({
  color = "#000",
  backgroundColor = "#f0f0f0",
  size = 32,
  children,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor,
      }}
    >
      {children}
    </div>
  );
};

export const resourceConfig: Record<
  string,
  {
    primaryColor: string;
    secondaryColor: string;
    icon: React.ReactNode;
    title: string;
    data: Array<Object>;
  }
> = {
  rooms: {
    primaryColor: "#1890ff",
    secondaryColor: "#E6F4FF",
    icon: (
      <IconWrapper backgroundColor="#E6F4FF">
        <HomeOutlined className="md" style={{ color: "#1890ff" }} />
      </IconWrapper>
    ),
    title: "Number of rooms",
    data: [
      { index: "1", value: 4000 },
      { index: "2", value: 3000 },
      { index: "3", value: 2000 },
      { index: "4", value: 3400 },
      { index: "5", value: 2700 },
    ],
  },
  bookings: {
    primaryColor: "#fa8c16",
    secondaryColor: "#fffae8",
    icon: (
      <IconWrapper backgroundColor="#fffae8">
        <BookOutlined className="md" style={{ color: "#fa8c16" }} />
      </IconWrapper>
    ),
    title: "Total bookings in season",
    data: [
      { index: "1", value: 2400 },
      { index: "2", value: 1398 },
      { index: "3", value: 9800 },
      { index: "4", value: 3908 },
      { index: "5", value: 4800 },
    ],
  },
  staffs: {
    primaryColor: "#52c41a",
    secondaryColor: "#F6FFED",
    icon: (
      <IconWrapper backgroundColor="#F6FFED">
        <TeamOutlined className="md" style={{ color: "#52c41a" }} />
      </IconWrapper>
    ),
    title: "Number of staffs",
    data: [
      { index: "1", value: 1000 },
      { index: "2", value: 2000 },
      { index: "3", value: 1500 },
      { index: "4", value: 2780 },
      { index: "5", value: 3890 },
    ],
  },
};
