const express=require("express");

const app=express();

const fs=require("fs")

app.get("/home",(req,res)=>{
    return res.json({
        "key1":"we are in phase 1",
        "key2":"we are in phase 2",
        "key3":"we are in phase3"
    })
})

app.get("getfile",(req,res)=>{
    
})

app.listen(8000,()=>{
    console.log("we are running on port 8000")
})
