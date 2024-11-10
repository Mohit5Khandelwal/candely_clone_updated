import { SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center pt-6'>
        <SignUp />
    </div>
   
  )
}

export default page