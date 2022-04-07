import { Inbox, LogoutOutlined, Mail } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Button,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { adminRoutes } from "../../routes/AdminRoutes";
import { userRoutes } from "../../routes/UserRoutes";
import SmallBinStatusBar from "../../shared/components/SmallBinStatusBar";
import "../../styles/AppDrawer.css";

// let newPath = location.pathname;
// if (newPath === "/") {
//   newPath = "/dashboard";
// }
// console.log(newPath);

const AppDrawer = ({ accountType, logoutHandler }) => {
  const history = useHistory();
  const location = useLocation();
  
  return (
    <>
      <div>
        <Toolbar>
          <Stack direction="row" alignItems="center">
            <Avatar
              sx={{ marginRight: "1rem" }}
              alt="avatar"
              src="/assets/images/eco.png"
            />
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Reverse Vending Machine
            </Typography>
          </Stack>
        </Toolbar>
        <Divider />
        <div className="navlink-container">
          {(accountType === 1 ? userRoutes : adminRoutes).map((item, index) => (
            <div className="link-wrapper" key={index}>
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
        {location.pathname === "/dashboard" || location.pathname === "/" ? null : <div>
            <h1 style={{ textAlign: "center" }}>Bin Status</h1>
            <SmallBinStatusBar />
          </div>
        }
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
