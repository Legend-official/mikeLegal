import Axios from "axios";
import { HOST } from "./endpoint";

const defaultOptions = () => {
  const headers = {};

  return { headers };
};

export const APIClient = () => {
  const axios = Axios.create({
    baseURL: HOST,
    timeout: 20000,
    ...defaultOptions(),
  });

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response) {
        const status = error.response.status;

        // add more if check to handle different error codes
        if (status === 401 && !originalRequest._retry) {
          //Handle Unauthorized
        } else {
          alert("Something went wrong!");
        }
      } else {
        // error.response is undefined (network errors, etc.)
      }

      return Promise.reject(error);
    }
  );

  return axios;
};
