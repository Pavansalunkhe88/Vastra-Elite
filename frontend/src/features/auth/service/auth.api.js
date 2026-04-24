import axios from "axios"

const authApiInstance = axios.create({
    baseURL:"/api/auth",
    withCredentials:true,
})

/*
api :http://localhost:5173/api/auth/register

*/
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

export async function getMe(){
    // Make a GET request to the /me endpoint to retrieve the current user's information
    const response = await authApiInstance.get("/me")
    return response.data
}

export async function logoutUser() {
    const response = await authApiInstance.post("/logout")
    return response.data;
}