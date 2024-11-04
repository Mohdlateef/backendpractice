const mongoose=require("mongoose");


const Schema=mongoose.Schema;

const UserSchema=new Schema({
    name:{type:String,
       
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
username:{
    type:String,
    required:true,
    // unique:true,
},
 
   password:{
        type:String,
        required:true,
        
    }
})

const usermodel=mongoose.model("user",UserSchema);
module.exports=usermodel;