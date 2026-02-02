import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar.jsx'
import { ClerkProvider } from '@clerk/react-router'


//* Import Publishable Key from .env file
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <div className='flex flex-col h-screen min-h-screen w-full '>
        <Navbar />
        <div className='flex-1 overflow-auto '>
          <Outlet />
        </div>
      </div>
    </ClerkProvider>
  )
}

export default RootLayout