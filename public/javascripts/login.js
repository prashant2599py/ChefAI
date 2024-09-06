const signUpBtn = document.getElementById("signUp");
const signInBtn = document.getElementById("signIn");

const context = document.getElementById("context");
const form = document.getElementById("authForm");
    if(context === "aiSearch"){
        form.action = '/user/signup';
    }else{
        form.action  = '/blog/signup';
    }
signUpBtn.addEventListener('click', (e) =>{

});
signInBtn.addEventListener('click', (e) =>{
console.log("Signin data sent")
});



