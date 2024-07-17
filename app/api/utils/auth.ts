import axios from 'axios'
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken'
import { NextRequest } from 'next/server'


export interface AuthPayload extends JwtPayload {
  user_id: string
}


export interface UserSession {
  user_id: string,
  expired: boolean
}


export const accessPrivateKey = process.env.JWT_ACCESS_PRIVATE_KEY as string
export const refreshPrivateKey = process.env.JWT_REFRESH_PRIVATE_KEY as string


export function generateJWT(user_id: string) {
  const payload = {user_id}
  const access_token = `Bearer ${jwt.sign(payload, process.env.JWT_ACCESS_PRIVATE_KEY as string, {expiresIn: '15s'})}`
  const refresh_token = `Bearer ${jwt.sign(payload, process.env.JWT_REFRESH_PRIVATE_KEY as string, {expiresIn: '10d'})}`
  return { access_token, refresh_token }
}


export class GoogleOAuthError extends Error {
  constructor(message: string, name: string) {
    super()
    this.message = message
    this.name = name
  }
}


export async function getGoogleTokens(code: string) {
  try {
    const res = await axios.post('https://oauth2.googleapis.com/token', {
      code: code,
      client_id : '1093787396713-g4mt6s0ful8afc380audvnsfs23pa5tq.apps.googleusercontent.com',
      client_secret : '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',
      redirect_uri : `${process.env.NEXT_SERVER_URL}/redirect`,
      grant_type : "authorization_code"
    })
    return res.data
  }
  catch (err) {
    throw new GoogleOAuthError('Could not get Google tokens', 'GOOGLE_OAUTH_TOKEN_ERROR')
  }
}


export async function getGoogleUser(id_token: string, access_token: string) {
  try {
    const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
      headers: {
        Authorization: `Bearer ${id_token}`
      }
    })
    return res.data
  }
  catch (err) {
    throw new GoogleOAuthError('Could not get Google user', 'GOOGLE_OAUTH_USER_ERROR')
  }
}


export function getUserSession(req: NextRequest): UserSession | null {
  try {

    const access_token = req.cookies.get('access_token')?.value.split(' ')[1]

    if (!access_token) {
      return null
    }

    const { user_id } = jwt.verify(access_token, accessPrivateKey) as AuthPayload

    return {user_id, expired: false}
  }
  catch (err) {
    if (err instanceof TokenExpiredError) {
      const access_token = req.cookies.get('access_token')?.value.split(' ')[1]
      const { user_id } = jwt.decode(access_token as string) as AuthPayload
      return {user_id, expired: true}
    }
    return null
  }
}
