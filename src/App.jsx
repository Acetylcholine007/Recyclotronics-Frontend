import { createTheme, ThemeProvider } from "@mui/material";
import { lime, teal } from "@mui/material/colors";

import AuthContextProvider from "./shared/contexts/AuthContext";
import { useAuth } from "./shared/hooks/useAuth";
import MainContainer from "./containers/MainContainer";
import AuthContainer from "./containers/AuthContainer";
import SnackbarContextProvider from "./shared/contexts/SnackbarContext";
import LoadingContextProvider from "./shared/contexts/LoadingContext";

const theme = createTheme({
  palette: {
    primary: teal,
    secondary: lime,
  },
});

function App() {
  const { token, login, logout, userId, accountType, fullname } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <SnackbarContextProvider>
        <LoadingContextProvider>
          <AuthContextProvider
            value={{
              isLoggedIn: !!token,
              token: token,
              userId: userId,
              accountType: accountType,
              fullname: fullname,
              login: login,
              logout: logout,
            }}
          >
            {!!token && <MainContainer />}
            {!token && <AuthContainer />}
          </AuthContextProvider>
        </LoadingContextProvider>
      </SnackbarContextProvider>
    </ThemeProvider>
  );
}

export default App;
