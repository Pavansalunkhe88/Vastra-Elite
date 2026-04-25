import { useDispatch, useSelector } from 'react-redux';
import { getCartApi, addToCartApi, removeFromCartApi, updateQuantityApi,createOrderApi } from '../services/cart.api';
import { setCart, setLoading, setError } from '../state/cart.slice';

export const useCart = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.cart);
    const user = useSelector((state) => state.auth.user);

    const handleGetCart = async () => {
        if (!user) return;
        dispatch(setLoading(true));
        try {
            const data = await getCartApi();
            dispatch(setCart(data));
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'Failed to fetch cart'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleAddToCart = async (productId, quantity = 1) => {
        if (!user) {
            // Suggest logging in or show a message
            alert("Please login to add items to cart");
            return;
        }
        dispatch(setLoading(true));
        try {
            const data = await addToCartApi(productId, quantity);
            dispatch(setCart(data));
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'Failed to add to cart'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleRemoveFromCart = async (productId) => {
        dispatch(setLoading(true));
        try {
            const data = await removeFromCartApi(productId);
            dispatch(setCart(data));
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'Failed to remove from cart'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleUpdateQuantity = async (productId, quantity) => {
        if (quantity < 1) return handleRemoveFromCart(productId);
        dispatch(setLoading(true));
        try {
            const data = await updateQuantityApi(productId, quantity);
            dispatch(setCart(data));
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'Failed to update quantity'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleCreateOrder = async () => {
        const data = await createOrderApi();
        return data.order; // Return order details for further processing (e.g., payment)
    };

    return {
        items,
        loading,
        error,
        handleGetCart,
        handleAddToCart,
        handleRemoveFromCart,
        handleUpdateQuantity,
        handleCreateOrder,
        cartCount: items.reduce((acc, item) => acc + item.quantity, 0)

    };
};
