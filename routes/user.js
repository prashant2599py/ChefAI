const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
require('dotenv').config();
const  JWT_SECRET  = process.env.JWT_SECRET;
const { User } = require("../db")

router.post("/signup", async (req, res) => {

    const username = req.body.username,
    email = req.body.email,
    password = req.body.password
    
    
    try{
       const userExists = await User.findOne({ email });
        
       if(userExists){
            res.status(400).json({
                message : "User already exists with this email address"
            })
            return;
        }

        const newUser = await User.create({
            username : username,
            email : email,
            password : password
        })
        
        // Generate JWT token
        const token = jwt.sign({ id : newUser._id}, JWT_SECRET , {expiresIn : '1h'})

        res.status(201).json({
            message : "User created Successfully!",
            token : token
        })    
    }catch(error){
        res.status(500).json({
            message : "Something wrong with your Credentials. Use different ID"
        })
    }
        

    
})

router.post("/signin", async (req, res) => {
    const userExists = await User.findOne({
        email : req.body.email,
        password : req.body.password
    })
    try{
        
        if(userExists){
            
            const token = jwt.sign({email : req.body.email}, JWT_SECRET, {expiresIn:'1h'})

            res.json({
                message : "Signed in successfully",
                token: token
            })
            // console.log("jwt token created successfully")
        }else{
            res.status(403).json({
                message : "Email or password is not correct"
            })
        }

    }catch(err){
        // console.log(err);
        res.status(411).json({
            message : "User already with this email id"
        })
    }
})


module.exports = router;
