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

const SummaryPane = ({ result, scanHandler, exitHandler }) => {
  return (
    <>
      <Card>
        <Typography variant="h3">
          {result.scanResult ? "SCAN SUCCESSFUL" : "ITEM UNIDENTIFIED"}
        </Typography>
        {result.scanResult && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>E-Waste</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Points per Gram</TableCell>
                <TableCell>Peso per Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{result.payload.scrapType}</TableCell>
                <TableCell>{result.payload.weight}</TableCell>
                <TableCell>{result.payload.pointsPerGram}</TableCell>
                <TableCell>{result.payload.pesoPerPoints}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </Card>
      <Button variant="contained" fullWidth={true} onClick={scanHandler}>
        SCAN AGAIN
      </Button>
      <Button variant="contained" fullWidth={true} onClick={exitHandler}>
        EXIT
      </Button>
    </>
  );
};

export default SummaryPane;
