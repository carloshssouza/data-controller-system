import React, { useState, useEffect, useCallback } from 'react'
import {
  getAllApis,
  getApiById,
  updateApi,
  deleteApi,
  createApi,
} from '../../api/services/Api'

export default function Api() {
  const [apisData, setApisData] = useState([])
  const [apiData, setApiData] = useState({})
  const [success, setSuccess] = useState(false)

  const handleAllApis = useCallback(async () => {
    const response = await getAllApis()
    setApisData(response.data)
  }, [])

  const handleApiById = useCallback(async (id: string) => {
    const response = await getApiById(id)
    setApiData(response.data)
  }, [])

  const handleCreateApi = useCallback(async (data: any) => {
    const response = await createApi(data)
    setSuccess(response.data)
  }, [])

  const handleUpdateApi = useCallback(async (id: string, data: any) => {
    const response = await updateApi(id, data)
    setSuccess(response.data)
  }, [])

  const handleDeleteApi = useCallback(async (id: string) => {
    const response = await deleteApi(id)
    setSuccess(response.data)
  }, [])

  useEffect(() => {
   if(!apisData.length) {
    handleAllApis()
   }
  }, [])
  



  return (
    <div>
      <div>Informações das APIs</div>
      <div>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <button>Salvar</button>
      </div>
    </div>
  )
}
