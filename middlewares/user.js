const { validateToken } = require('../services/authentication');
function checkForAuthenticationCookie(cookieName){

    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        // console.log("TOken cookies values : " + tokenCookieValue);

        if(!tokenCookieValue){
            // console.log("No token found");
            return next();
        }

        try{
            const userPayload = validateToken(tokenCookieValue);
            // console.log("user payload : " + userPayload);
            req.user = userPayload;
            next();
        }catch(err){
            // console.log("Token validation failed");
           return next();
        }
    }
}

function setUserLocals(req, res, next){
    res.locals.user = req.user; 
    next();
}


module.exports ={
    checkForAuthenticationCookie,
    setUserLocals,
}