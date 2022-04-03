import { RVM_SERIAL } from "../../utils/constants";
import requestAxios from "../../utils/requestAxios";

const getUserData = async (userId) => {
  let response = await requestAxios(`/users/${userId}`);
  if (response) {
    console.log(response);
    return response;
  }
};

const UserAPI = {
    getUserData,
};

export default UserAPI;
