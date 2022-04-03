import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import UserRoutes from "../routes/UserRoutes";
import AdminRoutes from "../routes/AdminRoutes";
import { useContext, useState } from "react";
import { AuthContext } from "../shared/contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { Menu } from "@mui/icons-material";
import AppDrawer from "./components/AppDrawer";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const MainContainer = ({ window }) => {
  const auth = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const appbarTitleSelector = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/dashboard":
        return "Dashboard";
      case "/profile":
        return "Profile";
      case "/wallet":
        return "Wallet";
      case "/reports":
        return "Reports";
      case "/settings":
        return "Settings";
      default:
        return "Reverse Vending Machine";
    }
  };

  const logoutHandler = () => {
    auth.logout();
    history.push('/');
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {appbarTitleSelector()}
          </Typography>
          <Button color="inherit" onClick={logoutHandler}>
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <AppDrawer />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <AppDrawer />
        </Drawer>
      </Box>
      <Box>
        <Toolbar />
        {auth.accountType === 1 && <UserRoutes />}
        {auth.accountType === 2 && <AdminRoutes />}
      </Box>
    </Box>
  );
};

export default MainContainer;
