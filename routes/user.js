require('dotenv').config();
const { Router } = require("express");
const jwt = require('jsonwebtoken')
const router = Router();
const { User } = require("../models/user");
const { checkForAuthenticationCookie } = require("../middlewares/user");

const Blog = require("../models/blogs")

router.get('/signup', (req, res)=> {
    res.render('signup')
 })
 router.get('/signin', checkForAuthenticationCookie("token"), (req, res)=> {
    if(req.user){
       return res.redirect('/generator');
    }
    res.render('signin')
 })

 
router.post('/signup', async (req, res) => {
    
    const username = req.body.username;
    const email = req.body.email;
    const  password = req.body.password
    
    try{
       const userExists = await User.findOne({ email });
       if(userExists){
            res.render('signup', {
                error: "User already exists with this email"
            })
            return;
        }

       const user =  User.create({
            username : username,
            email : email,
            password : password
        })
        await user.save();
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET , {
            expiresIn: '1h'
        })
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000, // 1 hour
        })
        return res.redirect('/generator');   
    }catch(error){
        res.status(500).json({
            message : "Something wrong with your Credentials. Use different ID"
        })
    }
           
})

router.post("/signin", async (req, res) => {  
    const email = req.body.email;
    const password = req.body.password

    try{      
       const token = await User.matchPasswordAndGenerateToken(email, password);
       res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure flag if in production
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
       });
       
       return res.redirect('/generator');
        
    }catch(err){ 
        res.render('signin', {
            error: "Incorrect email or password"
        });   
        
    }
})

router.get("/blogs", checkForAuthenticationCookie("token"), async (req, res) => {
    const allBlogs = await Blog.find({})
    res.locals.user = req.user;
    res.render("AllBlogs", {
        user: req.user, 
        blogs: allBlogs
    })
 })

 router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/")
 })


module.exports = router;
