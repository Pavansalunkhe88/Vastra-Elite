import React from 'react'
import { RouterProvider } from 'react-router'
import { routes } from './app.routes'
import { useAuth } from '../features/auth/hook/useAuth'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function App() {
  const {handleGetMe} = useAuth();

  const user =useSelector((state)=>state.auth.user);

  console.log(user)
  
  React.useEffect(()=>{
    handleGetMe();
  },[])

  return (
    <div>
      <RouterProvider router={routes}/>
    </div>
  )
}

export default App
