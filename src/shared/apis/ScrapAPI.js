import requestAxios from "../../utils/requestAxios";

const getScraps = async () => {
  let response = await requestAxios(`/scraps`);
  if (response) {
    console.log(response);
    return response;
  }
};

const ScrapAPI = {
    getScraps,
};

export default ScrapAPI;
