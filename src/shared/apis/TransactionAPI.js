import requestAxios from "../../utils/requestAxios";

const getTransactions = async (target, page) => {
  let response = await requestAxios(
    `/transactions/?target=${target}&page=${page}`
  );
  if (response) {
    console.log(response);
    return response;
  }
};

const getUserTransactions = async (target, page, userId) => {
  let response = await requestAxios(
    `/transactions/user/${userId}/?target=${target}&page=${page}`
  );
  if (response) {
    console.log(response);
    return response;
  }
};

const redeem = async (amount) => {
  let response = await requestAxios(
    `/transactions/redeem`,
    { amount },
    "POST",
    "application/json"
  );
  if (response) {
    console.log(response);
    return response;
  }
};

const TransactionAPI = {
  getTransactions,
  getUserTransactions,
  redeem,
};

export default TransactionAPI;
