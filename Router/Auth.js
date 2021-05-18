const express=require('express');
const router=express.Router();
const { body, validationResult } = require("express-validator");
const User=require('../Model/User_Schema');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

router.get('/',(req,res)=>
{

    res.send('welcome to server side.')
})
router.post('/register', async(request,response)=>
{
    const {first_name ,last_name  ,email  ,password} =request.body;

    if(!first_name ||  !last_name  ||   !email  ||  !password)
    {
        return response.status(422).json({error:"please fill the filed properly"});
    }
    try{
        const userExist=await User.findOne({email:email});
        if(userExist)
        {
            return response.status(422).json({error:"Email already exist"});
            
        }
        const user=new User({first_name,last_name,email,password})
        await user.save();
        return response.status(201).json({message:"Congrates !! You Registered successfully."});
        
    }
    catch(error)
    {
        console.error(error)
    }
})

///Login Route
router.post('/signin', async (request,response)=>
{
    try{
        const {email ,password} =request.body;
        if(!email || !password)
        {
            return response.status(400).json({error:"Please fill the fields."});
            
        }
        
        const userLogin = await User.findOne({email:email});
        if(userLogin)
        {
            const isMatch=await bcrypt.compare(password,userLogin.password);
            
            const token= await userLogin.generateAuthToken();
            

            if(!isMatch)
            {
                response.status(400).json({error:"Credential error"})
            }
            else
            {
                response.status(200).json({message:"Login successfully"});
                console.log("login")
            }
           
        }
        else
        {
            response.status(400).json({error:"credential error"})
        }    
        
    }
    catch(error)
    {
        console.error(error)
    }
})

module.exports=router