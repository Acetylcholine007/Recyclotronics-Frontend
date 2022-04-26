import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: '1rem',
  p: 4,
};

const ScrapModal = ({ scrap, open, handleClose, handleSubmit }) => {
  const [newScrap, setNewScrap] = useState({});

  useEffect(() => {
    setNewScrap({ ...scrap });
  }, [scrap]);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack spacing={2}>
          <TextField
            id="pointsPerKilo"
            label="Points per Kilo"
            type="number"
            variant="outlined"
            onChange={(e) =>
              setNewScrap({ ...newScrap, pointsPerKilo: e.target.value })
            }
            value={newScrap.pointsPerKilo}
            fullWidth={true}
          />
          <TextField
            id="pesoPerPoints"
            label="Peso Per Points"
            type="pesoPerPoints"
            variant="outlined"
            onChange={(e) =>
              setNewScrap({ ...newScrap, pesoPerPoints: e.target.value })
            }
            value={newScrap.pesoPerPoints}
            fullWidth={true}
          />
          <Button variant="contained" onClick={() => handleSubmit(newScrap)}>
            SAVE
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ScrapModal;
