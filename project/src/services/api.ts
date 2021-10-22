import axios, {AxiosInstance, AxiosError, AxiosResponse} from 'axios';


const BASE_URL = 'https://8.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

const enum HttpCode {
  Unauthorized = 401,
}

type UnauthorizedCB = () => void;

export const createAPI = (onUnauthorized: UnauthorizedCB): AxiosInstance => {

  const api = axios.create({baseURL: BASE_URL, timeout: REQUEST_TIMEOUT});

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
