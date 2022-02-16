const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const Products = require('../models/Products');

const router=require('express').Router();

// Create Product

router.post('/',verifyTokenAndAdmin,async(req,res)=>{
    const newProduct=new Products(req.body);
    try{
        const savedProduct= await newProduct.save();
        res.status(201).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
})

// Update Product
router.put('/:id',verifyTokenAndAdmin, async(req,res)=>{

    try{

        const updateProduct=await Products.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updateProduct);
    }catch(err){
        res.status(500).json(err);
    }

})

// Delete The Product
router.delete('/:id',verifyTokenAndAdmin, async(req,res)=>{

    try{
       await Products.findByIdAndDelete(req.params.id);
       res.status(200).json("Product is Deleted");
    }catch(err){
        res.status(500).json(err);
    }

})

// Get Product by id
router.get('/find/:id', async(req,res)=>{

    try{
       const product= await Products.findById(req.params.id);

       res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }

})

//Get ALL product

router.get('/', async(req,res)=>{
    const qNew=req.query.new;
    const qCategory=req.query.category;
    try{
       let product;
       if(qNew){
           product = await Products.find().sort({createdAt:-1}).limit(2);
       }else if(qCategory){
           product = await Products.find({
               
               categories:{
                   $in:[qCategory],
               },
           });
       }else{
           product= await Products.find();
       }
       
       res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }

})

module.exports = router;