import { Inbox, LogoutOutlined, Mail } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import { adminRoutes } from "../../routes/AdminRoutes";
import { userRoutes } from "../../routes/UserRoutes";

const activeChecker = (path) => {
  let newPath = location.pathname;
  if (newPath === "/") {
    newPath = "/dashboard";
  }
  return newPath.includes(path);
};

const AppDrawer = ({ accountType, logoutHandler }) => {
  const history = useHistory();

  return (
    <>
      <div>
        <Toolbar>
          <Stack direction='row' alignItems='center'>
          <Avatar
            sx={{ marginRight: "1rem" }}
            alt="avatar"
            src="/assets/images/eco.png"
          />
          <Typography variant="body1" sx={{fontWeight: 'bold'}}>Reverse Vending Machine</Typography>
          </Stack>
        </Toolbar>
        <Divider variant="middle" sx={{ borderBottomWidth: 4 }}/>
        <List>
          {(accountType === 1 ? userRoutes : adminRoutes).map((item, index) => (
            <ListItem
              button
              key={index}
              selected={activeChecker(item.path)}
              onClick={() => history.push(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "flex-end",
        }}
      >
        <Button
          color="inherit"
          onClick={logoutHandler}
          startIcon={<LogoutOutlined />}
        >
          LOGOUT
        </Button>
      </div>
    </>
  );
};

export default AppDrawer;
