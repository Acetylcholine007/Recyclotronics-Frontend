import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import RVMAPI from "../../../shared/apis/RVMAPI";

const AdminDashboardPage = () => {
  const [binGauge, setBinGauge] = useState(0);
  const [collectionHistory, setCollectionHistory] = useState([]);

  useEffect(async () => {
    let response = await RVMAPI.getRVMData();
    console.log(response);
    setBinGauge(response.data.binGauge);
    setCollectionHistory(response.data.collectionHistory);
  }, []);

  const sendNotificationHandler = () => {
    console.log('notified');
  };

  const collectHandler = () => {
    console.log('collected');
  };

  return (
    <Box>
      <h1>{binGauge}</h1>
      <h1>{collectionHistory}</h1>
      <Button variant="contained" onClick={sendNotificationHandler}>
        SEND NOTIFICATION
      </Button>
      <Button variant="contained" onClick={collectHandler}>
        SEND NOTIFICATION
      </Button>
    </Box>
  );
};

export default AdminDashboardPage;
