'use client'

import { ReactNode, createContext, useEffect, useState } from 'react'
import { axiosbackend } from '../utils/axios'


type Session = {user_id: string} | undefined


interface SessionContextType {
  session: Session,
  setSession: ((val: Session) => void) | undefined
}


export const SessionContext = createContext<SessionContextType>({session: undefined, setSession: undefined})


export default function SessionProvider({children}: {children: ReactNode}) {

  const [session, setSession] = useState<Session>()

  useEffect(() => {
    const getSession = async () => {
      try {
        const res = await axiosbackend.get('/api/auth/session')
        setSession(res.data.data)
      }
      catch (err) {}
    }
    getSession()
  }, [])
  
  return (
    <SessionContext.Provider value={{session, setSession}}>
      {children}
    </SessionContext.Provider>
  )
}
