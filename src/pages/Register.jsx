import React from 'react'
import { SignUp } from '@clerk/clerk-react'

const Register = () => {
  return (
    <SignUp path="/auth/register" routing="path"/>
  )
}

export default Register