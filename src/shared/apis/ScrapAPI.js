import requestAxios from "../../utils/requestAxios";

const getScraps = async () => {
  let response = await requestAxios(`/scraps`);
  if (response) {
    console.log(response);
    return response;
  }
};

const updateScrap = async (scrap) => {
  let response = await requestAxios(
    `/scraps/${scrap._id}`,
    {
      name: scrap.name,
      pointsPerKilo: scrap.pointsPerKilo,
      pesoPerPoints: scrap.pesoPerPoints,
    },
    "PUT",
    "application/json"
  );
  if (response) {
    console.log(response);
  }
  return response;
};

const ScrapAPI = {
  getScraps,
  updateScrap,
};

export default ScrapAPI;
