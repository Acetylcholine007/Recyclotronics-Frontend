import requestAxios from "../../utils/requestAxios";

const login = async (email, password, callback) => {
  let response = await requestAxios(
    "/auth/user/login",
    { email, password },
    "POST",
    "application/json"
  );
  if (response) {
    console.log(response);
    callback(
      response.data.userId,
      response.data.token,
      response.data.accountType
    );
  }
};

const signup = async (fullname, email, password, callback) => {
  let response = await requestAxios(
    "/auth/user/signup",
    { fullname, email, password },
    "POST",
    "application/json"
  );
  if (response) {
    callback();
  }
};

const AuthAPI = {
  signup,
  login,
};

export default AuthAPI;
