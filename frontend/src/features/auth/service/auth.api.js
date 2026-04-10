import axios from "axios"

const authApiInstance = axios.create({
    baseURL:"https://localhost:3000/api/auth",
    withCredentials:true,
})

export async function register({email,contact,password,fullname,isSeller}){
    // Make a POST request to the /register endpoint with the provided data
    const response = await authApiInstance.post("/register",{
        email,
        contact,
        password,
        fullname,
        isSeller,
    })
 
    return  response.data
}

export async function login({email,password}){
    // Make a POST request to the /login endpoint with the provided data
    const response = await authApiInstance.post("/login",{
        email,
        password,
    })
    return response.data
}   