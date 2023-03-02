import React from 'react'
import api from '../../api/axios'

export default async function isDbConnected() {
  try {
    const response = await api.get(`${import.meta.env.VITE_BASE_URL}/configuration/db-connection`)
    if (response.status === 200) {
      return true
    } else {
      return false
    }
  } catch (error: any) {
    console.log(error)
  } 
}