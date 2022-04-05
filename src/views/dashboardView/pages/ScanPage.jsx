import { Container } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import RVMAPI from "../../../shared/apis/RVMAPI";
import { useSocket } from "../../../shared/hooks/useSocket";
import PromptPage from "../components/PromptPane";
import SummaryPane from "../components/SummaryPane";

const ScanPage = () => {
  const [status, setStatus] = useState("SCANNING");
  const [isBusy, setIsBusy] = useState(false);
  const [data, setData] = useState(null);
  const history = useHistory();

  const scanHandler = async () => {
    const response = RVMAPI.initiateScan();
    if (response) {
      setStatus("SCANNING");
    } else {
      setIsBusy(true);
    }
  };

  const exitHandler = () => {
    history.push("/dashboard");
  };

  const socketHandler = (data) => {
    console.log("???????", data);
    setStatus("IDLE");
    setData(data);
  };

  useSocket("scan", socketHandler);

  return (
    <Container align="center">
      {status === "SCANNING" && <PromptPage />}
      {status === "IDLE" && data !== null && (
        <SummaryPane
          result={data}
          scanHandler={scanHandler}
          exitHandler={exitHandler}
        />
      )}
    </Container>
  );
};

export default ScanPage;
