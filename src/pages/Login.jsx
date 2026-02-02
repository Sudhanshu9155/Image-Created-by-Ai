import React from 'react'
import { SignIn } from '@clerk/clerk-react'

const Login = () => {
  return (
    <SignIn path="/auth/login" routing="path"/> 
   )
}

export default Login