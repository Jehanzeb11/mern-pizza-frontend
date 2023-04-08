import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, uri } from "./api";
import { toast } from "react-toastify";

const initialState = {
    userList : [],
    loading:false,
    error:null
}


export const getUsers = createAsyncThunk("get/users", async ()=>{
try {
    const {data} = await axios.get(`${uri}/users`,setHeaders())
    console.log(data)
    return data
} catch (error) {
    console.log(error.response.data)
}
})






export const deleteUser = createAsyncThunk("delete/user", async (id)=>{
    try {
        const {data} = await axios.delete(`${uri}/user/${id}`,setHeaders())
if (data) {
    toast.error("User Deleted Successfully")
}

        return data
    } catch (error) {
        console.log(error.response.data)
        toast.error(error.response?.data.message)
    }
    })







const userSlice = createSlice({
    name:"user",
    initialState,
    extraReducers:{
        [getUsers.pending]: (state) => {
            state.loading = true
        },
        [getUsers.fulfilled]: (state, action) => {
            state.loading = false
            state.userList = action.payload
        },
        [getUsers.rejected]: (state) => {
            state.loading = false
            state.error = true
        },







        [deleteUser.pending]: (state) => {
            state.loading = true
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false
const newUserList = state.userList.filter((e)=>e._id !== action.payload._id)

state.userList = newUserList

},
        [deleteUser.rejected]: (state) => {
            state.loading = false
            state.error = true
        },





    }
})



export default userSlice.reducer