import {
  Box,
  Button,
  Stack,
  Container,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import React, { useContext, useState } from "react";
import AuthAPI from "../../../shared/apis/AuthAPI";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../shared/contexts/AuthContext";
import { AccountCircleRounded } from "@mui/icons-material";

const LoginPage = () => {
  const auth = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const loginHandler = async (event) => {
    event.preventDefault();
    AuthAPI.login(email, password, auth.login);
    history.push("/");
  };

  return (
    <Box>
      <Container align="center" sx={{ marginTop: "4rem" }}>
        <Typography variant="h3">Sign in</Typography>
        <Typography variant="body1">
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
          <Button variant="contained" onClick={loginHandler}>
            LOGIN
          </Button>
          <Stack direction="row" justifyContent="center">
            <Typography variant="h6">Don't have and account?</Typography>
            <Button variant="text" onClick={() => history.push("/signup")}>
              Sign Up
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default LoginPage;
