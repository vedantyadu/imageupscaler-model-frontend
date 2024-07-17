import { NextRequest, NextResponse } from 'next/server'
import { getUserSession } from '../../utils/auth'
import prisma from '../../prismaclient'


export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session = getUserSession(req)

    if (!session) {
      return NextResponse.json({message: 'Unauthorized'}, {status: 403})
    }
    
    if (session.expired) {
      return NextResponse.json({message: 'Access token expired'}, {status: 401})
    }

    const data = await prisma.user.findFirst({where: {id: session?.user_id}})

    if (data) {
      return NextResponse.json({message: 'User found', data: {user_id: data?.id, email: data.email, image: data.image}})
    }

    return NextResponse.json({message: 'User not found'}, {status: 403})
  }
  catch (err) {
    return NextResponse.json({message: 'Internal server error'}, {status: 500})
  }
}
