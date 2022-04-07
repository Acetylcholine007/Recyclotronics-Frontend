import {
  Box,
  Button,
  Stack,
  Container,
  TextField,
  Typography,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AuthAPI from "../../../shared/apis/AuthAPI";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../shared/contexts/AuthContext";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import { useLocation } from "react-router-dom";

const LoginPage = () => {
  const auth = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const [showResendVerification, setShowResendVerification] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const loginHandler = async (event) => {
    event.preventDefault();
    const response = await AuthAPI.login(
      email,
      password,
      auth.login,
      (message) => {
        setSnackbarMessage(message);
        setIsInfo(false);
        setShowSnackbar(true);
      }
    );
    if (response.status === 403) {
      console.log('reached')
      setShowResendVerification(true);
    }
    history.push("/");
  };

  const verificationHandler = async () => {
    await AuthAPI.resendConfirmation(
      email,
      (message) => {
        setSnackbarMessage(message);
        setIsInfo(true);
        setShowSnackbar(true);
      },
      (message) => {
        setSnackbarMessage(message);
        setIsInfo(false);
        setShowSnackbar(true);
      }
    );
  };

  useEffect(() => {
    if (location.state?.toVerify) {
      setSnackbarMessage(
        "Open verification email sent to you before logging in."
      );
      setIsInfo(true);
      setShowSnackbar(true);
    }
  }, []);

  return (
    <Box>
      <Container align="center" sx={{ marginTop: "4rem" }}>
        <Typography variant="h3" sx={{ marginBottom: "1rem" }}>
          Sign in
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
          Enter your email and password below
        </Typography>
        <Stack component="form" spacing={2} noValidate autoComplete="off">
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            fullWidth={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "#f1effb" }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            fullWidth={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "#f1effb" }}
          />
          <Button variant="contained" size="large" onClick={loginHandler}>
            LOGIN
          </Button>
          {showResendVerification && (
            <Button variant="text" size="large" onClick={verificationHandler}>
              Resend Email Verification
            </Button>
          )}
          <Stack direction="row" justifyContent="center">
            <Typography variant="h6" color="#7d7d7f">
              Don't have and account?
            </Typography>
            <Button variant="text" onClick={() => history.push("/signup")}>
              <Typography color="#07b464" fontWeight="bold">
                Sign Up
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity={isInfo ? "info" : "error"}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <img
        src='/assets/images/BG.png'
        alt="Background image"
        style={{ width: "100%", transform: "translateY(105px)" }}
      />
    </Box>
  );
};

export default LoginPage;
