import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUserByEmail } from '../service/users/getUserByEmail';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/userSlice';

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [foundUser, setFoundUser] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (foundUser && !foundUser["Success"]) {
      emailRef.current.innerText = foundUser["message"];
    } else if (foundUser && foundUser["Success"]) {
      if (foundUser["user"]["password"] == password) {
        dispatch(loginUser(foundUser["user"]));
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        passwordRef.current.innerText = "Wrong password"
      }
    }
  }, [foundUser]);

  function handelLogin() {
    if (email == "" && password == "") {
      emailRef.current.innerText = "Enter email";
      passwordRef.current.innerText = "Enter password"
    } else if (email == "") {
      emailRef.current.innerText = "Enter email";
    } else if (password == "") {
      passwordRef.current.innerText = "Enter password"
    } else {
      getUserByEmail(email)
        .then(response => {
          setFoundUser(response)
        })
        .catch(err => setFoundUser(err));
    }
  }

  return (
    <div className='min-h-screen bg-gray-200 flex justify-center items-center'>
      <div className='bg-white w-fit p-10 rounded-2xl '>

        <div className='text-center font-black text-3xl pb-3'>Login</div>

        <form action={handelLogin} className='flex flex-col gap-5'>
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="text"
              value={email}
              className='bg-gray-100 focus:outline-none px-2 h-8 rounded-md font-normal'
              placeholder='Enter your email'
              onChange={e => setEmail(e.target.value)}
              onClick={() => emailRef.current.innerText = ""}
            />
            <div ref={emailRef} className='text-xs text-red-700'></div>
          </div>

          <div>
            <label htmlFor='password' >Password</label>
            <br />
            <input
              type="password"
              value={password}
              className='bg-gray-100 focus:outline-none px-2 h-8 rounded-md font-normal'
              placeholder='Enter your Password'
              onChange={e => setPassword(e.target.value)}
              onClick={() => passwordRef.current.innerText = ""}
            />
            <div ref={passwordRef} className='text-xs text-red-700'></div>
          </div>

          <div >
            <button type="submit" className='bg-blue-700 px-2 text-white font-bold rounded-md' >Login</button>
          </div>
        </form>

        <section className='mt-6'>
          <div className='text-sm'>If you don't have accout. <Link to={"/Signup"} className='text-blue-500'>Signup</Link></div>
        </section>
      </div>

    </div>
  )
}

export default Login