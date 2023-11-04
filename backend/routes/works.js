const {Work,validateWork}=require('../models/Work.js')
const {User}=require('../models/User.js')
const auth=require("../middleware/auth")
const express=require('express');
const router=express.Router();

router.get('/getWorks',auth,async (req,res)=>{
    let works=await Work.find({user:req.user._id});
    res.send(works);
});

router.post('/addWork',auth,async (req,res)=>{
    const result=validateWork(req.body);
    if(result.error){
      res.status(400).send(result.error.details[0].message);
      return;
    }
    const work=new Work({
        user:req.user._id,
        title:req.body.title,
        description:req.body.description,
        tag:req.body.tag,
        dueDate:req.body.dueDate,
        priority:req.body.priority
    });
    await work.save();
    res.send(work);
});
// router.post('/addWork',auth,async (req,res)=>{
//     let success=false;
//     const result=validateWork(req.body);
//     if(result.error){
//       res.status(400).send({success,error:result.error.details[0].message});
//       return;
//     }
//     let work=await Work.findOne({title:req.body.title,user:req.user._id});
//     if(work) return res.status(400).send({success,error:'Work Already present'});
//     work=new Work({
//         user:req.user._id,
//         title:req.body.title,
//         description:req.body.description,
//         tag:req.body.tag,
//     });
//     await work.save();
//     success=true;
//     res.send({success,work});
// });

router.put('/updateWork/:id',auth,async (req,res)=>{
    // console.log("i am in works.js 1")
    const {title,description,tag,dueDate,priority,isDone}=req.body;
    const newWork={};
    if(title) newWork.title=title;      
    if(description) newWork.description=description;
    if(tag) newWork.tag=tag;
    if(dueDate) newWork.dueDate=dueDate;
    if(priority) newWork.priority=priority;
    newWork.isDone=isDone;
    // console.log("i am in works.js 2")
    const work=await Work.findByIdAndUpdate(req.params.id,{$set: newWork},{new:true});
    
    // console.log("i am in works.js 3")
    if(!work) return res.status(404).send("No work with such id is present");
    if(work.user!=req.user._id) return res.status(401).send("You are not authorized to update this work");

    res.send(work); 
});

router.delete('/deleteWork/:id',auth,async (req,res)=>{
    const work=await Work.findByIdAndDelete(req.params.id);
    if(!work) return res.status(404).send("No work with such id is present");
    if(work.user!=req.user._id) return res.status(401).send("You are not authorized to delete this work");

    res.send("Deleted Succesfully"); 
});

module.exports=router;