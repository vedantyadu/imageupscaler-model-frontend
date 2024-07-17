import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../prismaclient'
import { AuthPayload } from '../../utils/auth'
import { cookies } from 'next/headers'


export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const access_token = req.cookies.get('access_token')?.value.split(' ')[1]
    const refresh_token = req.cookies.get('refresh_token')?.value.split(' ')[1]
  
    if (access_token) {
      const payload = jwt.verify(access_token, process.env.JWT_ACCESS_PRIVATE_KEY as string) as AuthPayload

      cookies().delete('access_token')
      cookies().delete('refresh_token')

      await prisma.session.delete({where: {user_id: payload.user_id, token: `Bearer ${refresh_token}`}})
      
      return NextResponse.json({message: 'Logged out'})
    }

    return NextResponse.json({message: 'Access or refresh token missing'}, {status: 401})
  }
  catch (err) {
    if (err instanceof TokenExpiredError) {
      return NextResponse.json({message: 'Access token expired'}, {status: 401})
    }
    else if (err instanceof JsonWebTokenError) {
      return NextResponse.json({message: 'Invalid access token'}, {status: 403})
    }
    return NextResponse.json({message: 'Internal server error'}, {status: 500})
  }
}
