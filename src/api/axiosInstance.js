import axios from "axios";
// const baseURL = "http://localhost:3000"
const baseURL = "https://server.ridevista.online"

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 200000,
    timeoutErrorMessage: "Request Timeout... Please try again!..",
  });
  return instance;
};

export const userAxiosInstance = createAxiosInstance(baseURL);