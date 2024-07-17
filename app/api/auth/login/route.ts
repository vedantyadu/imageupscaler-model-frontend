import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/api/prismaclient'
import { GoogleOAuthError, generateJWT, getGoogleTokens, getGoogleUser } from '@/app/api/utils/auth'
import { cookies } from 'next/headers'


export async function GET(req: NextRequest, res: NextResponse) {

  const old_refresh_token = req.cookies.get('refresh_token')?.value.split(' ')[1]

  try {
    const google_token_data = await getGoogleTokens(req.nextUrl.searchParams.get('code') || '')
    const google_user_data = await getGoogleUser(google_token_data.id_token, google_token_data.access_token)

    const user = await prisma.user.upsert({
      where: {
        email: google_user_data.email
      },
      update: {

      },
      create: {
        email: google_user_data.email,
        image: google_user_data.picture
      }
    })

    const {access_token, refresh_token} = generateJWT(user.id)

    cookies().set('access_token', access_token, {secure: true, httpOnly: true, maxAge: 3600 * 24 * 30})
    cookies().set('refresh_token', refresh_token, {secure: true, httpOnly: true, maxAge: 3600 * 24 * 30})

    await prisma.session.upsert({
      where: {
        user_id: user.id,
        token: `Bearer ${old_refresh_token}`
      },
      update: {
        token: refresh_token
      },
      create: {
        user_id: user.id,
        token: refresh_token
      }
    })

    return NextResponse.json({message: 'Login successful'})
  }
  catch (err) {
    if (err instanceof GoogleOAuthError) {
      return NextResponse.json({message: 'Google login failed'}, {status: 500})
    }
    return NextResponse.json({message: 'Internal server error'}, {status: 500})
  }
}
