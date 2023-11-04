const mongoose=require('mongoose');
const Joi=require('joi');
const jwt=require('jsonwebtoken');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:30
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024
    },
    date:{
        type:Date,
        default:Date.now
    },

});

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},"jwtPrivateKey");
    return token;
}

const User=new mongoose.model('User',userSchema);

function validateUser(user){
    const schema=Joi.object({
      name:Joi.string().min(3).max(30).required(),
      email:Joi.string().required().email(),
      password:Joi.string().min(5).max(1024).required(),
    });
    return schema.validate(user);
}

function validatePassword(passwords){
    const schema=Joi.object({
      oldPassword:Joi.string().min(5).required(),
      newPassword:Joi.string().min(5).required(),
    });
    return schema.validate(passwords);
}

module.exports.User=User;
module.exports.validateUser=validateUser;
module.exports.validatePassword=validatePassword;