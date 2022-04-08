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
  styled
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ScrapAPI from "../../../shared/apis/ScrapAPI";
import RVMAPI from "../../../shared/apis/RVMAPI";
import UserAPI from "../../../shared/apis/UserAPI";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../shared/contexts/AuthContext";
import ExtraSmallBinStatus from "../../../shared/components/ExtraSmallBinStatus";
import LinearProgress from '@mui/material/LinearProgress';

const UserDashboardPage = () => {
  const [scraps, setScraps] = useState([]);
  const [target, setTarget] = useState("DEPOSIT");
  const [balance, setBalance] = useState(0);
  const [page, setPage] = useState(1);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [rvm, setRvm] = useState("None");
  const [loading, setLoading] = useState(true)
  const auth = useContext(AuthContext);
  const history = useHistory();

  const scanHandler = async () => {
    const response = await RVMAPI.initiateScan(setLoading(true));
    console.log(">>>>>>>", response);
    if (response.status === 200) {
      history.push("/dashboard/scan");
      setLoading(false)
    } else {
      setShowSnackbar(true);
      setLoading(false)
    }
  };

  useEffect(async () => {
    let scraps = await ScrapAPI.getScraps(setLoading(true));
    let rvm = await RVMAPI.getRVMData(setLoading(true));
    let user = await UserAPI.getUserData(auth.userId,setLoading(true));
    setBalance(user.data.balance);
    setScraps(scraps.data);
    setRvm(rvm.data);
    setLoading(false)
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
    fontSize: "1.1rem"
  }

  //for loading style
  const tableDashboard = {
    marginTop: "1rem",
    transform: "translateX(25%)",
    padding: "50px",
    width: "250%",
  }

  const totalPoints = {
    marginTop: "1rem",
    transform: "translateX(10%)",
    padding: "25px",
    width: "80%",
  }

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
                sx={{ fontWeight: "bold", fontStyle: "italic", color: "#232859" }}
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
          <Stack spacing={2} sx={{marginBottom: "1rem"}}>
            <Card elevation={0} sx={{ padding: 2 }}>
              <Typography variant="h5">Exchange</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={tableHead}>Item</TableCell>
                    <TableCell sx={tableHead}>Points</TableCell>
                    <TableCell sx={tableHead}>Previous</TableCell>
                    <TableCell sx={tableHead}>Updated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? <div style={tableDashboard}><LinearProgress/></div> : scraps.map((scrap) => (
                    <StyledTableRow key={scrap.name}>
                      <TableCell sx={{fontWeight: "600"}}>{scrap.name}</TableCell>
                      <TableCell sx={{fontWeight: "600"}}>{scrap.pointsPerGram}</TableCell>
                      <TableCell sx={{color: "#8c8fa7", fontWeight: "600"}}>{scrap.pesoPerPoints}</TableCell>
                      <TableCell sx={{color: "#07b464", fontWeight: "600"}}>{scrap.pesoPerPoints}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            <Button
              variant="contained"
              fullWidth={true}
              onClick={scanHandler}
              sx={{ fontSize: "1.5rem", fontWeight: "bold", backgroundColor: "#146356" }}
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
                borderStyle: "dashed",
                borderColor: "#17b294",
                borderRadius: "30px"
              }}
              elevation={0}
            >
              <img
                src="/assets/images/point.png"
                alt="points"
                style={{ height: "5rem" }}
              />
              <Stack>
                <Typography variant="h4" sx={{fontWeight: "bold", color: "#acacac"}}>Total Points</Typography>
                {loading ? <div style={totalPoints}><LinearProgress/></div> : 
                  <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                    {balance}
                  </Typography>
                }
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
                borderRadius: "30px"
              }}
              elevation={0}
              >
              <ExtraSmallBinStatus />
              <Stack>
                <Typography variant="h4" sx={{fontWeight: "bold", color: "#acacac"}}>Bin Status</Typography>
                {loading ? <div style={totalPoints}><LinearProgress/></div> : 
                  <Typography
                  variant="h2"
                  sx={{ fontWeight: "bold" }}
                  >
                    {`${rvm.binGauge}%`}
                  </Typography>
                }
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
