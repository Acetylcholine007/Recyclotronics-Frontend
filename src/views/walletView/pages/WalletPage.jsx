import { AccountBalanceWalletRounded } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Snackbar,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import TransactionAPI from "../../../shared/apis/TransactionAPI";
import UserAPI from "../../../shared/apis/UserAPI";
import { AuthContext } from "../../../shared/contexts/AuthContext";

const WalletPage = () => {
  const auth = useContext(AuthContext);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(async () => {
    let user = await UserAPI.getUserData(auth.userId);
    setBalance(user.data.balance);
  }, []);

  const cashoutHandler = async () => {
    const response = await TransactionAPI.redeem(amount);
    console.log(response);
    if (response.status === 200) {
      setIsSuccess(true);
      setBalance(response.data.balance);
      setShowSnackbar(true);
    } else {
      setIsSuccess(false);
      setShowSnackbar(true);
    }
    console.log(response);
  };

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
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
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
          {isSuccess
            ? "Amount successfully redeemed. Check your email"
            : "Failed to redeem amount"}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default WalletPage;
