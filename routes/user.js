const { Router } = require("express");
const router = Router();
const { User } = require("../db")


router.post('/signup', async (req, res) => {
    
    const username = req.body.username;
    const email = req.body.email;
    const  password = req.body.password
    
    try{
       const userExists = await User.findOne({ email });
       if(userExists){
            res.status(400).json({
                message : "User already exists with this email address"
            })
            return;
        }

        await User.create({
            username : username,
            email : email,
            password : password
        })

        res.redirect('/generator') ;   
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
        // console.log(token);
        return res.cookie("token", token).redirect('/generator');
        
    }catch(err){ 
        return res.render('signin', {
            error: "Incorrect email or password"
        });   
        
    }
})


router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/blogs")
})


module.exports = router;
