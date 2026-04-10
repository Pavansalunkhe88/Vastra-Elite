import {setUser,setLoading,setError} from "../state/auth.slice"
import { register,login } from "../service/auth.api"
import { useDispatch } from "react-redux"


export const useAuth =()=>{

    // You can use useDispatch to dispatch actions to the Redux store
    const dispatch = useDispatch()

    async function handleRegister({email,contact,password,fullname,isSeller=false}){

        const data = await register({email,contact,password,fullname,isSeller})
        
        // After successful registration, you can dispatch the setUser action to update the user state in the Redux store
        dispatch(setUser(data.user))
    }

    return{handleRegister}

    async function handleLogin({email,password}){

        const data = await login({email,password})  
        dispatch(setUser(data.user))
    }

}

