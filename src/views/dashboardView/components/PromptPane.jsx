import {
  Box,
  Button,
  Card,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import RVMAPI from "../../../shared/apis/RVMAPI";
import { SnackbarContext } from "../../../shared/contexts/SnackbarContext";
import imageURI from "/images/Input.png";

const PromptPage = () => {
  const history = useHistory();
  const { snackbarDispatch } = useContext(SnackbarContext);

  const cancelHandler = async () => {
    const response = await RVMAPI.cancelScan();
    if (response.status === 200) {
      history.push("/dashboard");
      snackbarDispatch({
        type: "SET_PARAMS",
        payload: {
          message: "Scan Cancelled",
          isOpen: true,
          severity: "info",
        },
      });
    } else {
      console.log(">>>>>>>", response);
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

  return (
    <>
      <LinearProgress />
      <Stack spacing={2} alignItems="center" sx={{ marginTop: "2rem" }}>
        <Card
          sx={{
            backgroundColor: "primary.dark",
            color: "white",
            padding: "2rem",
          }}
          align="left"
        >
          <Typography variant="h4">PROCEDURE:</Typography>
          <Typography variant="h5">
            1. Load Electronic waste in the RVM Machine
          </Typography>
          <Typography variant="h5">
            2. Press the Scan button in the RVM machine
            <br />
            and wait for the result to be displayed here
          </Typography>
        </Card>
        <img src={imageURI} alt="input image" style={{ width: "20rem" }} />
        <Button variant="contained" onClick={cancelHandler} color='error'>
          Cancel Scan
        </Button>
      </Stack>
    </>
  );
};

export default PromptPage;
