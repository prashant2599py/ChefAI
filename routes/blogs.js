const { Router } = require("express");
const router = Router();

// const { Blogs } = require("../models/blogs");
// const { checkForAuthenticationCookie } = require("../middlewares/user");


router.get("/add-new" , (req, res) => {
    return res.render("/blogs", {
        user: req.user,
    })
})


module.exports = router;