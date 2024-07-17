import axios from 'axios'


const backend_url = process.env.NEXT_SERVER_URL as string


export const axiosbackend = axios.create()

axiosbackend.interceptors.response.use((response) => response, async (error) => {

  const {response, config} = error

  if (response.status != 401) {
    throw error
  }
  try {
    const res = await axios.get('/api/auth/refresh')
    return axiosbackend(config)
  }
  catch (err) {
    throw err
  }
})
