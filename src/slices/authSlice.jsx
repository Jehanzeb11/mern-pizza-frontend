import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {uri} from "./api"
import { toast } from "react-toastify";

const initialState = {
    token:localStorage.getItem("token"),
    name:"",
    email:"",
    _id:"",
    isAdmin:"",
    registerStatus : "",
    registerError:"",
    loginStatus : "",
    loginError:"",
    loadedUser:false
}



export const registerUser = createAsyncThunk("register/user",async (user,{rejectWithValue})=>{
try {
    const {data} = await axios.post(`${uri}/register`,user)

    console.log(data)

   JSON.stringify(localStorage.setItem("token",data))

    return data
} catch (error) {
    toast.error(error.response?.data.message)
    return rejectWithValue(error.response?.data);
}
})






export const loginUser = createAsyncThunk("login/user",async (user,{rejectWithValue})=>{
    try {
        const {data} = await axios.post(`${uri}/login`,user)
    
        console.log(data)
    
        JSON.stringify(localStorage.setItem("token",data))

    
        return data
    } catch (error) {
        toast.error(error.response?.data.message)
        return rejectWithValue(error.response.data);
    }
    })




const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
loadUser:(state)=>{
const token = state.token

if (token) {
    const user = jwtDecode(token)

    return{
        ...state,
        token,
    name:user.name,
    email:user.email,
    _id:user._id,
    isAdmin: user.isAdmin,
    loadedUser:true
    }
}
},


logout:(state)=>{
localStorage.removeItem("token")
return{...state ,
token:null,
name:"",
email:"",
_id:"",
isAdmin:"",
registerStatus : "",
registerError:"",
loginStatus : "",
loginError:"",
loadedUser:false}
}
    },


    extraReducers:(builder)=>{
builder.addCase(registerUser.pending,(state)=>{
return {...state,registerStatus:"pending"}
})

builder.addCase(registerUser.fulfilled,(state,action)=>{
    if (action.payload) {
        
    
    const user = jwtDecode(action.payload)
    return {...state, 
        token:action.payload,
    name:user.name,
    email:user.email,
    _id:user._id,
    isAdmin: user.isAdmin,
    registerStatus:"success"
}
    }else return state
 

})

builder.addCase(registerUser.rejected,(state,action)=>{
    state.registerStatus = "rejected"
state.registerError = action.payload

})




/////////////////////////////////////// login  //////////////////////////////////////////





builder.addCase(loginUser.pending,(state)=>{
    return {...state,loginStatus:"pending"}
    })
    
    builder.addCase(loginUser.fulfilled,(state,action)=>{
        if (action.payload) {
            
        
        const user = jwtDecode(action.payload)
        return {...state, 
            token:action.payload,
        name:user.name,
        email:user.email,
        _id:user._id,
        isAdmin: user.isAdmin,
        loginStatus:"success"
    }
        }else return state
     
    
    })
    
    builder.addCase(loginUser.rejected,(state,action)=>{
        state.registerStatus = "rejected"
    state.loginError = action.payload
    
    })

}
})
 
export const {loadUser,logout} = authSlice.actions


export default authSlice.reducer