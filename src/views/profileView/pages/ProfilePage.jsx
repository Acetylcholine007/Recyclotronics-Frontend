import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  TableFooter,
  Paper,
  Button,
  LinearProgress
} from "@mui/material";
import { DateTime } from "luxon";
import React, { useContext, useEffect, useState } from "react";
import TransactionAPI from "../../../shared/apis/TransactionAPI";
import { AuthContext } from "../../../shared/contexts/AuthContext";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const ProfilePage = () => {
  const [reports, setReports] = useState([]);
  const [target, setTarget] = useState("DEPOSIT");
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [loading, setLoading] = useState(true)
  const auth = useContext(AuthContext);

  useEffect(async () => {
    let response = await TransactionAPI.getUserTransactions(
      target,
      page,
      auth.userId,
      setLoading(true)
    );
    setReports(response.data);
    setTotalItems(response.totalItems);
    setLoading(false)
  }, [target, page]);

  //button navigator style
  const btnStyle = {
    margin: "0 3px",
    height: "30px"
  }

  //loading style
  const depositLoading = {
    marginTop: "1rem",
    transform: "translateX(50%)",
    padding: "50px",
    width: "150%",
  }

  const redeemLoading = {
    marginTop: "1rem",
    transform: "translateX(50%)",
    padding: "50px",
    width: "120%",
  }

  // //For empty rows in table
  // const emptyRows =
  //   page > 1 ? Math.max(0, (1 + page) * rowsPerPage - 12) : 0;

  //Atleast one button is active
  const handleButton = (event, activeButton) => {
    if (activeButton !== null) {
      setTarget(activeButton);
    }
  }

  return (
    <Container align="center" sx={{marginTop: "1rem"}}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem"}}>
        <Typography variant="h6">Transaction History</Typography>
          <ToggleButtonGroup
            sx={{marginLeft: "25%", border: "1px solid #146356"}}
            color="primary"
            value={target}
            exclusive
            onChange={handleButton}
          >
            <ToggleButton value="DEPOSIT" sx={{backgroundColor: "#146356", color: "#fff", border: "1px solid #146356"}}>Deposit</ToggleButton>
            <ToggleButton value="REDEEM" sx={{backgroundColor: "#146356", color: "#fff", border: "1px solid #146356"}}>Redeem</ToggleButton>
        </ToggleButtonGroup>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
              {target === "DEPOSIT" ? 
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Date Time</TableCell>
                <TableCell>E-waste</TableCell>
                <TableCell>Points</TableCell>
              </TableRow>
              : 
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Date Time</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
              }
          </TableHead>
          <TableBody>
            {loading ? <div style={target === "DEPOSIT" ? depositLoading : redeemLoading}><LinearProgress color="primary"/></div> : reports.map((report) => {
              const datetime = DateTime.fromISO(report.createdAt);
              if(target === "DEPOSIT"){
                return (
                  <TableRow key={report._id}>
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
              } else{
                return (
                  <TableRow key={report._id}>
                    <TableCell>{report._id}</TableCell>
                    <TableCell>
                      {datetime.toLocaleString(DateTime.DATETIME_MED)}
                    </TableCell>
                    <TableCell>{report.data.amount}</TableCell>
                  </TableRow>
                )
              }
            })}
            {/* {emptyRows > 0 && (
                <TableRow style={{ height: 12 * emptyRows }}>
                  <TableCell colSpan={4} />
                </TableRow>
              )} */}
          </TableBody>
        </Table>
        <TableFooter>
            <div style={{ margin: "1rem 0", display: "flex", alignItems: "center"}}>
              <h5 style={{margin: "0 5px"}}>Page: {page}</h5>
              {page === 1 ? 
                <Button style={btnStyle} variant="outlined" endIcon={<NavigateNextIcon />} onClick={() => setPage(page + 1)}>
                  <h5>Next</h5>
                </Button> : 
                <div>
                  { page <= totalItems ? 
                    <Button style={btnStyle} variant="outlined" startIcon={<NavigateBeforeIcon />} onClick={() => setPage(page - 1)}>
                      <h5>Back</h5>
                    </Button>
                    : 
                    <div>
                      <Button style={btnStyle} variant="outlined" startIcon={<NavigateBeforeIcon />} onClick={() => setPage(page - 1)}>
                        <h5>Back</h5>
                      </Button>
                      <Button style={btnStyle} variant="outlined" endIcon={<NavigateNextIcon />} onClick={() => setPage(page + 1)}>
                        <h5>Next</h5>
                      </Button>
                    </div>
                  }
                </div>
              }
            </div>
          </TableFooter>
      </TableContainer>
    </Container> 
  );
};

export default ProfilePage;