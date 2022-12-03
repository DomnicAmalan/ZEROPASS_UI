import Axios, { AxiosInstance } from 'axios'
import { server } from '@/app/config/server';
import { setupInterceptorsTo } from './interceptors';

const BackendInstance: AxiosInstance = Axios.create({
  baseURL: server,
  timeout: 60000,
})

export default setupInterceptorsTo(BackendInstance);