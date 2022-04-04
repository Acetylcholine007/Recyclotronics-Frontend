import {
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
import ScrapModal from "../components/ScrapModal";

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
  const [open, setOpen] = React.useState(false);
  const [targetScrap, setTargetScrap] = useState(null);
  const handleOpen = (scrap) => {
    setTargetScrap(scrap);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setTargetScrap(null);
  };
  const handleSubmit = async (scrap) => {
    const response = await ScrapAPI.updateScrap(scrap);
    setScraps(() => {
      const newScraps = [...scraps];
      const target = newScraps.find((item) => item._id === response.data._id);
      target.pointsPerGram = response.data.pointsPerGram;
      target.pesoPerPoints = response.data.pesoPerPoints;
      target.name = response.data.name;
      return newScraps;
    });
    handleClose();
  };

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
              <StyledTableCell align="center">Points per gram</StyledTableCell>
              <StyledTableCell align="center">Peso per points</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scraps.map((scrap) => (
              <StyledTableRow key={scrap.name}>
                <StyledTableCell align="left">{scrap.name}</StyledTableCell>
                <StyledTableCell align="center">
                  {scrap.pointsPerGram}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {scrap.pesoPerPoints}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button variant="text" onClick={() => handleOpen(scrap)}>
                    EDIT
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <ScrapModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        scrap={targetScrap}
      />
    </Container>
  );
};

export default SettingsPage;
