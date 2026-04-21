import React from 'react'
import { useProduct } from '../hook/useProduct';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


function Home() {

    const products = useSelector((state)=>state.product.products);

    const {handleGetAllProducts} = useProduct();

    console.log(products)

    useEffect(()=>{
        handleGetAllProducts();
    }, [])

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
