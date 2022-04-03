import { Route, Switch } from "react-router";

import NotFoundPage from "../shared/pages/NotFoundPage";
import ScanPage from "../views/dashboardView/pages/ScanPage";
import UserDashboardPage from "../views/dashboardView/pages/UserDashboardPage";
import ProfilePage from "../views/profileView/pages/ProfilePage";
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
      <Route exact path="/scan">
        <ScanPage />
      </Route>
      <Route exact path="/profile">
        <ProfilePage />
      </Route>
      <Route exact path="/wallet">
        <WalletPage />
      </Route>
      <Route exact path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default UserRoutes;
