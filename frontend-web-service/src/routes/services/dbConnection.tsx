import React from 'react'
import { Response, requestAPI } from '../../api/axios'

export default async function isDbConnected() {
    const options = {
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/configuration/db-connection`
    }
    const { response, error }= await requestAPI(options) as Response
    

    if (error || response.status !== 200) {
      return false
    } else {
      return true
    }
}