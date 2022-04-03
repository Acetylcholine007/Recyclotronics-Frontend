import { RVM_SERIAL } from "../../utils/constants";
import requestAxios from "../../utils/requestAxios";

const getRVMData = async (rvmSerial) => {
  let response = await requestAxios(`/rvm/${RVM_SERIAL}`);
  if (response) {
    console.log(response);
    return response;
  }
};

const RVMAPI = {
  getRVMData,
};

export default RVMAPI;
