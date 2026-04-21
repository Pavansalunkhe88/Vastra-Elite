import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import CreateProduct from "../features/product/pages/createProduct.jsx";
import Dashboard from "../features/product/pages/Dashboard.jsx";
import Protected from "../features/auth/components/Protected.jsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
 {
  path:"/seller",
  children:[
    {
      path:"/seller/dashboard", 
      element:<Dashboard />
    },
    {
      path:"/seller/create-product",
      element:<Protected
      role="seller"
      ><CreateProduct /></Protected>
    }
  ]
 }
  
]);
