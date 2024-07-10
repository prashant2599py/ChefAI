const { User } = require("../db")

async function userMiddleware(req, res, next){

    const username = req.headers.username;
    const password = req.headers.password;

    User.findOne({
        username : username,
        password : password
    }).then((data) =>{
        if(data){
            next();
        }else{
            res.status(403).json({
                message : "User doesn't exist!"
            })
        }
    })
  
}
module.exports = userMiddleware;