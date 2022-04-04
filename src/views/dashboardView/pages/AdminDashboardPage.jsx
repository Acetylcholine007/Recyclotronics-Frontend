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

const AdminDashboardPage = () => {
  const [binGauge, setBinGauge] = useState(0);
  const [collectionHistory, setCollectionHistory] = useState([]);

  useEffect(async () => {
    let response = await RVMAPI.getRVMData();
    setBinGauge(response.data.binGauge);
    setCollectionHistory(response.data.collectionHistory);
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
        <Grid item md={6} xs={12}>
          <Typography variant="h5">Reverse Vending Machine Status</Typography>
          <h1>{binGauge} %</h1>
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography variant="h5">Bin Collection History</Typography>
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
