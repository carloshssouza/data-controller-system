import axios from 'axios';
import { useContext } from 'react';
import { ApiContext } from './ApiContext';

export const useApi = () => {
  const { apiData, setApiData } = useContext(ApiContext);

  const createApi = async (data: any) => {
    try {
      const response = await axios.post(`${import.meta.env.BASE_URL}/api-info`, data)
      if(response.status !== 200) {
        throw new Error('Update api failed')
      } else{
        setApiData((prevState: any) => ({  
          ...prevState, 
          error:false,
          success: true
        }))
      }
    } catch (error: any) {
      setApiData((prevState: any) => ({
        ...prevState, 
        error: true,
        success: false
      }))  
    }
  }

  const getAllApis = async () => {
    try {
      const response = await axios.get(`${import.meta.env.BASE_URL}/api-info`)
      
      if(response.status !== 200) {
        throw new Error('Error getting api by id')
      } else {
        setApiData((prevState: any) => ({
          ...prevState, 
          apis: response.data,
          error: false,
          success: false
        })) 
      }
    } catch (error) {
      console.error(error);
      setApiData((prevState: any) => ({
        ...prevState, 
        error: true,
        success: false
      }))    
    }
  };

  const getApiById = async (id: string) => {
    try {
      const response = await axios.get(`${import.meta.env.BASE_URL}/api-info/${id}`)
      if(response.status !== 200) {
        throw new Error('Error getting api by id')
      }
      else {
        setApiData((prevState: any) => (
          {
            ...prevState, 
            api: response.data, 
            success: true, 
            error: false
          }));
      }
      
    } catch (error: any) {
      console.error(error);
      setApiData((prevState: any) => (
        {
          ...prevState, 
          error: {
            message: error.message
          }, 
          success: false
        }))
    }
  }

  const updateApi = async (id: string, data: any) => {
    try {
      const response = await axios.put(`${import.meta.env.BASE_URL}/api-info/${id}`, data)
      if(response.status !== 200) {
        throw new Error('Update api failed')
      } else{
        setApiData((prevState: any) => ({  
          ...prevState, 
          error:false,
          success: false
        }))
      }
    } catch (error: any) {
      setApiData((prevState: any) => (
        {
          ...prevState, 
          error: {
            message: error.message
          }, 
          success: false
        }))

    }
  }

  const deleteApi = async (id: string) => {
    try {
      const response = await axios.delete(`${import.meta.env.BASE_URL}/api-info/${id}`)
      if(response.status !== 200) {
        throw new Error('Update api failed')
      } else{
        setApiData((prevState: any) => ({  
          ...prevState, 
          error:false,
          success: false
        }))
      }
    } catch (error: any) {
      setApiData((prevState: any) => (
        {
          ...prevState, 
          error: {
            message: error.message
          }, 
          success: false
        }))
    }
  }

  return { apiData, createApi, getAllApis, getApiById, updateApi, deleteApi  };
};
