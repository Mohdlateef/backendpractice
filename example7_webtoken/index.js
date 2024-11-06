const express=require("express");
require("dotenv").config();
const mongoose=require("mongoose");

const app=express();
 
// file_Exports
const usermodel = require("./models/usermodel");




// ******--Apis----**** //

// Register Api

app.post("/Register",async (req,res)=>{
    const {name,email,username,password}=req.body;
const userData=await usermodel.findone()
    const userdb= new usermodel({
        name,
        email,
        username,
        password,
    })
       await userdb.save()
})









// DataBase connection
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("db connected sucessfully")
}).catch((error)=>{
    console.log(error);
})
    





const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})