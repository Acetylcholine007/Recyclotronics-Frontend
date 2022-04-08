import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LS_USER_DATA, TOKEN_EXPIRATION } from "../../utils/constants";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const history = useHistory();

  const login = useCallback((uid, token, type, name, expirationDate) => {
    console.log(name);
    const tokenExpirationDate = expirationDate || TOKEN_EXPIRATION;
    console.log(tokenExpirationDate);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      LS_USER_DATA,
      JSON.stringify({
        userId: uid,
        token,
        accountType: type,
        fullname: name,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    setUserId(uid);
    setAccountType(type);
    setFullname(name);
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setFullname(null);
    localStorage.removeItem(LS_USER_DATA);
    history.push("/");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(LS_USER_DATA));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.accountType,
        storedData.fullname,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId, accountType, fullname };
};
