import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import RVMAPI from "../../../shared/apis/RVMAPI";
import PromptPage from "../components/PromptPane";
import SummaryPane from "../components/SummaryPane";

const ScanPage = () => {
  const [status, setStatus] = useState("SCANNING");
  const [isBusy, setIsBusy] = useState(false);

  const scanHandler = async () => {
    const response = RVMAPI.initiateScan();
    if (response) {
      setStatus("SCANNING");
    } else {
      setIsBusy(true);
    }
  };

  useEffect(() => {}, []);

  return (
    <Container align="center">
      {status === "SCANNING" && <PromptPage />}
      {status === "IDLE" && <SummaryPane />}
    </Container>
  );
};

export default ScanPage;
