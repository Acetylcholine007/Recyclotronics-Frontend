import {
  Button,
  Card,
  Stack,
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
    <Stack alignItems="stretch" spacing={2} sx={{width: '50%'}}>
      <Card
        sx={{
          padding: "2rem",
        }}
      >
        <Typography variant="h3">
          {result.scanResult ? "SCAN SUCCESSFUL" : "ITEM UNIDENTIFIED"}
        </Typography>
      </Card>
      <Card
        sx={{
          padding: "2rem",
        }}
      >
        {result.scanResult && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">E-Waste</TableCell>
                <TableCell align="center">Weight</TableCell>
                <TableCell align="center">Points per Gram</TableCell>
                <TableCell align="center">Peso per Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">{result.payload.scrapType}</TableCell>
                <TableCell align="center">{result.payload.weight}</TableCell>
                <TableCell align="center">
                  {result.payload.pointsPerGram}
                </TableCell>
                <TableCell align="center">
                  {result.payload.pesoPerPoints}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </Card>
      <Button
        variant="contained"
        onClick={scanHandler}
        sx={{ fontSize: "2rem" }}
      >
        SCAN AGAIN
      </Button>
      <Button
        variant="contained"
        onClick={exitHandler}
        sx={{ fontSize: "2rem" }}
        fullWidth={true}
      >
        EXIT
      </Button>
    </Stack>
  );
};

export default SummaryPane;
