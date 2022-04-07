import { Inbox, LogoutOutlined, Mail } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Divider,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { adminRoutes } from "../../routes/AdminRoutes";
import { userRoutes } from "../../routes/UserRoutes";
import SmallBinStatusBar from "../../shared/components/SmallBinStatusBar";
import "../../styles/AppDrawer.css";


  let newPath = location.pathname;
  if (newPath === "/") {
    newPath = "/dashboard";
  }
  console.log(newPath);

const AppDrawer = ({ accountType, logoutHandler }) => {
  const history = useHistory();

  return (
    <>
      <div>
        <Toolbar>
          <Typography variant="body1">Reverse Vending Machine</Typography>
        </Toolbar>
        <Divider />
        <div className="navlink-container">
          {(accountType === 1 ? userRoutes : adminRoutes).map((item, index) => (
            <div className="link-wrapper">
              <NavLink
                to={item.path}
                key={index}
                onClick={() => history.push(item.path)}
              >
                <div className="link-content">
                  <span>{item.icon}</span>
                  <p>{item.title}</p>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 style={{textAlign: "center"}}>Bin Status</h1>
        <SmallBinStatusBar />
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
