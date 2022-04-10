import {
  Box,
  Card,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import imageURI from "/images/Input.png";

const PromptPage = () => {
  return (
    <>
      <LinearProgress />
      <Stack spacing={2} alignItems="center" sx={{marginTop: '2rem'}}>
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
      </Stack>
    </>
  );
};

export default PromptPage;
