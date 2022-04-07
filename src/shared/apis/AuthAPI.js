import requestAxios from "../../utils/requestAxios";

const login = async (email, password, callback, errorCallback) => {
  let response = await requestAxios(
    "/auth/user/login",
    { email, password },
    "POST",
    "application/json"
  );
  if (response.status === 200) {
    console.log(response);
    callback(
      response.data.userId,
      response.data.token,
      response.data.accountType
    );
  } else {
    errorCallback(response.data.message || "Failed to login");
  }
  return response;
};

const signup = async (fullname, email, password, callback, errorCallback) => {
  let response = await requestAxios(
    "/auth/user/signup",
    { fullname, email, password },
    "POST",
    "application/json"
  );
  if (response.status === 201) {
    console.log(response);
    callback(true);
  } else {
    errorCallback(response.data.message || "Failed to signup");
  }
  return response;
};

const resendConfirmation = async (email, callback, errorCallback) => {
  let response = await requestAxios(
    "/auth/user/sendVerification",
    { email },
    "POST",
    "application/json"
  );
  if (response.status === 200) {
    console.log(response);
    callback("Email verification sent.");
  } else {
    errorCallback(response.data.message || "Failed to send verification");
  }
  return response;
};

const AuthAPI = {
  signup,
  login,
  resendConfirmation,
};

export default AuthAPI;
