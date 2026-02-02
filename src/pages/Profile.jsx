import React from 'react'
import { UserProfile } from '@clerk/clerk-react'

const Profile = () => {
  return (
    <UserProfile path="/auth/profile" routing="path"/>
  )
}

export default Profile