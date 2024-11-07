const express=require("express");
require("dotenv").config();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken")
const nodemailer=require("nodemailer")
const app=express();
 
// Global_Middlewares
app.use(express.json());

// file_Exports
const usermodel = require("./models/usermodel");




// ******--Apis----**** //

// Register Api

app.post("/register",async (req,res)=>{
    const {name,email,username,password}=req.body;
    try{
    const userData=await usermodel.findOne({email:email})
    // if(userData){
    //     return res.send("user already register");
    // }
    console.log(userData);
    const userdb= new usermodel({
        name,
        email,
        username,
        password,
    })

    // generate_WebToken
    const token=jwt.sign({email},process.env.SECRET)

    // sendtoken
    const transporter=nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        service:"gamil",
        auth:{
            user:"lateefahbaba123@gmail.com",
            pass:"obdp fhkj zeuj ewaf",
            }
    })
const mailOptions={
    from:"lateefahbaba123@gmail.com",
    to:email,
    subject:"email verificatin for token gen",
    html:`<a href="http://localhost:8000/verify?token=${token}">click me to verify your email</a>`
}
transporter.sendMail(mailOptions,function(error,info)
{
    if(error){
        console.log(error);
    }
    else{
        console.log(`email has been sent sucessfully:${email}`);
    }
})

// console.log(token);
// const data= jwt.verify(token,process.env.SECRET)

    //    await userdb.save()
       return res.send("user register sucessfully");
    } catch (error) {
        console.log(error);
        return res.send(error)
    }

})



// verify token

app.get('/verify',async(req,res)=>{
    const token =req.query.token;
    console.log()
    console.log(token)
 const userinfo= jwt.verify(token,process.env.SECRET)
 
await usermodel.findOneAndUpdate({})
 res.send("email has been verified sucessfully");
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