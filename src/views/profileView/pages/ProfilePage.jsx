import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import TransactionAPI from "../../../shared/apis/TransactionAPI";

const ProfilePage = () => {
  const [reports, setReports] = useState([]);
  const [isDeposited, setIsDeposited] = useState(true);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(async () => {
    let response = await TransactionAPI.getTransactions(
      isDeposited ? "DEPOSIT" : "REDEEM",
      page
    );
    setReports(response.data);
  }, [isDeposited, page]);

  return (
    <Box>
      <h1>{reports}</h1>
      <h1>{totalItems}</h1>
    </Box>
  );
};

export default ProfilePage;
