import { Inbox, LogoutOutlined, Mail } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
          <Typography variant="body1">Reverse Vending Machine</Typography>
        </Toolbar>
        <Divider />
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
