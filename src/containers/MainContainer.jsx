import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Card,
  Stack,
  Snackbar,
  Alert,
  LinearProgress,
} from "@mui/material";
import UserRoutes from "../routes/UserRoutes";
import AdminRoutes from "../routes/AdminRoutes";
import { useContext, useState } from "react";
import { AuthContext } from "../shared/contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { Menu } from "@mui/icons-material";
import AppDrawer from "./components/AppDrawer";
import { useHistory } from "react-router-dom";
import { SnackbarContext } from "../shared/contexts/SnackbarContext";
import { LoadingContext } from "../shared/contexts/LoadingContext";

const drawerWidth = 240;

const MainContainer = ({ window }) => {
  const auth = useContext(AuthContext);
  const { loadingParams } = useContext(LoadingContext);
  const { snackbarParams, snackbarDispatch } = useContext(SnackbarContext);
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
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#FBFBFE", width: "100vw" }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          color: "black",
          backgroundColor: "#FBFBFE",
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
          <Card sx={{ padding: "0.5rem" }} elevation={0}>
            <Stack direction="row" alignItems="center">
              <Avatar
                sx={{ marginRight: "1rem" }}
                alt="avatar"
                src="https://media.istockphoto.com/photos/orange-slice-picture-id1163872349?k=20&m=1163872349&s=612x612&w=0&h=1oVhcd6gYzgvDCVJVqJN_6mPUnHCd9uYQk5rZ3Il_9s="
              />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {/* {auth.accountType === 1 ? "User" : "Admin"} */}
                {auth.fullname}
              </Typography>
            </Stack>
          </Card>
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
              borderWidth: 0,
            },
          }}
        >
          <AppDrawer
            accountType={auth.accountType}
            logoutHandler={logoutHandler}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderWidth: 0,
            },
          }}
          open
        >
          <AppDrawer
            accountType={auth.accountType}
            logoutHandler={logoutHandler}
          />
        </Drawer>
      </Box>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        {loadingParams.isOpen && <LinearProgress />}
        {auth.accountType === 1 && <UserRoutes />}
        {auth.accountType === 2 && <AdminRoutes />}
        <Snackbar
          anchorOrigin={{
            vertical: snackbarParams.vertical,
            horizontal: snackbarParams.horizontal,
          }}
          open={snackbarParams.isOpen}
          autoHideDuration={snackbarParams.duration}
          onClose={() => snackbarDispatch({ type: "SET_SHOW", payload: false })}
        >
          <Alert
            onClose={() =>
              snackbarDispatch({ type: "SET_SHOW", payload: false })
            }
            severity={snackbarParams.severity}
            variant="filled"
          >
            {snackbarParams.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default MainContainer;
