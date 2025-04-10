import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
  RiCheckboxBlankCircleLine,
  RiEditLine,
  RiDeleteBin6Line,
  RiCheckboxCircleLine,
  RiSaveFill,
  RiCloseLine
} from 'react-icons/ri'
import {
  deleteTask as deleteTaskSlice,
  updateStatus as updateStatusSlice,
  updateTask as updateTaskSlice
} from '../slices/taskSlice';
import { updateTask as updateTaskServer } from '../service/tasaks/updateTask';
import { updateStatus as updateStatusServer } from '../service/tasaks/updateStatus';
import { deleteTask as deleteTaskServer } from '../service/tasaks/deleteTask';

function TaskCart({ task }) {

  // {id: 18, userId: 1, tasks: 'task 07', status: 'Pending'}
  // {id: 1, userId: 1, tasks: 'project of todos', status: 'Completed'}

  const [showInput, setShowInput] = useState(true);
  const [taskName, setTaskName] = useState(task.tasks);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const errorRef = useRef();
  const dispatch = useDispatch();

  function handelstatus() {
    updateStatusServer(task.id)
      .then(response => dispatch(updateStatusSlice(response.id)))
      .catch(error => errorRef.current.innerHTML = error.message);
  }

  function handelUpadteTask() {
    setShowInput(false);
  }

  function handelSave() {
    updateTaskServer(task.id, taskName)
      .then(response => {
        dispatch(updateTaskSlice(response));
        setTaskName(task.tasks);
      })
      .catch(error => errorRef.current.innerHTML = error.message);
    setShowInput(true);

  }

  function handeldelete() {
    deleteTaskServer(task.id)
    .then(response => {
      console.log(response);
      dispatch(deleteTaskSlice(response.id))
    })
    .catch(error => error => errorRef.current.innerHTML = error.message)
  }

  return (
    <div className=' bg-white rounded-xl m-3 p-4'>

      <div className='flex justify-between'>
        <div className='flex gap-3 items-center'>
          {task.status === "Pending" ?
            <RiCheckboxBlankCircleLine style={{ color: "red", cursor: "pointer" }} onClick={handelstatus} />
            : <RiCheckboxCircleLine style={{ color: "red", cursor: "pointer" }} />
          }
          {
            showInput ? <div>{task.tasks}</div>
              : <input className='bg-gray-100 border-1 focus:outline-none p-1 px-3' value={taskName} onChange={e => { setTaskName(e.target.value) }}></input>
          }
        </div>

        {
          task.status === "Pending" &&
          <div className='flex gap-5 px-8 items-center'>
            {showInput ? <RiEditLine style={{ cursor: "pointer" }} onClick={handelUpadteTask} />
              : <RiSaveFill style={{ cursor: "pointer" }} onClick={handelSave} />
            }
            {
              confirmDelete ? <RiCloseLine style={{ cursor: "pointer" }} onClick={() => { setConfirmDelete(false) }} />
                : <RiDeleteBin6Line style={{ cursor: "pointer" }} onClick={() => { setConfirmDelete(true) }} />
            }
          </div>
        }
      </div>

      {
        confirmDelete && 
        <div>
          <div className='text-sm p-4'>Are you sure. do you want to delete?</div>
          <div className='flex gap-3 justify-end px-10'>
            <button className='bg-blue-400 px-2 rounded-lg text-white font-bold cursor-pointer' onClick={() => {setConfirmDelete(false)}} >Cancel</button>
            <button className='bg-red-600 px-2 rounded-lg text-white font-bold' onClick={handeldelete}>Delete</button>
          </div>
        </div>
      }

      <span ref={errorRef} className='text-sm font-medium text-red-500' ></span>
    </div>
  )
}

export default TaskCart