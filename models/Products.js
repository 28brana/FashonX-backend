const mongoose=require('mongoose');

const ProductSchema=new mongoose.Schema(
    {
        title:{type:String,required:true,unique:true},
        desc:{type:String,required:true},
        img:{type:String,required:true},
        categories:{type:Array},
        size:{type:String},
        color:{type:String},
        price:{type:Number,required:true},
       
    },
    {
        timestamps:true
    }
);

// {
//     "title":"Red Dress",
//     "desc":"lorem lorem lorem lomre lpjesofsefs",
//     "img":"pic.img",
//     "categories":[
//         "t-shirt","mens"
//         ],
//     "size":"X",
//     "color":"Red",
//     "price":2000
// }


module.exports = mongoose.model("Product",ProductSchema);