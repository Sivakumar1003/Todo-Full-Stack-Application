import { createSlice } from "@reduxjs/toolkit";

export const tasks = createSlice({
    name: "tasks",
    initialState: [],
    reducers: {
        initialTask(_,action) {
            return action.payload;
        },
        addTask(state, action) {
            return [...state, action.payload];
        },
        updateTask(state, action) {
            return state.map(task => {
                return task.id === action.payload.id ? {...task, tasks:action.payload.tasks} : task;
            } )
        },
        updateStatus(state, action) {
            return state.map(task => {
                return task.id == action.payload ? {...task, status: 'Completed' } : task;
            })
        },
        deleteTask(state, action) {
            return state.filter(task => task.id != action.payload);
        }
    }
})

export const { initialTask, addTask, updateTask, updateStatus, deleteTask} = tasks.actions;
export default tasks.reducer;