import axios from 'axios';

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
    console.log('response', response)
   
    const notAuthorized = response?.status;

    if (notAuthorized === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        window.location.href = '/login';
      }
    }

    if (response.status >= 400) {
      throw new Error(response.data.message);
    }

    return { error: false, response };
  } catch (error) {
    console.log(error)
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
    'Content-Type': 'application/json',
    Authorization:`Bearer ${localStorage.getItem('token')}`
  }

  return headers
}


