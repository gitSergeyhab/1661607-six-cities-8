import axios, {AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig} from 'axios';
import { getToken } from './token';
/* eslint-disable no-console */


const BASE_URL = 'https://8.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;
const TOKEN_HEADER = 'X-Token';


const enum HttpCode {
  Unauthorized = 401,
}

type UnauthorizedCB = () => void;


export const createAPI = (onUnauthorized: UnauthorizedCB): AxiosInstance => {

  const api = axios.create({baseURL: BASE_URL, timeout: REQUEST_TIMEOUT});

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      console.log('token', token);
      if (token) {
        console.log('+ token', token);
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
        return onUnauthorized();
      }

      return Promise.reject(error);
    },
  );

  return api;
};
