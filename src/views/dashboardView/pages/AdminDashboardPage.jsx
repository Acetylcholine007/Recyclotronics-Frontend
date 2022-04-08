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
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RVMAPI from "../../../shared/apis/RVMAPI";
import BinStatusBar from "../../../shared/components/BinStatusBar";
import LinearProgress from '@mui/material/LinearProgress';
import { DateTime } from "luxon";

const AdminDashboardPage = () => {
  const [binGauge, setBinGauge] = useState(0);
  const [collectionHistory, setCollectionHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(async () => {
    let response = await RVMAPI.getRVMData(setLoading(true));
    setBinGauge(response.data.binGauge);
    setCollectionHistory(response.data.collectionHistory);
    setLoading(false);
  }, []);

  const sendNotificationHandler = async () => {
    const response = await RVMAPI.sendNotification();
    if (response.status === 200) {
      setSnackbarMessage("Collection notification sent");
      setIsSuccess(true);
      setShowSnackbar(true);
    } else {
      setSnackbarMessage("Failed to send notification");
      setIsSuccess(false);
      setShowSnackbar(true);
    }
  };

  const collectHandler = async () => {
    const response = await RVMAPI.collect(setLoading(true));
    if (response.status === 200) {
      setCollectionHistory([...collectionHistory, response.data]);
      setSnackbarMessage("RVM collection recorded");
      setIsSuccess(true);
      setShowSnackbar(true);
      setLoading(false)
    } else {
      setSnackbarMessage("Failed to record collection");
      setIsSuccess(false);
      setShowSnackbar(true);
      setLoading(false)
    }
  };

  //loading style
  const styleLoading = {
    marginTop: "1rem",
    transform: "translateX(20%)",
    padding: "35px",
    width: "150%",
  }

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
              {loading ? <div style={styleLoading}><LinearProgress color="primary" /></div> : collectionHistory.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    {DateTime.fromISO(item.timestamp).toLocaleString(
                      DateTime.DATETIME_MED
                    )}
                  </TableCell>
                  <TableCell align="center">{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity={isSuccess ? "success" : "error"}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminDashboardPage;
