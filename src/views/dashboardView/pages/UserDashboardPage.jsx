import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import TransactionAPI from "../../../shared/apis/TransactionAPI";
import RVMAPI from "../../../shared/apis/RVMAPI";
import { useHistory } from "react-router-dom";

const UserDashboardPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [target, setTarget] = useState("DEPOSIT");
  const [page, setPage] = useState(1);
  const [rvm, setRvm] = useState("None");
  const history = useHistory();

  useEffect(async () => {
    let transactions = await TransactionAPI.getUserTransactions(target, page);
    let rvm = await RVMAPI.getRVMData();
    setTransactions(transactions.data);
    setRvm(rvm.data);
  }, []);

  return (
    <Box>
      <h1>{transactions.toString()}</h1>
      <h1>{rvm.toString()}</h1>
      <Button variant="contained" onClick={() => history.push("/scan")}>
        Start Transactions
      </Button>
    </Box>
  );
};

export default UserDashboardPage;
