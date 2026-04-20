import React from 'react'
import { useProduct } from '../hook/useProduct';

function CreateProduct() {
    const {handleCreateProduct} = useProduct();
    
  return (
    <div>
        <h1>Create Product</h1>
    </div>
  )
}

export default CreateProduct
