const express=require("express");
const timeout=require("connect-timeout");
const fs=require("fs")

const app=express();


// app.use(timeout('1s'))
app.use(express.json());
app.get('/',(req,res)=>{

    res.send("we are in home route");
})

app.post('/test1',(req,res)=>{
    fs.readFile('file.json',(err,data)=>{
        if(err){
            throw err;
        }
        else{
            res.send(data);
        }
    })
    console.log(req.body);

  
})
app.post("/create",(req,res)=>{

    const data=req.body.data
    fs.writeFile("file2.txt",data,(err)=>{
        if(err){
            throw err;
        }
        else{
res.send("write file sucessfully")
        }
    })

})
app.get('/delete',(req,res)=>{
    fs.unlink("file2.txt",(err)=>{
        if(err){
            throw err;
        }
        else(res.send("delete file sucessfull"))
    })
})
app.post("/append",(req,res)=>{
    let data=req.body.data;

    console.log(data);
    fs.appendFile('file2.json',data,(err)=>{
        if(err){
            console.log(err)
        }
        res.send("append file sucessfull");
    })
})
app.listen(8000,()=>{
    console.log("server is running on port 8000")
})