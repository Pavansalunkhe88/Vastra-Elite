import React from 'react'
import { RouterProvider } from 'react-router'
import { routes } from './app.routes'

function App() {
  return (
    <div>
      <RouterProvider router={routes}/>
    </div>
  )
}

export default App
