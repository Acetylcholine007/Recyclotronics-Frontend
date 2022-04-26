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
    <Stack alignItems="stretch" spacing={2} sx={{ width: "50%" }}>
      <Card
        sx={{
          padding: "2rem",
        }}
      >
        <Typography variant="h3">
          {result.scanResult
            ? "SCAN SUCCESSFUL"
            : result.payload.scrapType === "Multiple"
            ? "MULTIPLE ITEMS DETECTED"
            : "ITEM UNIDENTIFIED"}
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
                <TableCell align="center">Points per Kilo</TableCell>
                <TableCell align="center">Peso per Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">{result.payload.scrapType}</TableCell>
                <TableCell align="center">{result.payload.weight}</TableCell>
                <TableCell align="center">
                  {result.payload.pointsPerKilo}
                </TableCell>
                <TableCell align="center">
                  {result.payload.pesoPerPoints}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
        {!result.scanResult && result.payload.scrapType === "Multiple" && (
          <Typography variant="h5">
            Only load one item to RVM per scan
          </Typography>
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
