import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import { getToken } from './token';

const BACK_URL = 'https://grading.design.pages.academy/v1/escape-room/';
const REQUEST_TIMOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACK_URL,
    timeout: REQUEST_TIMOUT,
  });

  api.interceptors.request.use(
    (config:AxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    }
  );
  return api;
};

