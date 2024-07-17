import { NextRequest } from 'next/server'

declare global {
    declare interface AuthNextRequest extends NextRequest {
        user?: {id: string, email: string}
    }
}