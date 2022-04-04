import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { DateTime } from "luxon";
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
    setTotalItems(response.totalItems);
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
            <TableCell>User Email</TableCell>
            <TableCell>Transaction ID</TableCell>
            <TableCell>Date Time</TableCell>
            <TableCell>E-waste</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report) => {
            const datetime = DateTime.fromISO(report.createdAt);
            return (
              <TableRow key={report._id}>
                <TableCell>{report.user.email}</TableCell>
                <TableCell>{report._id}</TableCell>
                <TableCell>
                  {datetime.toLocaleString(DateTime.DATETIME_MED)}
                </TableCell>
                <TableCell>{report.data.scrapType}</TableCell>
                <TableCell>
                {report.data.weight * report.data.pointsPerGram}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <h1>{totalItems}</h1>
    </Container>
  );
};

export default ReportPage;
