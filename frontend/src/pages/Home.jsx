import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar"
import { useDispatch, useSelector } from 'react-redux';
import TodoList from '../components/TodoList';
import User from '../components/User';
import { getAllTaskByID } from '../service/tasaks/getAllTask';
import { initialTask } from '../slices/taskSlice';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user == null) {
      navigate("/Login")
    } else {
      getAllTaskByID(user["id"])
      .then(resopnse => dispatch(initialTask(resopnse["tasks"])))
      .catch(error => console.log(error));
    }
  }, [user])

  return (
    <div className='min-w-[300px]'>
      <Navbar />
      {user && <User />}
      {user && <TodoList />}
    </div>
  )
}

export default Home