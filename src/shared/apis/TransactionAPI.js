import requestAxios from "../../utils/requestAxios";

const getTransactions = async (target, page) => {
  let response = await requestAxios(`/transactions/?target=${target}&page=${page}`);
  if (response) {
    console.log(response);
    return response;
  }
};

const getUserTransactions = async (target, page) => {
  let response = await requestAxios(`/transactions/?target=${target}&page=${page}`);
  if (response) {
    console.log(response);
    return response;
  }
};

const TransactionAPI = {
    getTransactions,
    getUserTransactions
};

export default TransactionAPI;
