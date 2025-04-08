const express=require('express');
const bcrypt=require('bcrypt');
const  bodyParser=require('body-parser');
const path =require('path');
const user=require('../mongodb');
const { sign } = require('crypto');
const College=require('../collegelistMongodb.js');

const signinRouter=express.Router();

signinRouter.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/../collegesinfo/signin.html'));
})

signinRouter.post('/',async(req,res)=>{
    const {Email,Password}=req.body;
    const Present=await user.findOne({Email});
    if(!Present){
        res.status(400).send('User Not Registered ');
    }
    else {
        const match=  await bcrypt.compare(Password,Present.Password);
        if(!match){
            res.status(400).send('Invalid Username OR Password');  //400 is client error 
        }
        else {
            const perPage = 6; // Number of cards per page
  const page = parseInt(req.query.page) || 1; // Current page, defaults to 1

  try {
    const totalColleges = await College.countDocuments(); // Get total number of colleges
    const colleges = await College.find()
      .skip((perPage * page) - perPage) // Skip colleges for previous pages
      .limit(perPage); // Limit results to the number of cards per page

    res.render('index', {
      colleges,
      currentPage: page,
      totalPages: Math.ceil(totalColleges / perPage) // Calculate total pages
    });
  } catch (err) {
    res.status(500).send("Error fetching data");
  }
        }
    }
});

module.exports=signinRouter;
