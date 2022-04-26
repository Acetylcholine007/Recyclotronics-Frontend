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
import React, { useContext, useEffect, useState } from "react";
import ScrapAPI from "../../../shared/apis/ScrapAPI";
import ScrapModal from "../components/ScrapModal";
import LinearProgress from "@mui/material/LinearProgress";
import { SnackbarContext } from "../../../shared/contexts/SnackbarContext";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fff",
    color: "000",
    fontWeight: "bold",
    fontSize: "1.125rem",
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

//loading style
const loadingStyle = {
  marginTop: "1rem",
  transform: "translateX(60%)",
  padding: "50px",
  width: "200%",
};

const sx = {
  fontWeight: "600",
};

const SettingsPage = () => {
  const [scraps, setScraps] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [targetScrap, setTargetScrap] = useState(null);
  const [loading, setLoading] = useState(true);
  const { snackbarDispatch } = useContext(SnackbarContext);

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
    if (response.status === 200) {
      setScraps(() => {
        const newScraps = [...scraps];
        const target = newScraps.find((item) => item._id === response.data._id);
        target.pointsPerKilo = response.data.pointsPerKilo;
        target.pesoPerPoints = response.data.pesoPerPoints;
        target.name = response.data.name;
        return newScraps;
      });
      snackbarDispatch({
        type: "SET_PARAMS",
        payload: {
          message: response.message,
          isOpen: true,
          severity: "success",
        },
      });
    } else {
      snackbarDispatch({
        type: "SET_PARAMS",
        payload: {
          message: response.message,
          isOpen: true,
          severity: "error",
        },
      });
    }
    handleClose();
  };

  useEffect(async () => {
    let response = await ScrapAPI.getScraps(setLoading(true));
    setScraps(response.data);
    setLoading(false);
  }, []);

  return (
    <Container>
      <Card sx={{ marginTop: "1.5rem" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Item</StyledTableCell>
              <StyledTableCell align="center">Points per Kilo</StyledTableCell>
              <StyledTableCell align="center">Peso per points</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <div style={loadingStyle}>
                <LinearProgress color="primary" />
              </div>
            ) : (
              scraps.map((scrap) => (
                <StyledTableRow key={scrap.name}>
                  <StyledTableCell align="left" sx={sx}>
                    {scrap.name}
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={sx}>
                    {scrap.pointsPerKilo}
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={sx}>
                    {scrap.pesoPerPoints}
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={sx}>
                    <Button
                      variant="text"
                      sx={{ color: "#267693", fontWeight: "600" }}
                      onClick={() => handleOpen(scrap)}
                    >
                      EDIT
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
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
