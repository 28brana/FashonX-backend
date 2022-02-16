const mongoose=require('mongoose');

const OrderSchema=new mongoose.Schema(
    {
        userId:{type:String,required:true},
        products:[
            {
                productId:{
                    type:String,
                    required:true
                },
                quantity:{
                    type:Number,
                    default:1,
                }
            }
        ],
        amount:{type:Number,required:true},
        address:{type:Object,required:true},
        status:{type:String,default:"Pending"}
        
    },
    {
        timestamps:true
    }
);


// cat={
//     "userId":"61fb8ee6dcb2a8c5fa519995",
//     "products":[
//         {
//             "productId":"61fcbf03f3aea061e932aeca",
//             "quantity":1
//         }
//     ],
//     "amount":100,
//     "address":"Punjab"
// }
module.exports = mongoose.model("Order",OrderSchema);