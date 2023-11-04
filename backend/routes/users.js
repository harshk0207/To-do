const {User,validateUser,validatePassword}=require('../models/User.js')
const auth=require("../middleware/auth")
const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');  //for hashing password

//signup
router.post('',async (req,res)=>{
    let success=false;
    const result=validateUser(req.body);
    if(result.error){
      res.status(400).send({success,error:result.error.details[0].message});
      return;
    }
    let user=await User.findOne({email:req.body.email});
    if(user) return res.status(400).send({success,error:'User Already present'});

    user=new User(req.body);

    const salt=await bcrypt.genSalt(10);   //creating a salt
    user.password=await bcrypt.hash(user.password,salt); //hashing password and salt

    const token=user.generateAuthToken();
    success=true;
    res.send({success,token});
    await user.save();
});

router.put('/changePassword',auth,async (req,res)=>{
  let success=false;
  const result=validatePassword(req.body);
  if(result.error){
    res.status(400).send({success,error:result.error.details[0].message});
    return;
  }
  const user=await User.findById(req.user._id);
  const validPassword=await bcrypt.compare(req.body.oldPassword,user.password);
  if(!validPassword) return res.status(400).send({success,error:'Invalid old Password'});

  const salt=await bcrypt.genSalt(10);   //creating a salt
  const newPassword=await bcrypt.hash(req.body.newPassword,salt); //hashing password and salt
  user.password=newPassword;
  await user.save();
  success=true;
  res.send({success});
});
router.get('/me',auth,async(req,res)=>{
  const user=await User.findById(req.user._id).select('-password');
  res.send(user);
})

module.exports=router;
  