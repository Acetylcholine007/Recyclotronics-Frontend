import axios from "axios";
import { API_URL, APP_DEBUG, LS_USER_DATA } from "./constants";

const requestAxios = async (endpoint, body, method, type) => {
  try {
    method = (method && method.toUpperCase()) || "GET";
    const storedData = JSON.parse(localStorage.getItem(LS_USER_DATA));
    let token = storedData?.token || false;

    APP_DEBUG && console.log(`${API_URL}${endpoint}`);

    let headers = {
      Authorization: token ? `Bearer ${token}` : undefined,
    };

    if (type) {
      headers["Content-Type"] = type;
    }

    let response = false;

    try {
      response = await axios({
        url: `${API_URL}${endpoint}`,
        method: method,
        data: method === "GET" ? undefined : JSON.stringify(body),
        headers,
      });

      return { ...response.data, status: response.status };
    } catch (err) {
      console.error(err);
      return err.response;
    }
  } catch (err) {
    console.log(error);
    console.error("HTTP request failed", err);
    return false;
  }
};

export default requestAxios;
