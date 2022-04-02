import { Route, Switch } from "react-router";
import NotFoundPage from "../shared/pages/NotFoundPage";

import LoginPage from "../views/authView/pages/LoginPage";
import SignupPage from "../views/authView/pages/SignupPage";

const AuthRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <LoginPage />
      </Route>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/signup">
        <SignupPage />
      </Route>
      <Route exact path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default AuthRoutes;
