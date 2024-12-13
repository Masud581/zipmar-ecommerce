import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    orderId: {
        type: String,
        reqired :[true, 'Order Id is required'],
        unique: true
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    product_details:{
        name : String,
        image : String
    },
    peymentId: {
        type: String,
        default: ""
    },
    payment_status:{
        type: String,
        default: ""
    },
    delivery_address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
    },
    subTotalAmt:{
        type: Number,
        default: null
    },
    invoice_receipt:{
        type: String,
        default: ""
    }
},{
    timestamps: true
})

const OrderModel = mongoose.model('order', orderSchema);
export default OrderModel;