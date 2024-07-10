const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://admin:Wxl133K0RgiqVqD6@cluster0.clxjzil.mongodb.net/Recipe");

const userSchema = new mongoose.Schema({
    username : String,
    email: String,
    password : String
})

const User = mongoose.model("User", userSchema);

module.exports = {
    User
}