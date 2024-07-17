import { NextRequest, NextResponse } from 'next/server'
import { getUserSession } from '@/app/api/utils/auth'


export async function GET(req: NextRequest, res: NextResponse) {

  const session = getUserSession(req)

  if (!session) {
    return NextResponse.json({message: 'Unauthorized'}, {status: 403})
  }

  if (session.expired) {
    return NextResponse.json({message: 'Access token expired'}, {status: 401})
  }

  return NextResponse.json({message: 'Authorized', data: {user_id: session.user_id}})
}
