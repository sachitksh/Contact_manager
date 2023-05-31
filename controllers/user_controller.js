//desc get all contacts
//route get/api/contatcs
//access public
const async_handler=require('express-async-handler');
const User=require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");

const registerUser = async_handler(async(req, res) => {
  const {username,email,password}=req.body;
  if(!username|| !email || !password)
  {
      res.status(400);
      throw new Error("all fields ar mandatory")
  }
  const userAvailable=await User.findOne({email});
  if(userAvailable)
  {
    res.status(400);
    throw new Error("user already registered")

  }
  const hashedpassword=await bcrypt.hash(password,10);
  const user= await User.create({
    username,
    email,
    password:hashedpassword,
  })
  console.log(`${user}`);
  if(user)
  {
    res.status(201).json({_id: user.id, email:user.email});

  }
  else{
    res.status(400);
    throw new Error("user data was not valid");
  }
  res.json({message:"user has been registered"});
});


const loginUser = async_handler(async(req, res) => {
    const {email,password}=req.body;
    if(!email||!password)
    {
      res.status(400);
      throw new Error("all fields are mandatory!");
    }
    const user =await User.findOne({email});
    if(!user) {
      res.status(401);
      throw new Error("email or password is not valid");
    }
    if(user && (await bcrypt.compare(password,user.password))){
      const accesstoken=jwt.sign({
        user:{
          username:user.username,
          email:user.email,
          id:user.id,
        },
      },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})

      res.status(200).json({accesstoken});
    }
    else{
      res.status(401)
      throw new Error("email or password is not valid");
    }
  });

const CurrentUser = async_handler(async(req, res) => {
    res.json(req.user);
  });



module.exports={registerUser,loginUser,CurrentUser};