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
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import background from "../../../assets/BG.png";

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
        <Typography variant="h3" sx={{ marginBottom: "1rem" }}>Sign in</Typography>
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
                  <AlternateEmailIcon/>
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
          <Button variant="contained" size="large" onClick={loginHandler}>
            LOGIN
          </Button>
          <Stack direction="row" justifyContent="center">
            <Typography variant="h6" color="#7d7d7f">Don't have and account?</Typography>
            <Button variant="text" onClick={() => history.push("/signup")}>
              <Typography color="#07b464" fontWeight="bold">Sign Up</Typography>
            </Button>
          </Stack>
        </Stack>
      </Container>
      <img src={background} alt="Background image" style={{ width: "100%", transform: "translateY(105px)"}}/>
    </Box>
  );
};

export default LoginPage;
