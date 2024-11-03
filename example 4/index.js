const express=require("express");

const app=express();

const fs=require("fs")
app.use(express.json())
app.get("/home",(req,res)=>{
    return res.json({
        "key1":"we are in phase 1",
        "key2":"we are in phase 2",
        "key3":"we are in phase3"
    })
})

app.get("/getfile",(req,res)=>{
    fs.readFile('file1.json',(err,data)=>{
        if(err){
            throw err;
        }
        return res.send(data)
    })
})


// writefile


let data="we are good state but i am trying to get how to make josn file"


app.post("/writefile",(req,res)=>{
    console.log(req.body)
    fs.writeFile(`${req.body.filename}`,req.body.data,(err)=>{
        if (err){
            throw err
        }
    })
    return res.send('write file has been done sucessfully')
})






app.listen(8000,()=>{
    console.log("we are running on port 8000")
})
