import { AccountBalanceWalletRounded } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import UserAPI from "../../../shared/apis/UserAPI";
import { AuthContext } from "../../../shared/contexts/AuthContext";

const WalletPage = () => {
  const auth = useContext(AuthContext);
  const [balance, setBalance] = useState(0);
  const [cashout, setCashout] = useState(0);

  useEffect(async () => {
    let user = await UserAPI.getUserData(auth.userId);
    setBalance(user.data.points);
  }, []);

  const cashoutHandler = () => {};

  return (
    <Container align="center">
      <Toolbar>
        <Avatar>
          <AccountBalanceWalletRounded />
        </Avatar>
        <Stack sx={{ marginLeft: "1rem" }} alignItems="flex-start">
          <Typography variant="body1">Balance</Typography>
          <Typography variant="h6">{balance}</Typography>
        </Stack>
      </Toolbar>
      <Card sx={{ padding: "2rem", margin: "4rem" }}>
        <Stack spacing={2}>
          <TextField
            id="cashout"
            label="Insert Amount"
            type="number"
            variant="outlined"
            onChange={(e) => setCashout(e.target.value)}
            value={cashout}
            fullWidth={true}
          />
          <Button variant="contained" onClick={cashoutHandler} fullWidth={true}>
            PROCESS
          </Button>
          <Typography variant="body2">The final amount could change</Typography>
          <Typography variant="body2">
            depending on the market conditions
          </Typography>
        </Stack>
      </Card>
    </Container>
  );
};

export default WalletPage;
