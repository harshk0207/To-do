const mongoose=require('mongoose');
const {User}=require('./User.js')
const Joi=require('joi');
const workSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectID,
        ref:'user'
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        default:"General"
    },
    dueDate:{
        type:Date,
    },
    isDone:{
        type:Boolean,
        default:false
    },
    priority:{
        type:String,
        default:0
    },
    date:{
        type:Date,
        default:Date.now
    },

});
const Work=new mongoose.model('Work',workSchema);
function validateWork(work){
    const schema=Joi.object({
      title:Joi.string().required(),
      description:Joi.string().required(),
      tag:Joi.string(),
      priority:Joi.string().required(),
      dueDate:Joi.date().required(),
      isDone:Joi.boolean()
    });
    return schema.validate(work);
}
module.exports.Work=Work;
module.exports.workSchema=workSchema;
module.exports.validateWork=validateWork;