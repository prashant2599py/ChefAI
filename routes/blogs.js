const { Router } = require("express");
const router = Router();
const Blog = require('../models/blogs');

const { storage } = require('../utils/storage');
const multer = require('multer');
const upload = multer({ storage : storage })

const path = require('path');
const Comment = require('../models/comment');
const { User } = require("../models/user");
const { checkForAuthenticationCookie } = require("../middlewares/user");



router.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    })
})

router.get('/signup', (req, res) => {
  res.render('signup',{
    user : req.user,
  });
})
router.get('/signin', (req, res) => {
    res.render('signin')
})

router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({blogId : req.params.id}).populate('createdBy');
  return res.render('BlogWithUser', {
    user: req.user,
    blog,
    comments,
  })
})

  router.post('/comment/:blogId', async (req, res) => {
    await Comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user._id
    })
    return res.redirect(`/blog/${req.params.blogId}`)
  })

router.post("/All", upload.single('coverImage'), async (req, res)=> {
  try{
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(400).json({ error: 'Title and body are required' });
    }
    // console.log(req.file);

    const blog = await Blog.create({
          title,
          body,
          createdBy : req.user._id,
          coverImageURL: req.file.path,
      })  
      return res.redirect(`/blog/${blog._id}`) // redirects to blog/id of user, To which user it belongs
  }catch(err){
    res.status(500).send("Error ")
  }
})

router.post('/signup', async (req, res) => {
    const { username, email, password} = req.body;

    try{
      const alreadyExist = await User.findOne({email});
      if(alreadyExist){
        res.render('signup', {
          error : "User already exists with this email"
        })
      }
      const newUser = await User.create({
        username : username,
        email : email,
        password : password
      })
      req.session.user = {
        id : newUser._id,
        username : newUser.username,
        email : newUser.email
      }
      res.status(200).redirect('/AllBlogs')

    }catch(err){
        res.status(500).json({
          message : "Something wrong with your Credentials. Use different ID"
      })
    }

})

router.post('/signin' , async ( req, res) => {
      const { email, password } = req.body; 
      try{
        const token = await User.matchPasswordAndGenerateToken(email, password);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure flag if in production
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })
        return res.redirect('/AllBlogs');
      }catch(error){
          res.render('signin', {
          error : "Incorrect Email or password"
        })
      }
})

router.post("/delete/:id", async(req, res) => {
  const id = req.params.id;
  const blogDeleted = await Blog.delete()
})

module.exports = router;