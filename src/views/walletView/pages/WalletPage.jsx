import { AccountBalanceWalletRounded } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import TransactionAPI from "../../../shared/apis/TransactionAPI";
import UserAPI from "../../../shared/apis/UserAPI";
import { AuthContext } from "../../../shared/contexts/AuthContext";
import LinearProgress from '@mui/material/LinearProgress';
import { SnackbarContext } from "../../../shared/contexts/SnackbarContext";

const WalletPage = () => {
  const auth = useContext(AuthContext);
  const { snackbarDispatch } = useContext(SnackbarContext);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    let user = await UserAPI.getUserData(auth.userId, setLoading(true));
    setBalance(user.data.balance);
    setLoading(false)
  }, []);

  const cashoutHandler = async () => {
    const response = await TransactionAPI.redeem(amount, setLoading(false));
    console.log(response);
    if (response.status === 200) {
      setBalance(response.data.balance);
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
          message: response.data.message || response.message,
          isOpen: true,
          severity: "error",
        },
      });
    }
    console.log(response);
  };

  //loading style
const loadingWallet = {
  width: "100%",
  marginTop: "0.85rem"
}

  return (
    <Container align="center">
      <Toolbar>
        <Avatar sx={{backgroundColor: "#cbf2ff", padding: "2rem"}}>
          <AccountBalanceWalletRounded sx={{color: "#0f5fc2", fontSize: "2.25rem"}}/>
        </Avatar>
        <Stack sx={{ marginLeft: "1rem" }} alignItems="flex-start">
          <Typography variant="h5" sx={{fontWeight: "500", color: "#acacac"}}>Balance</Typography>
          {loading ? 
            <div style={loadingWallet}><LinearProgress color="primary"/></div> 
            : 
              <Typography variant="h4" sx={{fontWeight: "bold", color: "#333333"}}>{balance}</Typography>
          }
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
          <Button variant="contained" onClick={cashoutHandler} fullWidth={true} sx={{fontWeight:"bold", padding: "0.85rem", fontSize: "1.25rem", borderRadius: "20px", backgroundColor: "#146356"}}>
            PROCESS
          </Button>
          <Typography variant="h6" sx={{fontWeight: "400", color: "#8c8fa7" }}>The final amount could change</Typography>
          <Typography variant="h6" sx={{fontWeight: "400", color: "#8c8fa7" }}>
            depending on the market conditions.
          </Typography>
        </Stack>
      </Card>
    </Container>
  );
};

export default WalletPage;
