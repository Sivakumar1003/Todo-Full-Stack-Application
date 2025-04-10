import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa";
import { addUser } from '../service/users/addUser';

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const userRef = useRef();
  const navigate = useNavigate();

  if (password && confirmPassword) {
    if (password != confirmPassword) {
      confirmPasswordRef.current.innerHTML = "Confirm password should match password."
    } else {
      confirmPasswordRef.current.innerHTML = ""
    }
  }

  function allFields() {
    if (!name) {
      nameRef.current.innerHTML = "Name required."
    }
    if (!email) {
      emailRef.current.innerHTML = "Email required."
    }
    if (!password) {
      passwordRef.current.innerHTML = "Password required."
    }
    if (!confirmPassword) {
      confirmPasswordRef.current.innerHTML = "Confirm password required."
    }
  }

  function handelEmail() {
    const emailPattern = '/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/'

    if (!email) {
      return false;
    }

    if (!email.includes('@')) {
      emailRef.current.innerHTML = "Email should contain '@'";
      return false;
    }

    if (!email.includes('.')) {
      emailRef.current.innerHTML = "Email should contain a domain like .com, .org, .co, etc.";
      return false;
    }

    const [localPart, domainPart] = email.split('@');
    if (!localPart || !domainPart) {
      emailRef.current.innerHTML = "Email must have both local and domain parts";
      return false;
    }

    if (!/\.[a-z]{2,4}$/.test(domainPart)) {
      emailRef.current.innerHTML = "Domain should end with a valid extension like .com, .org, .co, etc.";
      return false;
    }

    return true;
  }

  function handelSubmit() {

    allFields();
    const validEmail = handelEmail();
    if (validEmail) {
      addUser({ name, email, password })
        .then(response => {
          if (response.status == 400) {
            userRef.current.innerHTML = response.response.data.message;
          }

          if (response.success) {
            navigate("/Login");
          }
        })
        .catch(error => userRef.current.innerHTML = error.message);

    }

  }


  return (
    <div className='min-h-screen bg-gray-200 flex justify-center items-center'>
      <div className='bg-white p-10 flex flex-col gap-5  w-[80%]  max-w-[600px] rounded-2xl min-w-2/5'>

        <div className='font-black text-3xl text-center'>Sign Up</div>
        <span className='text-base font-medium text-red-500' ref={userRef}></span>

        <form action="" className='flex flex-col gap-5'>
          <div>
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              className='bg-gray-100 focus:outline-none px-2 w-full h-10 my-1 rounded-md font-normal'
              placeholder='Eneter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              onClick={() => { nameRef.current.innerHTML = "" }}
            />
            <span className='text-sm text-red-600 font-medium' ref={nameRef}></span>
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              className='bg-gray-100 focus:outline-none px-2 h-10 my-1 w-full rounded-md font-normal'
              placeholder='Eneter your email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              onClick={() => { emailRef.current.innerHTML = "" }}
            />
            <span className='text-sm text-red-600 font-medium' ref={emailRef}></span>
          </div>

          <div>
            <label htmlFor="name">Password</label>
            <br />
            <div className='flex items-center bg-gray-100 focus:outline-none px-4 my-1 h-10 w-full justify-between rounded-md font-normal'>
              <input
                type={`${showPassword ? "text" : "password"}`}
                placeholder='Eneter your password'
                value={password}
                className='focus:outline-none '
                onChange={e => setPassword(e.target.value)}
                onClick={() => { passwordRef.current.innerHTML = "" }}
              />
              <FaEyeSlash onClick={() => setShowPassword(pre => !pre)} className='cursor-pointer' />
            </div>
            <span className='text-sm text-red-600 font-medium' ref={passwordRef}></span>
          </div>

          <div>
            <label htmlFor="name">Confirm password</label>
            <br />
            <div className='flex justify-between items-center bg-gray-100 focus:outline-none my-1 px-4 h-10 w-full rounded-md font-normal'>
              <input
                type={`${showConfirmPassword ? "text" : "password"}`}
                placeholder='Eneter Confirm password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className='focus:outline-none'
                onClick={() => { confirmPasswordRef.current.innerHTML = "" }}
              />
              <FaEyeSlash onClick={() => setShowConfirmPassword(pre => !pre)} className='cursor-pointer' />
            </div>
            <span className='text-sm text-red-600 font-medium' ref={confirmPasswordRef}></span>
          </div>

        </form>

        <button className='bg-blue-600 text-white font-bold p-1 px-2 rounded-lg cursor-pointer' onClick={handelSubmit}>Submit</button>

        <div className='text-sm'>If you have an account. <Link to={"/Login"} className='text-blue-500 font-medium'>Loging</Link></div>
      </div>
    </div>
  )
}

export default Signup