import { createSlice } from "@reduxjs/toolkit"

const initialState={
    toDo:{
        id:"",
        todo:"",
        completed:false,
        userId:0
    }
}
const todoSlice=createSlice({
    name:'task',
    initialState,
    reducers:{
        setToDo:(state,action)=>{
            state.toDo=action.payload
        }
    }
})

export const {setToDo}=todoSlice.actions

export default todoSlice.reducer