import mongoose from 'mongoose';

const productSchema =  new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    category: {
        type: String,
        enum: ['men', 'women', 'kids', 'unisex', 'accessories'],
        required: true,
        default: 'men'
    },
    sizes: [{
        type: String
    }],
    colors: [{
        name: String,
        hex: String
    }],
    price:{
        amount:{
            type:Number,
            required:true
        },
        currency:{
            type:String,
            enum:['USD','EUR','GBP','INR'],
            default:'INR'
        }
    },
    image:[
        {
            url:{
                type:String,
                required:true
            }
            
        }
    ]

},{
    timestamps:true
})

const productModel = mongoose.model('product',productSchema);

export default productModel;
