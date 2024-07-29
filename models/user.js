const mongoose = require('mongoose');
const { Schema , model } = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const { createTokenForUser } = require("../services/authentication");
require('dotenv').config();

const URL = process.env.DATABASE_URL;

mongoose.connect(URL);

const userSchema = new Schema({
    username : {
        type: String,
        required: true
    }, 
    email : {
        type:  String,
        required: true,
        unique: true
    }, 
    salt :{
        type: String,
        
    },
    password : {
        type: String,
        required: true
    },
    profileImageURL : {
        type: String,
        default: "/images/default.png"

    },
    role: {
        type: String,
        enum : ['USER','ADMIN'],
        default: 'USER'
    }


}, { timestamps: true }
)

// Hashing Password
userSchema.pre("save", function(next){
    const user = this;
    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");
    
    this.salt = salt;
    this.password = hashedPassword;
    next();
})

userSchema.static("matchPasswordAndGenerateToken",async function(email, password){
    const user = await this.findOne({ email });
    if(!user) throw new Error("User not found");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

    if(hashedPassword !== userProvidedPassword) 
        throw new Error("Incorrect Password")
    
    const token = createTokenForUser(user);
    return token;
})


const User = model("User", userSchema);

module.exports = {
    User
}