import axios from 'axios';

const productApiInstance = axios.create({
  baseURL: '/api/products',
  withCredentials: true,
});

// use to create a new product interaction with the backend
export const createProduct = async (fromData) => {
   const response = await productApiInstance.post('/', fromData);

   return response.data;
}

// use to get all products from the backend
export const getSellerProducts = async () => {
   const response = await productApiInstance.get('/seller');

   return response.data;
}