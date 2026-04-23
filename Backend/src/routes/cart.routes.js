import express from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { getCart, addToCart, removeFromCart, updateCartItemQuantity } from "../controllers/cart.controller.js";

const router = express.Router();

router.use(authenticateUser);

router.get("/", getCart);
router.post("/add", addToCart);
router.delete("/remove/:productId", removeFromCart);
router.put("/update", updateCartItemQuantity);

export default router;
