import {
  BookOutlined,
  DashboardOutlined,
  HomeOutlined,
  ProjectOutlined,
  TeamOutlined,
  SettingOutlined,
  FolderOpenOutlined,
  CrownOutlined,
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

  // 👇 Parent menu: Administration
  {
    name: "administration",
    meta: {
      label: "Administration",
      icon: <CrownOutlined />,
    },
  },

  // 👇 Child: Staffs (inside Administration dropdown)
  {
    name: "staffs",
    list: "/staffs",
    show: "/staffs/:id",
    create: "staffs/new",
    edit: "/staffs/edit/:id",
    meta: {
      label: "Staff",
      icon: <TeamOutlined />,
      parent: "administration", // 👈 nests under Administration
    },
  },
];
