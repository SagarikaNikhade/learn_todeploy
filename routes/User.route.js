const express = require("express");
const {UserModel} = require("../models/User.model")
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

UserRouter.post("/register",async(req,res)=>{
   const {email,pass,age,name} = req.body;
 try{
   bcrypt.hash(pass, 5, async(err, hash)=> {
      const user = new UserModel({email,pass:hash,age,name})
      await user.save()
      res.status(200).send({"msg":"New user added"})
  });
 }catch(err){
    // console.log(err.message)
    res.status(400).send({"msg":err.message})
 }
})

UserRouter.post("/login",async(req,res)=>{
   const {email,pass} = req.body;
    try{
       const user = await UserModel.findOne({email})
       if(user){
         bcrypt.compare(pass, user.pass, (err, result) =>{
            if(result){
               const token = jwt.sign({authorID:user._id,author:user.name},'masai')
               res.status(200).send({"msg":"Login Successfully!!","token":token})
            }else{
               res.status(200).send({"msg":"Wrong Credentials!!!"})
            }
        });
       }else{
         res.status(200).send({"msg":"Wrong Credentials!!!"})
       }
    }catch(err){
      res.status(400).send({"msg":err.message})
    }
})

module.exports = {UserRouter}