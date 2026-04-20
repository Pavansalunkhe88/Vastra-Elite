import {Router} from 'express';
import { authenticateSeller } from '../middlewares/auth.middleware.js';
import { createProduct, getSellerProducts } from '../controllers/product.controller.js';
import multer from 'multer';
import { createProductValidator } from '../validator/product.validator.js';


const upload =multer({
    storage:multer.memoryStorage(),
    limits:{fileSize:5*1024*1024} // 5MB 
})

const productRouter = Router();


/**
 * @route POST /api/products
 * @desc Create a new product
 * @access Private (Seller only)
 */
productRouter.post('/', authenticateSeller, upload.array('images', 7), createProductValidator, createProduct);

/**
 * @route GET /api/products
 * @desc Get all products
 * @access Private (Seller only)
 */
productRouter.get('/seller', authenticateSeller,getSellerProducts );

export default productRouter;
