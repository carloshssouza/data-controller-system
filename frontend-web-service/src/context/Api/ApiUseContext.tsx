import axios from 'axios';
import { useContext } from 'react';
import { ApiContext } from './ApiContext';

export const useApi = () => {
  const { apiData, setApiData } = useContext(ApiContext);

  const getAllApis = async () => {
    try {
      const response = await axios.get(`${import.meta.env.BASE_URL}/api-info`)
      
      if(response.status !== 200) {
        throw new Error('Error getting api by id')
      } else {
        setApiData({
          apis: response.data,
          error: false
        });
      }
    } catch (error) {
      console.error(error);
      setApiData((prevState: any) => ({...prevState, error: true}))    }
  };

  const getApiById = async (id: string) => {
    try {
      const response = await axios.get(`${import.meta.env.BASE_URL}/api-info/${id}`)
      if(response.status !== 200) {
        throw new Error('Error getting api by id')
      }
      else {
        setApiData({
          apis: response.data,
          error: false
        });
      }
      
    } catch (error) {
      console.error(error);
      setApiData((prevState: any) => ({...prevState, error: true}))
    }
  }

  return { apiData, getAllApis };
};
