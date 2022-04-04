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
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ScrapAPI from "../../../shared/apis/ScrapAPI";
import RVMAPI from "../../../shared/apis/RVMAPI";
import UserAPI from "../../../shared/apis/UserAPI";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../shared/contexts/AuthContext";

const UserDashboardPage = () => {
  const [scraps, setScraps] = useState([]);
  const [target, setTarget] = useState("DEPOSIT");
  const [points, setPoints] = useState(0);
  const [page, setPage] = useState(1);
  const [rvm, setRvm] = useState("None");
  const auth = useContext(AuthContext);
  const history = useHistory();

  const scanHandler = async () => {
    const response = RVMAPI.initiateScan();
    if (response) {
      history.push("/dashboard/scan");
    } else {
      console.log("RVM is busy");
    }
  };

  useEffect(async () => {
    let scraps = await ScrapAPI.getScraps();
    let rvm = await RVMAPI.getRVMData();
    let user = await UserAPI.getUserData(auth.userId);
    setPoints(user.data.points);
    setScraps(scraps.data);
    setRvm(rvm.data);
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ padding: "2rem" }}>
            <Stack direction={"row"}>
              <Typography variant="h4">
                RVM, Re-start and Trade your E-waste
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
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
          <Button variant="contained" fullWidth={true} onClick={scanHandler}>
            Start Transaction
          </Button>
        </Grid>
        <Grid item md={6} xs={12}>
          <Stack spacing={2}>
            <Card>
              <Stack>
                <Typography variant="h6">Total Points</Typography>
                <Typography variant="h2">{points}</Typography>
              </Stack>
            </Card>
            <Card>
              <Stack>
                <Typography variant="h6">Bin Status</Typography>
                <Typography variant="h2">{rvm.binGauge}</Typography>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserDashboardPage;
