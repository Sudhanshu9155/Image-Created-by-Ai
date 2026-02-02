import React from 'react'
import { Outlet } from 'react-router'
const AuthLayout = () => {
  return (
    <main className='h-full w-full flex flex-col items-center justify-center'>
      <Outlet />
    </main>
  )
}

export default AuthLayout