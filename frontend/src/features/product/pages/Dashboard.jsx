import React,{useEffect} from 'react'
import { useProduct } from '../hook/useProduct';
import { useSelector } from 'react-redux';

function Dashboard() {

    const {handleGetSellerProducts} = useProduct();
    const sellerProducts = useSelector((state)=>state.product.sellerProducts);

    useEffect(()=>{
        handleGetSellerProducts();
    },[])

    console.log(sellerProducts)

  return (
    <div>
      <h1>Seller Dashboard</h1>
    </div>
  )
}

export default Dashboard
