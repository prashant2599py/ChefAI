const { Router } = require("express");
const router = Router();
const multer = require('multer');
const path = require('path');

const Blog = require('../models/blogs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName)
    }
  })

  const upload = multer({ storage: storage })



router.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    })
})


router.post("/blogs", upload.single("coverImage"),async (req, res)=> {
    const { title, body } = req.body;
    const blog = await Blog.create({
        body,
        title,
        createdBy : req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`,
    })
    return res.redirect(`/user/blogs/`)
})

module.exports = router;