import axios from 'axios'

const isAppRunning = async (appUrl: string) => {
  try {
    const response = await axios.get(`${appUrl}/health`)
    if (response.status === 200 && response.data === 'OK') {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    if (error.code === 'ECONNREFUSED') {
      return false
    } else if (error.response.status >= 400 && error.response.status <= 500) {
      return true
    }
  }
}

export default isAppRunning
