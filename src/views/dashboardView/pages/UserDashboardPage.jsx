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
  styled,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ScrapAPI from "../../../shared/apis/ScrapAPI";
import RVMAPI from "../../../shared/apis/RVMAPI";
import UserAPI from "../../../shared/apis/UserAPI";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../shared/contexts/AuthContext";
import ExtraSmallBinStatus from "../../../shared/components/ExtraSmallBinStatus";
import LinearProgress from "@mui/material/LinearProgress";
import { SnackbarContext } from "../../../shared/contexts/SnackbarContext";
import vendingMachineURI from "/images/vending-machine.png"
import pointURI from "/images/point.png"

const UserDashboardPage = () => {
  const [scraps, setScraps] = useState([]);
  const [balance, setBalance] = useState(0);
  const [rvm, setRvm] = useState("None");
  const [loading, setLoading] = useState(true);
  const auth = useContext(AuthContext);
  const { snackbarDispatch } = useContext(SnackbarContext);
  const history = useHistory();

  const scanHandler = async () => {
    setLoading(true);
    const response = await RVMAPI.initiateScan();
    setLoading(false);
    if (response.status === 200) {
      history.push("/dashboard/scan");
    } else {
      console.log('>>>>>>>',response)
      snackbarDispatch({
        type: "SET_PARAMS",
        payload: {
          message: response.data.message || response.message,
          isOpen: true,
          severity: "error",
        },
      });
    }
  };

  useEffect(async () => {
    let scraps = await ScrapAPI.getScraps(setLoading(true));
    let rvm = await RVMAPI.getRVMData(setLoading(true));
    let user = await UserAPI.getUserData(auth.userId, setLoading(true));
    setBalance(user.data.balance);
    setScraps(scraps.data);
    setRvm(rvm.data);
    setLoading(false);
  }, []);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  //for table head
  const tableHead = {
    fontWeight: "bold",
    fontSize: "1.1rem",
  };

  //for loading style
  const tableDashboard = {
    marginTop: "1rem",
    transform: "translateX(25%)",
    padding: "50px",
    width: "250%",
  };

  const totalPoints = {
    marginTop: "1rem",
    transform: "translateX(10%)",
    padding: "25px",
    width: "80%",
  };

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
                sx={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  color: "#232859",
                }}
                align="center"
              >
                RVM, Re-start and Trade
                <br />
                your E-waste
              </Typography>
              <img
                src={vendingMachineURI}
                alt="vending machine"
                style={{ width: "10rem" }}
              />
            </Stack>
          </Card>
        </Grid>
        <Grid item md={7} xs={12}>
          <Stack spacing={2} sx={{ marginBottom: "1rem" }}>
            <Card elevation={0} sx={{ padding: 2 }}>
              <Typography variant="h5">Exchange</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={tableHead} align='center'>Item</TableCell>
                    <TableCell sx={tableHead} align='center'>Prevous PPG</TableCell>
                    <TableCell sx={tableHead} align='center'>Current PPG</TableCell>
                    <TableCell sx={tableHead} align='center'>Peso per Point</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <div style={tableDashboard}>
                      <LinearProgress />
                    </div>
                  ) : (
                    scraps.map((scrap) => (
                      <StyledTableRow key={scrap.name}>
                        <TableCell sx={{ fontWeight: "600" }} align='center'>
                          {scrap.name}
                        </TableCell>
                        <TableCell sx={{ color: "#8c8fa7", fontWeight: "600" }} align='center'>
                          {scrap.previousPPG}
                        </TableCell>
                        <TableCell sx={{ color: "#07b464", fontWeight: "600" }} align='center'>
                          {scrap.pointsPerGram}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "600" }} align='center'>
                          {scrap.pesoPerPoints}
                        </TableCell>
                      </StyledTableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
            <Button
              variant="contained"
              fullWidth={true}
              onClick={scanHandler}
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                backgroundColor: "#146356",
              }}
            >
              Start
              <br />
              Transaction
            </Button>
          </Stack>
        </Grid>
        <Grid item md={5} xs={12}>
          <Stack spacing={2}>
            <Card
              sx={{
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                borderStyle: "dashed",
                borderColor: "#17b294",
                borderRadius: "30px",
              }}
              elevation={0}
            >
              <img
                src={pointURI}
                alt="points"
                style={{ height: "5rem" }}
              />
              <Stack>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "#acacac" }}
                >
                  Total Balance
                </Typography>
                {loading ? (
                  <div style={totalPoints}>
                    <LinearProgress />
                  </div>
                ) : (
                  <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                    {`₱ ${balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
                  </Typography>
                )}
              </Stack>
            </Card>
            <Card
              sx={{
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                borderStyle: "dashed",
                borderColor: "#17b294",
                borderRadius: "30px",
              }}
              elevation={0}
            >
              <ExtraSmallBinStatus />
              <Stack>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "#acacac" }}
                >
                  Bin Status
                </Typography>
                {loading ? (
                  <div style={totalPoints}>
                    <LinearProgress />
                  </div>
                ) : (
                  <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                    {`${rvm.binGauge}%`}
                  </Typography>
                )}
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserDashboardPage;
