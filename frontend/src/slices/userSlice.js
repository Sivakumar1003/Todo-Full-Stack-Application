import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        loginUser(_, action) {
            return action.payload
        },
        logOutUser(_,action) {
            return null;
        }
    }
})

export const { loginUser, logOutUser } = user.actions;
export default user.reducer