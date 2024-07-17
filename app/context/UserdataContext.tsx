'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { axiosbackend } from '../utils/axios'
import { SessionContext } from './SessionContext'


type UserData = { [key: string]: any } | undefined


interface UserdataContextType {
  userdata: UserData,
  setUserdata: ((val: object) => void) | undefined
}

export const UserdataContext = createContext<UserdataContextType>({userdata: undefined, setUserdata: undefined})


export default function UserdataProvider({children}: {children: ReactNode}) {

  const [userdata, setUserdata] = useState<UserData>()
  const { session } = useContext(SessionContext)

  useEffect(() => {
    const getUserdata = async () => {
      try {
        const res = await axiosbackend.get('/api/user/data')
        setUserdata(res.data.data)
        console.log(res.data.data)
      }
      catch (err) {}
    }
    if (session) {
      getUserdata()
    }
  }, [session])
  
  return (
    <UserdataContext.Provider value={{userdata, setUserdata}}>
      {children}
    </UserdataContext.Provider>
  )
}
