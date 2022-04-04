import { Card, Container, Typography } from "@mui/material";
import React from "react";

const PromptPage = () => {
  return (
    <>
      <Card>
        <Typography variant="h4">Insert Electronic Waste</Typography>
      </Card>

      <Card>
        <Typography variant="h4">
          Click RVM scan button to start processing
        </Typography>
      </Card>
    </>
  );
};

export default PromptPage;
