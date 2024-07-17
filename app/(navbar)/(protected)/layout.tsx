import Protected from '@/app/utils/Protected'
import { ReactNode } from 'react'

export default function Layout({children}: {children: ReactNode}) {
  return (
    <Protected>
      {children}
    </Protected>
  )
}
