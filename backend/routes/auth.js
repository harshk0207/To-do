const {User}=require('../models/User.js');
const express=require('express');
const bcrypt=require('bcrypt');
const router=express.Router();
const Joi=require('joi');

router.post('',async (req,res)=>{
    let success=false;
    const result=validate(req.body);
    if(result.error){
      res.status(400).send({success,error:result.error.details[0].message});
      return;
    }
    let user=await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send({success,error:'Invalid email or password'});

    const validPassword=await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send({success,error:'Invalid email or password'});
    const token=user.generateAuthToken();
    success=true;
    res.send({success,token});
});

function validate(req){
    const schema=Joi.object({
      email:Joi.string().min(5).max(255).required().email(),
      password:Joi.string().min(5).max(1024).required()
    });
    return schema.validate(req);
}

module.exports=router;