import { NextRequest, NextResponse } from 'next/server'
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import prisma from '@/app/api/prismaclient'
import { AuthPayload, generateJWT, refreshPrivateKey } from '@/app/api/utils/auth'
import { cookies } from 'next/headers'


export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const refresh_token = req.cookies.get('refresh_token')?.value.split(' ')[1]

    if (refresh_token) {

      const payload = jwt.verify(refresh_token, refreshPrivateKey) as AuthPayload

      const new_tokens = generateJWT(payload.user_id)

      await prisma.session.update({where: {user_id: payload.user_id, token: `Bearer ${refresh_token}`}, data: {token: new_tokens.refresh_token}})

      cookies().set('access_token', new_tokens.access_token, {secure: true, httpOnly: true, maxAge: 3600 * 24 * 30})
      cookies().set('refresh_token', new_tokens.refresh_token, {secure: true, httpOnly: true, maxAge: 3600 * 24 * 30})

      return NextResponse.json({message: 'Token refresh successfully'})
    }
    return NextResponse.json({message: 'Access or refresh token missing'}, {status: 403})
  }
  catch (err) {
    if (err instanceof TokenExpiredError) {
      return NextResponse.json({message: 'Refresh token expired'}, {status: 401})
    }
    else if (err instanceof JsonWebTokenError) {
      return NextResponse.json({message: 'Invalid refresh token'}, {status: 403})
    }
    return NextResponse.json({message: 'Internal server error'}, {status: 500})
  }
}
