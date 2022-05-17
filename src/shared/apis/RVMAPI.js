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
  }
  return response;
};

const cancelScan = async () => {
  let response = await requestAxios(
    `/rvm/cancelScan/${RVM_SERIAL}`,
    {},
    "PATCH",
    "application/json"
  );
  if (response) {
    console.log(response);
  }
  return response;
};

const collect = async () => {
  let response = await requestAxios(
    `/rvm/collect/${RVM_SERIAL}`,
    { timestamp: new Date().toISOString(), status: "SUCCESS" },
    "POST",
    "application/json"
  );
  if (response) {
    console.log(response);
  }
  return response;
};

const sendNotification = async () => {
  let response = await requestAxios(
    `/rvm/sendNotification/${RVM_SERIAL}`,
    {},
    "POST",
    "application/json"
  );
  if (response) {
    console.log(response);
  }
  return response;
};

const RVMAPI = {
  getRVMData,
  initiateScan,
  cancelScan,
  sendNotification,
  collect,
};

export default RVMAPI;
