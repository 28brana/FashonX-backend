const router=require('express').Router();
const User=require('../models/User')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
router.post("/register",async (req,res)=>{
    try{
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:await bcrypt.hash(req.body.password,10),
        });

       const savedUser = await newUser.save();
       res.status(201).json(savedUser);

    }catch(err){
        res.status(500).json(err);
    }
})


// LOGIN
router.post('/login',async (req,res)=>{
    try{
        const user= await User.findOne({username:req.body.username});

        !user && res.status(401).json("Wrong credentials !");
        // Decrypt
        const passwordMatch=await bcrypt.compare(req.body.password,user.password);


        !passwordMatch && res.send("Wrong Password");

        const {password,...other}=user._doc;

        const accessToken=jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        },process.env.JWT_SEC,{expiresIn:'3d'})

        res.send({...other,accessToken});

 
     }catch(err){
         res.status(500).json(err);
     }
})




module.exports=router;