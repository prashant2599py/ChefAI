const { Router } = require("express");
const router = Router();
const Blog = require('../models/blogs');
const multer = require('multer');
const path = require('path');
const Comment = require('../models/comment')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null,fileName)
    }
  })
  
const upload = multer({ storage })

router.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    })
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

const uploadMiddleware = upload.single('coverImage'); // Adjust 'coverImage' as necessary
router.post("/All", async (req, res) => {
  const { title, body } = req.body;
  console.log(req.body);
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    
  });
  return res.redirect(`/blog/${blog._id}`);
});

// router.post("/All", async (req, res)=> {
//   uploadMiddleware(req, res, async (err) => {
//     console.log(err);
//     if (err instanceof multer.MulterError) {
//       console.log(err);
//       return res.status(400).json({
//         error: err.message,
//       });
//     } else if (err) {
//       return res.status(500).json({
//         error: 'File Upload failed',
//       });
//     }
//   });
//   console.log("Inside All Route")
//   console.log(req.file);
//   try{
//     const { title, body } = req.body;
//     console.log(req.body);
//     if (!title || !body) {
//       return res.status(400).json({ error: 'Title and body are required' });
//     }
    
//     const blog = await Blog.create({
//           title,
//           body,
//           createdBy : req.user._id,
//           coverImageURL: `/uploads/${req.file?.filename}`,
//       })  
//       return res.redirect(`/blog/${blog._id}`) // redirects to blog/id of user, To which user it belongs
//   }catch(err){
//     console.log(err);
//     res.status(500).send("Error")
//   }
// })





module.exports = router;