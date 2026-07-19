import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import CreateProduct from "../features/product/pages/createProduct.jsx";
import Dashboard from "../features/product/pages/Dashboard.jsx";
import Protected from "../features/auth/components/Protected.jsx";
import Home from "../features/product/pages/Home.jsx";
import CartPage from "../features/cart/pages/CartPage.jsx";
import ProductDetail from "../features/product/pages/ProductDetail.jsx";
import CategoryPage from "../features/product/pages/CategoryPage.jsx";
import CheckoutPage from "../features/cart/pages/CheckoutPage.jsx";
import OrderSuccess from "../features/cart/pages/OrderSuccess.jsx";
import NewArrivals from "../features/product/pages/NewArrivals.jsx";
import Collections from "../features/product/pages/Collections.jsx";
import Sale from "../features/product/pages/Sale.jsx";
import About from "../features/product/pages/About.jsx";

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
    path: "/category/:categoryName",
    element: <CategoryPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/success",
    element: <OrderSuccess />,
  },
  {
    path: "/new-arrivals",
    element: <NewArrivals />,
  },
  {
    path: "/collections",
    element: <Collections />,
  },
  {
    path: "/sale",
    element: <Sale />,
  },
  {
    path: "/about",
    element: <About />,
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
