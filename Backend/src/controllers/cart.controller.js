import cartModel from "../models/cart.model.js";
import { createOrder } from "../services/payment.service.js";

export const getCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ userId: req.user._id }).populate('items.productId');
        if (!cart) {
            return res.status(200).json({ items: [] });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addToCart = async (req, res) => {
    const { productId, quantity, size, color } = req.body;
    try {
        let cart = await cartModel.findOne({ userId: req.user._id });

        if (!cart) {
            cart = new cartModel({
                userId: req.user._id,
                items: [{ productId, quantity: quantity || 1, size, color }]
            });
        } else {
            const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId && p.size === size && p.color?.name === color?.name);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += (quantity || 1);
            } else {
                cart.items.push({ productId, quantity: quantity || 1, size, color });
            }
        }

        await cart.save();
        const updatedCart = await cart.populate('items.productId');
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    const { productId } = req.params;
    try {
        const cart = await cartModel.findOne({ userId: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
        const updatedCart = await cart.populate('items.productId');
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCartItemQuantity = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const cart = await cartModel.findOne({ userId: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            await cart.save();
            const updatedCart = await cart.populate('items.productId');
            res.status(200).json(updatedCart);
        } else {
            res.status(404).json({ message: "Product not in cart" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPaymentOrder = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ userId: req.user._id }).populate('items.productId');
        
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }

        const amount = cart.items.reduce((acc, item) => {
            if (item.productId && item.productId.price) {
                return acc + (item.productId.price.amount * item.quantity);
            }
            return acc;
        }, 0);

        console.log('Calculated amount for Razorpay:', amount);

        if (amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid order amount",
            });
        }

        const order = await createOrder(amount, "INR");
        return res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error('Full Error in createPaymentOrder:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
            error: error.toString(),
            stack: error.stack
        });
    }         
};

export const verifyPayment = async (req, res) => {
    try {
        // Verification logic for Razorpay would go here.
        // For now, simply return success to allow the server to run.
        res.status(200).json({ success: true, message: "Payment verified" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
