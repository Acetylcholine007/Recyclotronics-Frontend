import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthAPI from "../../../shared/apis/AuthAPI";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import background from "../../../assets/BG.png";

const SignupPage = () => {
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const signupHandler = async (event) => {
    event.preventDefault();
    AuthAPI.signup(fullname, email, password, () => history.push("/login"));
  };

  return (
    <Box>
      <Container align="center" sx={{ marginTop: "4rem" }}>
        <Typography variant="h3" sx={{ marginBottom: "1.5rem" }}>Sign up for an account</Typography>
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
            sx={{backgroundColor: "#f1effb"}}
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
            sx={{backgroundColor: "#f1effb"}}
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
            sx={{backgroundColor: "#f1effb"}}
          />
          <Button variant="contained" size="large" onClick={signupHandler}>
            SIGNUP
          </Button>
          <Stack direction="row" justifyContent="center">
            <Typography variant="h6" color="#7d7d7f">Already have an account?</Typography>
            <Button variant="text" onClick={() => history.push("/login")}>
            <Typography color="#07b464" fontWeight="bold">Log In</Typography>
            </Button>
          </Stack>
        </Stack>
      </Container>
      <img src={background} alt="Background image" style={{ width: "100%", transform: "translateY(65px)"}}/>
    </Box>
  );
};

export default SignupPage;
