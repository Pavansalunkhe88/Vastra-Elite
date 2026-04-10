import {configureStore} from '@reduxjs/toolkit'
import authReducer from "../features/auth/state/auth.slice"
 
// Import your reducers here
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})