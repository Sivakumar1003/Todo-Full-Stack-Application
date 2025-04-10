import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import tasksReducer from '../slices/taskSlice'

export const store = configureStore({
    devTools: true,
    reducer: {
        user: userReducer,
        tasks: tasksReducer,
    }
})