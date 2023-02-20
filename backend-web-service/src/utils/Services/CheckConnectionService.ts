import axios from 'axios'

const isAppRunning = async (appUrl: string) => {
  try {
    const response = await axios.get(appUrl)
    return response.status >= 200 && response.status < 500
  } catch (error) {
    return false
  }
}

export default isAppRunning
