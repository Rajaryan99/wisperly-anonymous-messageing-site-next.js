// middleware.ts (in root of your project)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from 'next-auth/jwt'

export async function  middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Auth check — redirect to login if no token
  const token = await getToken({req: request})
  const url  = request.nextUrl


  if(token  && 
    (
        url.pathname.startsWith('/signin')  ||
        url.pathname.startsWith('/signup')  ||
        url.pathname.startsWith('/verify')  ||
        url.pathname.startsWith('/')
    )
  ){
        return NextResponse.redirect(new URL('/dashboard', request.url))

  }

  
}

// Which routes this middleware runs on
export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/',
    '/dashboard/:path*',
    '/verify/:path*'
  ]
}