import {
  Box,
  Button,
  Container,
  styled,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  tableCellClasses,
  Card,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ScrapAPI from "../../../shared/apis/ScrapAPI";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const SettingsPage = () => {
  const [scraps, setScraps] = useState([]);

  useEffect(async () => {
    let response = await ScrapAPI.getScraps();
    setScraps(response.data);
  }, []);

  return (
    <Container>
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Item</StyledTableCell>
              <StyledTableCell align="right">Points per gram</StyledTableCell>
              <StyledTableCell align="right">Peso per points</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scraps.map((scrap) => (
              <StyledTableRow key={scrap.name}>
                <StyledTableCell align="right">{scrap.name}</StyledTableCell>
                <StyledTableCell align="right">
                  {scrap.pointsPerGram}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {scrap.pesoPerPoints}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button variant="text">EDIT</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
};

export default SettingsPage;
