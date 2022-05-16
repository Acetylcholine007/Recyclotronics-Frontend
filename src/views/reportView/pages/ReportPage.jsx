import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  TableContainer,
  TableFooter,
  Paper,
  Button,
} from "@mui/material";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import TransactionAPI from "../../../shared/apis/TransactionAPI";
import LinearProgress from "@mui/material/LinearProgress";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [target, setTarget] = useState("DEPOSIT");
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    let response = await TransactionAPI.getTransactions(
      target,
      page,
      setLoading(true)
    );
    setReports(response.data);
    setTotalItems(response.totalItems);
    setTotalPoints(response.totalPoints);
    setLoading(false);
  }, [target, page]);

  //button navigator style
  const btnStyle = {
    margin: "0 3px",
    height: "30px",
  };

  //loading style
  const depositLoading = {
    marginTop: "1rem",
    transform: "translateX(40%)",
    padding: "70px",
    width: "200%",
  };

  const redeemLoading = {
    marginTop: "1rem",
    transform: "translateX(40%)",
    padding: "70px",
    width: "170%",
  };

  //For empty rows in table
  // const emptyRows =
  //   page > 1 ? Math.max(0, (1 + page) * rowsPerPage - 12) : 0;

  //Atleast one button is active
  const handleButton = (event, activeButton) => {
    if (activeButton !== null) {
      setTarget(activeButton);
    }
  };

  function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals).toFixed(
      decimals
    );
  }

  return (
    <Container align="center" sx={{ marginTop: "1rem" }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
      >
        <Typography variant="h6">Transaction History</Typography>
        <ToggleButtonGroup
          sx={{ marginLeft: { md: "25%", sm: 0 }, border: "1px solid #146356" }}
          color="primary"
          value={target}
          exclusive
          onChange={handleButton}
        >
          <ToggleButton
            value="DEPOSIT"
            sx={{
              backgroundColor: "#146356",
              color: "#fff",
              border: "1px solid #146356",
            }}
          >
            Deposit
          </ToggleButton>
          <ToggleButton
            value="REDEEM"
            sx={{
              backgroundColor: "#146356",
              color: "#fff",
              border: "1px solid #146356",
            }}
          >
            Redeem
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {target === "DEPOSIT" ? (
              <TableRow>
                <TableCell>User Email</TableCell>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>E-waste</TableCell>
                <TableCell>Points</TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell>User Email</TableCell>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {loading ? (
              <div
                style={target === "DEPOSIT" ? depositLoading : redeemLoading}
              >
                <LinearProgress color="primary" />
              </div>
            ) : (
              reports.map((report) => {
                const datetime = DateTime.fromISO(report.createdAt);
                if (target === "DEPOSIT") {
                  return (
                    <TableRow key={report._id}>
                      <TableCell>{report.user.email}</TableCell>
                      <TableCell>{report._id}</TableCell>
                      <TableCell>
                        {datetime.toLocaleString(DateTime.DATETIME_MED)}
                      </TableCell>
                      <TableCell>{report.data.scrapType}</TableCell>
                      <TableCell>
                        {round(
                          report.data.weight * report.data.pointsPerKilo,
                          2
                        )}
                      </TableCell>
                    </TableRow>
                  );
                } else {
                  return (
                    <TableRow key={report._id}>
                      <TableCell>{report.user.email}</TableCell>
                      <TableCell>{report._id}</TableCell>
                      <TableCell>
                        {datetime.toLocaleString(DateTime.DATETIME_MED)}
                      </TableCell>
                      <TableCell>{`₱ ${(+report.data.amount)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}</TableCell>
                    </TableRow>
                  );
                }
              })
            )}
            {/* {emptyRows > 0 && (
              <TableRow style={{ height: 9 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )} */}
          </TableBody>
          <TableFooter>
            <tr>
              <td colSpan="4">
                <div
                  style={{
                    margin: "1rem 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <div>{`Transaction Count: ${totalItems}`}</div>
                  <div>{`Total Points Deposited: ${round(
                    totalPoints,
                    2
                  )}`}</div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <h5 style={{ margin: "0 5px" }}>Page: {page}</h5>
                    {page !== 1 && page <= Math.ceil(totalItems / 12) && (
                      <Button
                        style={btnStyle}
                        variant="outlined"
                        startIcon={<NavigateBeforeIcon />}
                        onClick={() => setPage(page - 1)}
                      >
                        <h5>Back</h5>
                      </Button>
                    )}
                    {page >= 1 && page < Math.ceil(totalItems / 12) && (
                      <Button
                        style={btnStyle}
                        variant="outlined"
                        endIcon={<NavigateNextIcon />}
                        onClick={() => setPage(page + 1)}
                      >
                        <h5>Next</h5>
                      </Button>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ReportPage;
