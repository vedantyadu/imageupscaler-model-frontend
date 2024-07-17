import axios from 'axios'

const upscale_backend_url = process.env.UPSCALE_BACKEND_URL as string


export const upscalebackend =  axios.create({
  baseURL: upscale_backend_url
})
