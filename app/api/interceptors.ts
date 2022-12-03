import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // config.headers = {
  //   Authorization: 'Bearer DUMMY'
  // }
  return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}