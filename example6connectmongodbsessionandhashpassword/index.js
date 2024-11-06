const express = require("express");
const mongoose = require("mongoose");
const app = express();
const session=require("express-session");
const mongoose_session=require("connect-mongodb-session")(session);
require("dotenv").config();
const bcrypt=require("bcrypt");
const store=new mongoose_session({
  uri:process.env.MONGO_URI,
  collection:"sessions"
})
// global middleware

app.use(express.json());
app.use(session({
  secret:process.env.SECRET,
  store:store,
  resave:false,
  saveUninitialized:false,
}))
// file_imports
const Usermodel = require("./modles/Usermodel");
const isAuth = require("./middlewares/isauthmiddleware");

// connect Db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mogodbconected sucessfully");
  })
  .catch((err) => {
    console.log(err);
  });

// APi
// Register
app.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;
  const SALT=parseInt(process.env.SALT)
  const hashpass=await bcrypt.hash(password,SALT);
  console.log(hashpass)
  try {
    // userExist
    const userdata = await Usermodel.findOne({ email });
    if (userdata) {
      return res.status(400).json("user already exists");
    }
    // store new userdata in DB
    await Usermodel.create({
      name,
      email,
      username,
      password:hashpass,
    });
    return res.status(200).json({
      message: "user register sucessfully",
    });
  } catch (error) {
    return res.send(error);
  }
});


// login
app.post("/login",async(req,res)=>{

    const {email,password}=req.body;
    
    //  find_user
    try {
        const userData=await Usermodel.findOne({email})
        if(!userData)
        {
            return res.status(401).json({
            message:"unauthorised requiest"
            })
        }

        // compair password
        const bcryptpass=await bcrypt.compare(password,userData.password)
        console.log(userData);

        if(bcryptpass)
        {
          req.session.isAuth=true;
          req.session.user={
 userId:userData._id,
 email:userData.email,
 username:userData.name,
          }
 console.log(req.session);
            return res.status(201).json("user login sucessfully");
        }
    else{
        return res.status(401).json("incorrect password")
    }
  

    } catch (error) {
        return res.status(400).json({message:"dataBase error",
            error:error
        })
    }
})

// dashboardApi
app.get("/dashbord",isAuth,(req,res)=>{
  
  return res.send("you are in dasborad page")
})

const PORT = parseInt(process.env.PORT);

app.listen(PORT, () => {
  console.log(`server is running on port 8000`);
});
