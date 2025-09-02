import {
  BookOutlined,
  DashboardOutlined,
  HomeOutlined,
  ProjectOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
  },
  {
    name: "rooms",
    list: "/rooms",
    show: "/rooms/:id",
    create: "rooms/new",
    edit: "/rooms/edit/:id",
    meta: {
      label: "Rooms",
      icon: <HomeOutlined />,
    },
  },
  {
    name: "bookings",
    list: "/bookings",
    show: "/bookings/:id",
    create: "bookings/new",
    edit: "/bookings/edit/:id",
    meta: {
      label: "Bookings",
      icon: <BookOutlined />,
    },
  },

  {
    name: "tasks",
    list: "/tasks",
    create: "tasks/new",
    edit: "/tasks/edit/:id",
    meta: {
      label: "Tasks",
      icon: <ProjectOutlined />,
    },
  },
  {
    name: "staff",
    list: "/staff",
    show: "/staff/:id",
    create: "staff/new",
    edit: "/staff/edit/:id",
    meta: {
      label: "Staff",
      icon: <TeamOutlined />,
    },
  },
];
