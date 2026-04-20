import productModel from '../models/product.model.js';
import { uploadFile } from '../services/storage.service.js';

export async function createProduct(req,res){
    const {title,description,priceAmount,priceCurrency} = req.body;

    const seller=req.user;

    const images = await Promise.all(req.files.map(async(file)=>{
        const result = await uploadFile({
            buffer:file.buffer,
            fileName:file.originalname
        });
        return {url:result.url};
    }))

    const product = new productModel({
        title,
        description,    
        seller:seller._id,
        price:{ 
            amount:priceAmount,
            currency:priceCurrency || 'INR'
        },
        image: images
    });

    await product.save();

    res.status(201).json({
        message:'Product Created Successfully',
        success:true,
        product
    });

}

export async function getSellerProducts(req,res){
    const seller = req.user;

    const products = await productModel.find({seller:seller._id});

    res.status(200).json({
        message:'Products fetched successfully',
        success:true,
        products
    });
}