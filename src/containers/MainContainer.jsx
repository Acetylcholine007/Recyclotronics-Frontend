import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import UserRoutes from "../routes/UserRoutes";
import AdminRoutes from "../routes/AdminRoutes";
import { useContext } from "react";
import { AuthContext } from "../shared/contexts/AuthContext";

const MainContainer = () => {
  const auth = useContext(AuthContext);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            VitaBand
          </Typography>
          <Button color="inherit">LOGOUT</Button>
        </Toolbar>
      </AppBar>
      {auth.accountType === 1 && <UserRoutes />}
      {auth.accountType === 2 && <AdminRoutes />}
    </Box>
  );
};

export default MainContainer;
