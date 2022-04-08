import { LogoutOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { adminRoutes } from "../../routes/AdminRoutes";
import { userRoutes } from "../../routes/UserRoutes";
import RVMAPI from "../../shared/apis/RVMAPI";
import SmallBinStatusBar from "../../shared/components/SmallBinStatusBar";
import "../../styles/AppDrawer.css";

const AppDrawer = ({ accountType, logoutHandler }) => {
  const history = useHistory();
  const location = useLocation();
  const [binGauge, setBinGauge] = useState(0);

  useEffect(async () => {
    let response = await RVMAPI.getRVMData();
    setBinGauge(response.data.binGauge);
  }, []);

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
        {location.pathname === "/dashboard" ||
        location.pathname === "/" ? null : (
          <div>
            <h1 style={{ textAlign: "center" }}>Bin Status</h1>
            <SmallBinStatusBar binGauge={binGauge} />
          </div>
        )}
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
