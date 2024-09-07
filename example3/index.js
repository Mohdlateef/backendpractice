const express=require("express");

const mongoose=require("mongoose");
const usermodel = require("./usermodel");
require('dotenv').config();

const app=express();

app.use(express.json())
mongoose.connect(process.env.MONGOURI).then(()=>{
    console.log("mongodb connected sucessfully")
}).catch((err)=>{
    console.log(err);
})


app.post("/register",async (req,res)=>{
    console.log(req.body);
const{name,username,email}=req.body;



try {
//usernameExist
const userexist=await usermodel.findOne({username:username})

if(userexist){
    return res.send({
    message:"username already exists"
    })
}


    const userobj=new usermodel({
        name,
        username,
        email,
    })
    const userDb=await userobj.save();
    res.send("user login sucessfully");
    
} catch (error) {
    console.log(err);
    return res.send({
        status:500,
        message:"internal server error"
    })
}



})



app.listen(8000,()=>{
    console.log("port is running on port 8000");
})