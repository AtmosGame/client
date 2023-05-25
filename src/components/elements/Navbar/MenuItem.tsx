import { useAuthContext } from '@contexts'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { NAV_ROUTES } from './constant'
import { AuthButton } from '../AuthButton'

export const MenuItem = () => {
  const { pathname } = useRouter()
  const { isAuthenticated, user } = useAuthContext()

  return (
    <>
      {NAV_ROUTES.map((route, idx) => {
        if (
          (route.protected && isAuthenticated && route.role === user?.role) ||
          !route.protected
        ) {
          return (
            <Link
              href={route.path}
              key={idx}
              className={`cursor-pointer text-lg font-semibold underline-offset-2 transition-all hover:underline hover:text-emerald-300 ${
                (pathname === '' ? '/' : pathname) === route.path
                  ? `text-emerald-100 underline`
                  : 'text-white'
              }`}
            >
              {route.name}
            </Link>
          )
        }
      })}
      {!isAuthenticated && (
        <Link
          href={`/register`}
          className={`cursor-pointer text-lg font-semibold underline-offset-2 transition-all hover:underline hover:text-emerald-300 ${
            (pathname === '' ? '/' : pathname) === '/register'
              ? `text-emerald-100 underline`
              : 'text-white'
          }`}
        >
          Register
        </Link>
      )}
      <AuthButton />
    </>
  )
}
