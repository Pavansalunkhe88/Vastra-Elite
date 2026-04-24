import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import CreateProduct from "../features/product/pages/createProduct.jsx";
import Dashboard from "../features/product/pages/Dashboard.jsx";
import Protected from "../features/auth/components/Protected.jsx";
import Home from "../features/product/pages/Home.jsx";
import CartPage from "../features/cart/pages/CartPage.jsx";
import ProductDetail from "../features/product/pages/ProductDetail.jsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
  {
    path: "/cart",
    element: <CartPage />,
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
