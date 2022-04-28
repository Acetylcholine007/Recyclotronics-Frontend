import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthAPI from "../../../shared/apis/AuthAPI";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import { SnackbarContext } from "../../../shared/contexts/SnackbarContext";
import backgroundUrl from "/images/background.svg";
import { LoadingContext } from "../../../shared/contexts/LoadingContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignupPage = () => {
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { snackbarDispatch } = useContext(SnackbarContext);
  const history = useHistory();
  const { loadingDispatch } = useContext(LoadingContext);

  const signupHandler = async (event) => {
    event.preventDefault();
    loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
    await AuthAPI.signup(
      fullname,
      email,
      password,
      (isSuccess) => {
        loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
        history.push({ pathname: "/login", state: { toVerify: isSuccess } });
      },
      (message) => {
        loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
        snackbarDispatch({
          type: "SET_PARAMS",
          payload: {
            message: message,
            isOpen: true,
            severity: "error",
          },
        });
      }
    );
  };

  return (
    <Box>
      <Container align="center" sx={{ marginTop: "4rem" }}>
        <Typography variant="h3" sx={{ marginBottom: "1.5rem" }}>
          Sign up for an account
        </Typography>
        <Stack component="form" spacing={2} noValidate autoComplete="off">
          <TextField
            id="fullname"
            label="Full Name"
            type="text"
            variant="outlined"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            fullWidth={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "#f1effb" }}
          />
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
            type={showPassword ? "text" : "password"}
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
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "#f1effb" }}
          />
          <Button variant="contained" size="large" onClick={signupHandler}>
            SIGNUP
          </Button>
          <Stack direction="row" justifyContent="center">
            <Typography variant="h6" color="#7d7d7f">
              Already have an account?
            </Typography>
            <Button variant="text" onClick={() => history.push("/login")}>
              <Typography color="#07b464" fontWeight="bold">
                Log In
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Container>
      <div
        style={{
          position: "absolute",
          width: "-webkit-fill-available",
          bottom: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          zIndex: '-10'
        }}
      >
        <img
          src={backgroundUrl}
          alt="Background image"
          style={{ width: "100%" }}
        />
      </div>
    </Box>
  );
};

export default SignupPage;
