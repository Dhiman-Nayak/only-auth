import { createSlice } from "@reduxjs/toolkit";
const initialState={
    currentUser:null,
    error:false,
    loading:false
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state,action)=>{
            state.loading=true
        },
        signInSuccess:(state,action)=>{
            state.error=false,
            state.loading=false,
            state.currentUser=action.payload
        },
        signInFaliure:(state,action)=>{
            state.error=true,
            state.loading=true,
            state.currentUser=action.payload
        }
    }

})

export const {signInFaliure,signInStart,signInSuccess}=userSlice.actions

export default userSlice.reducer