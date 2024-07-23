const { Schema , model } = require('mongoose');

const blogSchema  = new Schema({
    title: {
        type: String,
        required: true,
    }, 
    body: {
        type: String,
        required: true,
    },
    coverImageURL :{
        type: String,
        required: false,
    }, 
    createdBy : {
        type : Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps : true})

const Blogs = model("blogs" , blogSchema) 

module.exports = Blogs;