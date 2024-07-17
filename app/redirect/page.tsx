'use client'

import { useEffect } from 'react'
import { axiosbackend } from '../utils/axios'
import Loader from '../utils/Loader'


export default function Redirect() {

  useEffect(() => {
    const getTokens = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const res = await axiosbackend.get(`api/auth/login?code=${urlParams.get('code')}`)
      }
      catch (err) {
        
      }
      window.opener.location.reload()
      window.close()
    }
    getTokens()
  }, [])
  
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
        <Loader/>
        <span className='text-sm font-bold text-neutral-800 mb-12'>Logging in</span>
        <span className='font-bold text-lg'>Image Upscaler</span>
    </main>
  )
}
