import axios from 'axios'


const backend_url = 'http://localhost:3000'


export const axiosbackend = axios.create({
  baseURL: backend_url
})

axiosbackend.interceptors.response.use((response) => response, async (error) => {

  const {response, config} = error

  if (response.status != 401) {
    throw error
  }
  try {
    const res = await axios.get(backend_url + '/api/auth/refresh')
    return axiosbackend(config)
  }
  catch (err) {
    throw err
  }
})
