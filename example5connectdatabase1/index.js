const express=require("express");
const mongoose=require("mongoose");

const mongo_URI="mongodb+srv://umer:umer123@cluster0.nrmg0fv.mongodb.net/JunertestDb"
const usermodel=require("./model/Userschema");

const app=express();
app.use(express.urlencoded({
    extended:true,
}))
app.use(express.json())


app.post("/login",async (req,res)=>{
    console.log(req.body);
    const{name,email,username,password}=req.body
    console.log(username)
try {
    const userdb=await usermodel.create({
        name:name,
        email:email,
        username:username,
        password:password
    })
    console.log(userdb,"24");
    return res.send({
        message:"created sucessfully",
        userdb:userdb,
    })
} catch (error) {
    return res.send({
        message:"can't created ",
        error:error,
    })
}
})



app.post("/finduser",async(req,res)=>{
    console.log(req.body);
    const {email}=req.body
    try {
    const userdb=await usermodel.findOneAndDelete({email})
        return res.send({userinfo:userdb})
    } catch (error) {
        return res.send({
            error:error,
        })
    }
})


mongoose.connect(mongo_URI).then(()=>{
console.log("mogodb connected sucessfully")}).catch((err)=>{
    console.log(err)
})

app.listen(8000,()=>{
    console.log("server is running on port 800");
})