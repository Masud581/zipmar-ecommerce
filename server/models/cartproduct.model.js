import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
   
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    quantity:{
        type: Number,
        default: 1
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    price:{
        type: Number,
        default: 0
    }
},{
    timestamps: true
})

const CartProductModel = mongoose.model('cartProduct', cartProductSchema);
export default CartProductModel;