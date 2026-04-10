import { createSlice } from "@reduxjs/toolkit" 

// Create the auth slice
const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        error:null,
    },
    reducers:{
        setUser:(state , action)=>{
            state.user=action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        },
        setError:(state,action)=>{
            state.error=action.payload
        }
    }
}) 

// Export actions and reducer
export const {setUser,setLoading,setError}= authSlice.actions;
export default authSlice.reducer;