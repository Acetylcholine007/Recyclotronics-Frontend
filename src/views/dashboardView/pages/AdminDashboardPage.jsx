import {
  Stack,
  Button,
  Container,
  Grid,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RVMAPI from "../../../shared/apis/RVMAPI";
import BinStatusBar from "../../../shared/components/BinStatusBar";

const AdminDashboardPage = () => {
  const [binGauge, setBinGauge] = useState(0);
  const [collectionHistory, setCollectionHistory] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    let response = await RVMAPI.getRVMData(setLoading(true));
    setBinGauge(response.data.binGauge);
    setCollectionHistory(response.data.collectionHistory);
    setLoading(false)
  }, []);

  const sendNotificationHandler = () => {
    console.log("notified");
  };

  const collectHandler = () => {
    console.log("collected");
  };

  return (
    <Container>
      <Grid container>
        <Grid item md={6} xs={12} sx={{marginTop: "1rem"}}>
        <Typography variant="h3" sx={{fontWeight: "bold"}}>Bin Status</Typography>
          <Typography variant="h5" sx={{color: "#acacac"}}>Reverse Vending Machine Status</Typography>
          <BinStatusBar binGauge={binGauge} loading={loading}/>
        </Grid>
        <Grid item md={6} xs={12} sx={{marginTop: "1rem"}}>
          <Typography variant="h5" sx={{fontWeight: "bold"}}>Bin Collection History</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collectionHistory.map((item) => (
                <TableRow>
                  <TableCell align="center">{'Date'}</TableCell>
                  <TableCell align="center">{'Status'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <h1>{collectionHistory}</h1>
          <Stack spacing={2}>
            <Button variant="contained" onClick={sendNotificationHandler}>
              SEND NOTIFICATION
            </Button>
            <Button variant="contained" onClick={collectHandler}>
              COLLECT
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboardPage;
