import { Box, Button, Card, Container, TextField } from "@mui/material";
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
      <Container>
        <Card align="center">
          <TextField
            id="fullname"
            label="Full Name"
            type="text"
            variant="filled"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="filled"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="filled"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button variant="contained" onClick={signupHandler}>
            SIGNUP
          </Button>
          <Button variant="contained" onClick={() => history.push("/login")}>
            HAVE AN ACCOUNT
          </Button>
        </Card>
      </Container>
    </Box>
  );
};

export default SignupPage;
