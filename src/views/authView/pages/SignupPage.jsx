import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthAPI from "../../../shared/apis/AuthAPI";

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
        <Typography variant="h3">Sign up for an account</Typography>
        <Stack component="form" spacing={2} noValidate autoComplete="off">
          <TextField
            id="fullname"
            label="Full Name"
            type="text"
            variant="outlined"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            fullWidth={true}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            fullWidth={true}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            fullWidth={true}
          />
          <Button variant="contained" onClick={signupHandler}>
            SIGNUP
          </Button>
          <Stack direction="row" justifyContent="center">
            <Typography variant="h6">Already have an account?</Typography>
            <Button variant="text" onClick={() => history.push("/login")}>
              Log In
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default SignupPage;
