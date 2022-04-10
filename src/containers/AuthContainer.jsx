import { Alert, Box, LinearProgress, Snackbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import AuthRoutes from "../routes/AuthRoutes";
import { LoadingContext } from "../shared/contexts/LoadingContext";
import { SnackbarContext } from "../shared/contexts/SnackbarContext";

const AuthContainer = () => {
  const { snackbarParams, snackbarDispatch } = useContext(SnackbarContext);
  const { loadingParams } = useContext(LoadingContext);

  return (
    <Box>
      {loadingParams.isOpen && <LinearProgress />}
      <AuthRoutes />
      <Snackbar
        anchorOrigin={{
          vertical: snackbarParams.vertical,
          horizontal: snackbarParams.horizontal,
        }}
        open={snackbarParams.isOpen}
        autoHideDuration={snackbarParams.duration}
        onClose={() => snackbarDispatch({ type: "SET_SHOW", payload: false })}
      >
        <Alert
          onClose={() => snackbarDispatch({ type: "SET_SHOW", payload: false })}
          severity={snackbarParams.severity}
          variant="filled"
        >
          {snackbarParams.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AuthContainer;
