import { setUser, setLoading, setError } from "../state/auth.slice"
import { register, login } from "../service/auth.api"
import { useDispatch } from "react-redux"

export const useAuth = () => {
    const dispatch = useDispatch()

    async function handleRegister({ email, contact, password, fullname, isSeller = false }) {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))

            const data = await register({ email, contact, password, fullname, isSeller })

            // After successful registration, update user state in Redux store
            dispatch(setUser(data.user))
            return data
        } catch (error) {
            const errorMessage = error.response?.data?.message
                || error.response?.data?.errors?.[0]?.msg
                || "Registration failed. Please try again."
            dispatch(setError(errorMessage))
            throw error
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))

            const data = await login({ email, password })

            dispatch(setUser(data.user))
            return data
        } catch (error) {
            const errorMessage = error.response?.data?.message
                || error.response?.data?.errors?.[0]?.msg
                || "Login failed. Please try again."
            dispatch(setError(errorMessage))
            throw error
        } finally {
            dispatch(setLoading(false))
        }
    }

    return { handleRegister, handleLogin }
}
