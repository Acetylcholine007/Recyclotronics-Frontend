import {
  Box,
  Card,
  CircularProgress,
  Container,
  LinearProgress,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const PromptPage = () => {
  return (
    <Stack spacing={2} alignItems="center">
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
      <img
        src="../assets/images/Input.png"
        alt="input image"
        style={{ width: "20rem" }}
      />
      <Box sx={{ width: "100%" }}>
        <CircularProgress />
        <Typography variant="h6">
          Waiting for RVM machine response
        </Typography>
      </Box>
    </Stack>
  );
};

export default PromptPage;
