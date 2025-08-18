import {
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
