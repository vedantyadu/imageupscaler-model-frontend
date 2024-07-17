'use client'

import { useContext } from 'react'
import { SessionContext } from '@/app/context/SessionContext'
import { UserdataContext } from '@/app/context/UserdataContext'
import Link from 'next/link'
import GoogleLoginButton from '../../app/utils/GoogleLoginButton'


export default function NavUser() {

  const { session } = useContext(SessionContext)
  const { userdata } = useContext(UserdataContext)

  if (!session) {
    return (<GoogleLoginButton/>)
  }

  return (
    <div className='text-xs flex justify-center items-center space-x-4'>
      <Link href='/user'>
        <img className='h-10 rounded-full' src={userdata?.image}/>
      </Link>
    </div>
  )
}
