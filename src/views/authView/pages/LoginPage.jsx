import { Box, Button, Card, Container, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import AuthAPI from "../../../shared/apis/AuthAPI";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../shared/contexts/AuthContext";

const LoginPage = () => {
  const auth = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const loginHandler = async (event) => {
    event.preventDefault();
    AuthAPI.login(email, password, auth.login);
    history.push('/');
  };

  return (
    <Box>
      <Container>
        <Card align="center">
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
          <Button variant="contained" onClick={loginHandler}>
            LOGIN
          </Button>
          <Button variant="contained" onClick={() => history.push("/signup")}>
            REGISTER
          </Button>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;
