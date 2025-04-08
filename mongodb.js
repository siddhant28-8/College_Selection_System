const { error } = require('console');
const express=require('express');
const mongoose=require('mongoose');
const { type } = require('os');
const path=require('path');

mongoose.connect('mongodb://127.0.0.1/collegeList')
.then(()=>console.log('mongodb connected')).catch(()=>console.log(error));

const schema =new mongoose.Schema({
    Email:{
     type:String,
     required:true
    },
     Password:{
     type:String,
     required:true
    }
}
);

const user=mongoose.model('user',schema);

module.exports=user;