const express=require('express');
const user=require('../mongodb.js');
const bcrypt=require('bcrypt');
const SignupRouter=express.Router();
const path=require('path');


SignupRouter.get('/',async (req,res)=>{
    res.sendFile(path.join(path.join(__dirname+'/../collegesinfo/signup.html')));
});

SignupRouter.post('/',async (req,res)=>{
    var {Email,Password}=req.body;
    const salt= await bcrypt.genSalt(10);
    Password=await bcrypt.hash(Password,salt);
    const newuser=new user({Email,Password});
    const savedUser=await newuser.save();
    console.log(savedUser);
    res.redirect('signin.html');
   
})


module.exports=SignupRouter;
