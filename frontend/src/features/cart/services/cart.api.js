import axios from "axios";

const API_URL = "/api/cart";

export const getCartApi = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addToCartApi = async (productId, quantity = 1) => {
    const response = await axios.post(`${API_URL}/add`, { productId, quantity });
    return response.data;
};

export const removeFromCartApi = async (productId) => {
    const response = await axios.delete(`${API_URL}/remove/${productId}`);
    return response.data;
};

export const updateQuantityApi = async (productId, quantity) => {
    const response = await axios.put(`${API_URL}/update`, { productId, quantity });
    return response.data;
};
