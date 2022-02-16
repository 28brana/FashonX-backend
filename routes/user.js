const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const bcrypt=require('bcryptjs');
const User = require('../models/User');

const router=require('express').Router();

// Update The User
router.put('/:id',verifyTokenAndAuthorization, async(req,res)=>{

    try{

        if(req.body.password){
            req.body.password=await bcrypt.hash(req.body.password,10);
        }

        const updateUser=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updateUser);
    }catch(err){
        res.status(500).json(err);
    }

})


// Delete The User
router.delete('/:id',verifyTokenAndAuthorization, async(req,res)=>{

    try{
       await User.findByIdAndDelete(req.params.id);
       res.status(200).json("User is Deleted");
    }catch(err){
        res.status(500).json(err);
    }

})

// Get User by id
router.get('/find/:id',verifyTokenAndAdmin, async(req,res)=>{

    try{
       const user= await User.findById(req.params.id);
       const {password,...other}=user._doc;

       res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }

})


//Get ALL USER

router.get('/',verifyTokenAndAdmin, async(req,res)=>{
    const query=req.query.new;
    try{
       const users= query ?await User.find().sort({_id:-1}).limit(5):  await User.find();
       
       res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }

})

// Get Stats : means return number of user join from lastYear according of month

router.get('/stats',verifyTokenAndAdmin, async(req,res)=>{
    const date=new Date();
    const lastYear=new Date(date.setFullYear(date.getFullYear()-1));
    try{
        const data= await User.aggregate([
            // Filter all data whoes createdAt after last Year
            {$match:{createdAt:{$gte:lastYear}}},
            {
                //  Remove Month from it
                $project:{
                    month:{$month:"$createdAt"},
                },
            },
            {
                // Group it by Month and give count
                // Structure: Month
                           // Total
                $group:{
                    _id:"$month",
                    total:{$sum:1},
                }
            }
        ])
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);
    }

})





module.exports = router;