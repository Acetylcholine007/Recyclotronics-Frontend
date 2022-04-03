import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TransactionAPI from "../../../shared/apis/TransactionAPI";

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [target, setTarget] = useState("DEPOSIT");
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(async () => {
    let response = await TransactionAPI.getTransactions(target, page);
    setReports(response.data);
  }, [target, page]);

  return (
    <Container align="center">
      <ToggleButtonGroup
        color="primary"
        value={target}
        exclusive
        onChange={(event, val) => setTarget(val)}
      >
        <ToggleButton value="DEPOSIT">Deposit</ToggleButton>
        <ToggleButton value="REDEEM">Redeem</ToggleButton>
      </ToggleButtonGroup>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Withdrawal Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report) => (
            <TableRow>
              <TableCell>{"Date"}</TableCell>
              <TableCell>
                <Button variant="text">View Report</Button>
              </TableCell>
              <TableCell>
                <Button variant="text">Download Report</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h1>{totalItems}</h1>
    </Container>
  );
};

export default ReportPage;
