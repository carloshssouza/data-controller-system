import axios, { AxiosRequestHeaders } from 'axios';

export const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  
  validateStatus: function (status) {
    return status <= 500;
  },
});

export type Options = {
  method: string;
  data?: any;
  params?: any;
  url: string;
  headers?: any;
};

export type Response = {
  response: any;
  error?: boolean;
};

export const requestAPI = async (options: Options) => {
  try {
    const response = await API(options);
   
    const notAuthorized = response?.status;

    if (notAuthorized === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return { error: false, response };
  } catch (error) {
    return { error: true, response: error };
  }
};