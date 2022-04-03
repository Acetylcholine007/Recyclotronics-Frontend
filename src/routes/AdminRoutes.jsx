import { AssignmentRounded, DashboardRounded, HomeRounded, SettingsRounded } from "@mui/icons-material";
import { Route, Switch } from "react-router";

import NotFoundPage from "../shared/pages/NotFoundPage";
import AdminDashboardPage from "../views/dashboardView/pages/AdminDashboardPage";
import ReportPage from "../views/reportView/pages/ReportPage";
import SettingsPage from "../views/settingsView/pages/SettingsPage";

const AdminRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <AdminDashboardPage />
      </Route>
      <Route exact path="/dashboard">
        <AdminDashboardPage />
      </Route>
      <Route exact path="/reports">
        <ReportPage />
      </Route>
      <Route exact path="/settings">
        <SettingsPage />
      </Route>
      <Route exact path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default AdminRoutes;

export const adminRoutes = [
  {
    title: "Dashbaord",
    icon: <DashboardRounded />,
    path: "/dashboard",
  },
  {
    title: "Reports",
    icon: <AssignmentRounded />,
    path: "/reports",
  },
  {
    title: "Settings",
    icon: <SettingsRounded />,
    path: "/settings",
  },
];
