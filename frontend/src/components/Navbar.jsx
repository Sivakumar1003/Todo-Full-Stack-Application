import React from 'react'
import { useDispatch } from 'react-redux'
import { logOutUser } from '../slices/userSlice';


function Navbar() {

  const dispatch = useDispatch();

  function handelLogOut() {
    dispatch(logOutUser());
  }

  return (
    <div className='h-15 bg-green-500 flex justify-between px-5 md:px-10 items-center'>
      <div className='font-black text-white text-xs md:text-2xl cursor-pointer'>TO DO LIST</div>
      <div className='font-black text-white text-xs md:text-xl cursor-pointer' onClick={handelLogOut}>Logout</div>
    </div>
  )
}

export default Navbar