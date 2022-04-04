import { createTheme, ThemeProvider } from "@mui/material";
import { lime, teal } from "@mui/material/colors";

import AuthContextProvider from "./shared/contexts/AuthContext";
import { useAuth } from "./shared/hooks/useAuth";
import { BrowserRouter as Router } from "react-router-dom";
import MainContainer from "./containers/MainContainer";
import AuthContainer from "./containers/AuthContainer";

const theme = createTheme({
  palette: {
    primary: teal,
    secondary: lime,
  },
});

function App() {
  const { token, login, logout, userId, accountType } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          accountType: accountType,
          login: login,
          logout: logout,
        }}
      >
        <Router>
          {!!token && <MainContainer />}
          {!token && <AuthContainer />}
        </Router>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
