const express=require("express");

const fs=require("fs")
const app=express();



app.get("/home",(req,res)=>{
   fs.readFile("test.json",(err,data)=>{
        if(err){
            throw err;
        }
        res.end(data);

    });
})


app.listen(8000,()=>{
    console.log("server is running on port 8000")
})