import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const SummaryPane = ({ result }) => {
  return (
    <>
      <Card>
        <Typography variant="h3">SCAN RESULT</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>E-Waste</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{"Laptop"}</TableCell>
              <TableCell>{"100"}</TableCell>
              <TableCell>{"10"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <Button variant="contained" fullWidth={true}>
        SCAN AGAIN
      </Button>
    </>
  );
};

export default SummaryPane;
