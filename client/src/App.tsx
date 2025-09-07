import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { RefineThemes, useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { authProvider, dataProvider, liveProvider } from "./providers";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp, ConfigProvider, theme } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";

import {
  Home,
  Login,
  ForgotPassword,
  Register,
  RoomsList,
  BookingsList,
} from "./pages";
import Layout from "./components/layout";
import { resources } from "./config/resources";
import { useAppContext } from "./context/AppContext";
import RoomCreate from "./pages/room/create";
import BookingCreate from "./pages/booking/create";
import RoomEdit from "./pages/room/edit";
import BookingEdit from "./pages/booking/edit";
import TasksList from "./pages/tasks/list";
import TasksCreate from "./pages/tasks/create";
import TasksEdit from "./pages/tasks/edit";
import StaffsList from "./pages/staff/list";
import StaffEdit from "./pages/staff/edit";

function App() {
  const { state } = useAppContext();

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <AntdApp>
          <ConfigProvider
            theme={{
              ...RefineThemes.Purple,
              algorithm:
                state.theme === "light"
                  ? theme.defaultAlgorithm
                  : theme.darkAlgorithm,

              components: {
                Layout: {
                  bodyBg: state.theme === "light" ? "#f7f8fa" : "#000",
                },
              },
            }}
          >
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider ?? undefined}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "aVMkCO-KvEZfr-woLgO6",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route
                    element={
                      <Authenticated
                        key={"authenticated-layout"}
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <Layout>
                          <Outlet />
                        </Layout>
                      </Authenticated>
                    }
                  >
                    <Route index element={<Home />} />
                    <Route path="/rooms">
                      <Route index element={<RoomsList />} />
                      <Route path="new" element={<RoomCreate />} />
                      <Route path="edit/:id" element={<RoomEdit />} />
                    </Route>
                    <Route path="/bookings">
                      <Route index element={<BookingsList />} />
                      <Route path="new" element={<BookingCreate />} />
                      <Route path="edit/:id" element={<BookingEdit />} />
                    </Route>
                    <Route
                      path="/tasks"
                      element={
                        <TasksList>
                          <Outlet />
                        </TasksList>
                      }
                    >
                      <Route path="new" element={<TasksCreate />} />
                      <Route path="edit/:id" element={<TasksEdit />} />
                    </Route>
                    <Route path="/staffs">
                      <Route index element={<StaffsList />} />
                      <Route path="new" element={<BookingCreate />} />
                      <Route path="edit/:id" element={<StaffEdit />} />
                    </Route>
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </ConfigProvider>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
