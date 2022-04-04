import { RVM_SERIAL } from "../../utils/constants";
import requestAxios from "../../utils/requestAxios";

const getRVMData = async () => {
  let response = await requestAxios(`/rvm/${RVM_SERIAL}`);
  if (response) {
    console.log(response);
    return response;
  }
};

const initiateScan = async () => {
  let response = await requestAxios(
    `/rvm/initiateScan/${RVM_SERIAL}`,
    {},
    "PATCH",
    "application/json"
  );
  if (response) {
    console.log(response);
    return response;
  }
};

const RVMAPI = {
  getRVMData,
  initiateScan,
};

export default RVMAPI;
