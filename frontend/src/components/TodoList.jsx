import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TaskCart from './TaskCart';
import { addTask as addTaskService } from '../service/tasaks/addTask';
import { addTask as addTaskSLice } from '../slices/taskSlice';

function TodoList() {
  const tasks = useSelector(state => state.tasks);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [pendingTask, setPendingTask] = useState();
  const [completedTask, setCompletedTask] = useState();
  const [newTask, setNewTask] = useState("");
  const newTaskRef = useRef();

  useEffect(() => {
    setPendingTask(tasks.filter(task => task["status"] == "Pending"));
    setCompletedTask(tasks.filter(task => task["status"] == "Completed"));
  }, [tasks])

  function handelAddTask() {
    if (newTask) {
      addTaskService(user.id, newTask)
        .then(response => {
          dispatch(addTaskSLice(response));
          setNewTask("")
        })
        .catch(error => newTaskRef.current.innerHTML = error.message);
    } else {
      newTaskRef.current.innerHTML = "Enter Task."
    }
  }


  return (
    <div className='bg-gray-200 min-h-screen min-w-[300px] md:min-w-[700px] flex flex-col items-center p-5'>

      <div className='w-[80%] mb-5 flex justify-between px-5'>
        <input
          type="text"
          className='bg-white w-[70%] h-9 rounded-lg px-4 shadow-2xl focus:outline-none'
          placeholder='Enter task to add'
          onChange={e => setNewTask(e.target.value)}
          value={newTask}
          onClick={() => { newTaskRef.current.innerHTML = "" }}
        />
        <button className='bg-blue-800 text-white px-2 rounded-md cursor-pointer font-black text-lg' onClick={handelAddTask}>Add</button>
      </div>

      <div className='w-[80%] mb-5 text-red-600 font-bold text-xl px-2' ref={newTaskRef}></div>

      <div className='bg-gray-100 p-3 px-5 w-[80%] md:max-w-[1200px] rounded-2xl mb-5 shadow-2xl'>
        <h1 className='text-xl lg:text-3xl font-black pb-3 lg:pb-7'>Pending tasks</h1>
        {
          pendingTask?.length > 0 ?
            pendingTask.map(task => <TaskCart key={task["id"]} task={task} />)
            : <div className='text-gray-600'>No tasks </div>
        }
      </div>

      <div className='bg-gray-100 p-3 px-5 w-[80%] md:max-w-[1200px] rounded-2xl mb-5 shadow-2xl'>
        <h1 className='text-xl lg:text-3xl font-black pb-3 lg:pb-7'>Completed tasks</h1>
        {
          completedTask?.length > 0 ?
            completedTask.map(task => <TaskCart key={task["id"]} task={task} />)
            : <div className='text-gray-600'>No tasks </div>
        }
      </div>

    </div>
  )
}

export default TodoList