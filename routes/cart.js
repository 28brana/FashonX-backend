const Cart = require('../models/Cart');
const { verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

const router=require('express').Router();


// Create Product

router.post('/',verifyToken,async(req,res)=>{
    const newCart=new Cart(req.body);
    try{
        const savedCart= await newCart.save();
        res.status(201).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }
})

// Update Product
router.put('/:id',verifyTokenAndAuthorization, async(req,res)=>{

    // You can do some Changes here
    try{
        const newCart=await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(newCart);
    }catch(err){
        res.status(500).json(err);
    }

})


// Delete The Product
router.delete('/:id',verifyTokenAndAuthorization, async(req,res)=>{

    try{
       await Cart.findByIdAndDelete(req.params.id);
       res.status(200).json("Cart is Deleted");
    }catch(err){
        res.status(500).json(err);
    }

})

// Get User Cart
router.get('/find/:userId', verifyTokenAndAuthorization,async(req,res)=>{

    try{
       const cart= await Cart.findOne({
           userId:req.params.userId
       });

       res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err);
    }

})

// Get All Cart
router.get('/', verifyTokenAndAdmin,async(req,res)=>{

    try{
       const cart= await Cart.find();

       res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err);
    }

})

module.exports=router;