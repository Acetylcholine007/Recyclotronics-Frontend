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
import React, { useContext, useEffect, useState } from "react";
import RVMAPI from "../../../shared/apis/RVMAPI";
import BinStatusBar from "../../../shared/components/BinStatusBar";
import LinearProgress from "@mui/material/LinearProgress";
import { DateTime } from "luxon";
import { SnackbarContext } from "../../../shared/contexts/SnackbarContext";
import { LoadingContext } from "../../../shared/contexts/LoadingContext";

const AdminDashboardPage = () => {
  const [binGauge, setBinGauge] = useState(0);
  const [collectionHistory, setCollectionHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { snackbarDispatch } = useContext(SnackbarContext);
  const {loadingDispatch} = useContext(LoadingContext);

  useEffect(async () => {
    setLoading(true);
    let response = await RVMAPI.getRVMData();
    setBinGauge(response.data.binGauge);
    setCollectionHistory(response.data.collectionHistory);
    setLoading(false);
  }, []);

  const sendNotificationHandler = async () => {
    loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
    const response = await RVMAPI.sendNotification();
    if (response.status === 200) {
      snackbarDispatch({
        type: "SET_PARAMS",
        payload: {
          message: response.message,
          isOpen: true,
          severity: "success",
        },
      });
    } else {
      snackbarDispatch({
        type: "SET_PARAMS",
        payload: {
          message: response.message,
          isOpen: true,
          severity: "error",
        },
      });
    }
    loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
  };

  const collectHandler = async () => {
    loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
    const response = await RVMAPI.collect();
    if (response.status === 200) {
      setCollectionHistory([...collectionHistory, response.data]);
      snackbarDispatch({
        type: "SET_PARAMS",
        payload: {
          message: response.message,
          isOpen: true,
          severity: "success",
        },
      });
    } else {
      snackbarDispatch({
        type: "SET_PARAMS",
        payload: {
          message: response.message,
          isOpen: true,
          severity: "success",
        },
      });
    }
    loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
  };

  //loading style
  const styleLoading = {
    marginTop: "1rem",
    transform: "translateX(20%)",
    padding: "35px",
    width: "150%",
  };

  return (
    <Container>
      <Grid container>
        <Grid item md={6} xs={12} sx={{ marginTop: "1rem" }}>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Bin Status
          </Typography>
          <Typography variant="h5" sx={{ color: "#acacac" }}>
            Reverse Vending Machine Status
          </Typography>
          <BinStatusBar binGauge={binGauge} loading={loading} />
        </Grid>
        <Grid item md={6} xs={12} sx={{ marginTop: "1rem" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Bin Collection History
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <div style={styleLoading}>
                  <LinearProgress color="primary" />
                </div>
              ) : (
                collectionHistory.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {DateTime.fromISO(item.timestamp).toLocaleString(
                        DateTime.DATETIME_MED
                      )}
                    </TableCell>
                    <TableCell align="center">{item.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <Stack spacing={2}>
            <Button variant="contained" sx={{backgroundColor: "#146356"}} onClick={sendNotificationHandler}>
              SEND NOTIFICATION
            </Button>
            <Button variant="contained" sx={{backgroundColor: "#146356"}} onClick={collectHandler}>
              COLLECT
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboardPage;
