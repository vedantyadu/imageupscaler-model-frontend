'use client'

import { ReactNode, useContext, useEffect } from 'react'
import { SessionContext } from '../context/SessionContext'
import GoogleLoginButton from './GoogleLoginButton'


export default function Protected({children}: {children: ReactNode}) {

  const { session } = useContext(SessionContext)

  if (!session) {
    return (
      <div className='w-full flex-1 space-y-2 flex flex-col justify-center items-center'>
        <span>You need to be logged in to access this page</span>
        <GoogleLoginButton/>
      </div>
    )
  }

  return (
    <>
      {children}
    </>
  )
}
