import {createSlice} from "@reduxjs/toolkit"
const userSlice=createSlice({
    'name':"User"
})
export const {addUser,removeUser}=userSlice.actions
export default userSlice.reducer;