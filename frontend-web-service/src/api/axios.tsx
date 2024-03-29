import axios from 'axios';
import { toast } from 'react-toastify';

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
  const notifyError = (message: string) => toast.error(message);

  try {
    const response = await API(options);
    const notAuthorized = response?.status;

    if (notAuthorized === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        if(!(location.href === '/')) {
          return notifyError(response.data.message)
        }
        location.href = '/';
      }
    }

    if (response.status >= 400) {
      throw new Error(response.data.message);
    }

    return { error: false, response };
  } catch (error) {
    return { error: true, response: error };
  }
};

export const createOptions = ({ method, url, data = null, headers = {} }: Options): Options => {
  return {
    method,
    url,
    data,
    headers,
  };
};


export const generateHeaders = () => {
  const headers = {
    Authorization:`Bearer ${localStorage.getItem('token')}`
  }

  return headers
}


