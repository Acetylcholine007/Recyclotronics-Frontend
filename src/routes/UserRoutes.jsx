import { AccountBalanceRounded, AccountBalanceWalletRounded, DashboardRounded, HomeRounded, PersonRounded } from "@mui/icons-material";
import { Route, Switch } from "react-router";

import NotFoundPage from "../shared/pages/NotFoundPage";
import ScanPage from "../views/dashboardView/pages/ScanPage";
import ScanSummary from "../views/dashboardView/pages/ScanSummary";
import UserDashboardPage from "../views/dashboardView/pages/UserDashboardPage";
import ProfilePage from "../views/profileView/pages/ProfilePage";
import CheckoutSummary from "../views/walletView/pages/CheckoutSummary";
import WalletPage from "../views/walletView/pages/WalletPage";

const UserRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <UserDashboardPage />
      </Route>
      <Route exact path="/dashboard">
        <UserDashboardPage />
      </Route>
      <Route exact path="/dashboard/scan">
        <ScanPage />
      </Route>
      <Route exact path="/dashboard/scanSummary">
        <ScanSummary />
      </Route>
      <Route exact path="/profile">
        <ProfilePage />
      </Route>
      <Route exact path="/wallet">
        <WalletPage />
      </Route>
      <Route exact path="/wallet/summary">
        <CheckoutSummary />
      </Route>
      <Route exact path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default UserRoutes;

export const userRoutes = [
  {
    title: "Dashboard",
    icon: <DashboardRounded />,
    path: "/dashboard",
  },
  {
    title: "Transactions",
    icon: <PersonRounded />,
    path: "/profile",
  },
  {
    title: "Wallet",
    icon: <AccountBalanceWalletRounded />,
    path: "/wallet",
  },
];
