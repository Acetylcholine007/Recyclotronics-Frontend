import {
  Stack,
  Button,
  Card,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ScrapAPI from "../../../shared/apis/ScrapAPI";
import RVMAPI from "../../../shared/apis/RVMAPI";
import UserAPI from "../../../shared/apis/UserAPI";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../shared/contexts/AuthContext";
import { Battery20Rounded } from "@mui/icons-material";

const UserDashboardPage = () => {
  const [scraps, setScraps] = useState([]);
  const [target, setTarget] = useState("DEPOSIT");
  const [balance, setBalance] = useState(0);
  const [page, setPage] = useState(1);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [rvm, setRvm] = useState("None");
  const auth = useContext(AuthContext);
  const history = useHistory();

  const scanHandler = async () => {
    const response = await RVMAPI.initiateScan();
    console.log(">>>>>>>", response);
    if (response.status === 200) {
      history.push("/dashboard/scan");
    } else {
      setShowSnackbar(true);
    }
  };

  useEffect(async () => {
    let scraps = await ScrapAPI.getScraps();
    let rvm = await RVMAPI.getRVMData();
    let user = await UserAPI.getUserData(auth.userId);
    setBalance(user.data.balance);
    setScraps(scraps.data);
    setRvm(rvm.data);
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ padding: "2rem" }} elevation={0}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", fontStyle: "italic" }}
                align="center"
              >
                RVM, Re-start and Trade
                <br />
                your E-waste
              </Typography>
              <img
                src="/assets/images/vending-machine.png"
                alt="vending machine"
                style={{ width: "10rem" }}
              />
            </Stack>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Stack spacing={2}>
            <Card elevation={0} sx={{ padding: 2 }}>
              <Typography variant="h5">Exchange</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Points</TableCell>
                    <TableCell>Previous</TableCell>
                    <TableCell>Updated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scraps.map((scrap) => (
                    <TableRow key={scrap.name}>
                      <TableCell>{scrap.name}</TableCell>
                      <TableCell>{scrap.pointsPerGram}</TableCell>
                      <TableCell>{scrap.pesoPerPoints}</TableCell>
                      <TableCell>{scrap.pesoPerPoints}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            <Button
              variant="contained"
              fullWidth={true}
              onClick={scanHandler}
              sx={{ fontSize: "2rem" }}
            >
              Start
              <br />
              Transaction
            </Button>
          </Stack>
        </Grid>
        <Grid item md={6} xs={12}>
          <Stack spacing={2}>
            <Card
              sx={{
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
              elevation={0}
            >
              <img
                src="/assets/images/point.png"
                alt="points"
                style={{ height: "5rem" }}
              />
              <Stack>
                <Typography variant="h6">Total Points</Typography>
                <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                  {balance}
                </Typography>
              </Stack>
            </Card>
            <Card
              sx={{
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
              elevation={0}
            >
              <Battery20Rounded />
              <Stack>
                <Typography variant="h6">Bin Status</Typography>
                <Typography
                  variant="h2"
                  sx={{ fontWeight: "bold" }}
                >{`${rvm.binGauge}%`}</Typography>
              </Stack>
            </Card>
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
          severity="error"
          variant="filled"
        >
          {
            "RVM is currently processing a different user request. Try again after 3 minutes."
          }
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserDashboardPage;
