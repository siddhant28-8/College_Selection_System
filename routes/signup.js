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
    const existing_user=await user.find({"Email":Email});
    if(existing_user){
    res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Email Already Registered</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          font-family: Arial, sans-serif;
        }
        h2 {
          color: red;
        }
      </style>
    </head>
    <body>
      <h2>This Email is already registered with us. Please try a different email.</h2>
    </body>
  </html>
`);
    }
    else{
    const salt= await bcrypt.genSalt(10);
    Password=await bcrypt.hash(Password,salt);
    const newuser=new user({Email,Password});
    const savedUser=await newuser.save();
    console.log(savedUser);
    res.redirect('signin.html');
    }
   
})


module.exports=SignupRouter;
