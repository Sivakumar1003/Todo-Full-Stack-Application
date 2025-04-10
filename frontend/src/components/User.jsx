import React from 'react'
import { useSelector } from 'react-redux'

function User() {
    const user = useSelector(state => state.user);
  return (
    <div className='bg-gray-200 flex justify-center p-5'>
        <div className='font-black text-xl md:text-3xl'>{`Welcome back ${user.name}`}</div>
    </div>
  )
}

export default User