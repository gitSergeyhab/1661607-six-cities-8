import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { getToken } from './token';

const BASE_URL = 'https://8.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;
const TOKEN_HEADER = 'X-Token';

const enum HttpCode {
  Unauthorized = 401,
  NotFound = 404,
}

type CreateAPIArgsCB = () => void;


export const createAPI = (onUnauthorized: CreateAPIArgsCB, onNotFound: CreateAPIArgsCB): AxiosInstance => {

  const api = axios.create({baseURL: BASE_URL, timeout: REQUEST_TIMEOUT});

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      if (token) {
        config.headers[TOKEN_HEADER] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const {response} = error;

      if (response?.status === HttpCode.Unauthorized) {
        onUnauthorized();
      }

      if (response?.status === HttpCode.NotFound) {
        console.log(response, response.status);

        onNotFound();
      }
      console.log(response);
      return Promise.reject(error);
    },
  );
  return api;
};
