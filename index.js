const express = require('express')
const app = express();
const path = require("path");
let cors = require('cors');
const userRouter = require('./routes/user')
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/user');


 // For accepting form data
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));
app.use(express.static('./public'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use("/user", userRouter)
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get('/', function(req, res){
   res.render('Home')
})

app.get('/user/signup', (req, res)=> {
   res.render('signup')
})
app.get('/user/signin', (req, res)=> {
   res.render('signin')
})

app.get('/generator', (req, res) => {
   res.render("generator", {
      apiKey : process.env.OPENAI_API_KEY,
   })
})


app.get("/utube", (req, res) => {
   const queryString  = req.query.q;
   const decodedString = decodeURIComponent(queryString);
   res.render('utube',{
      youtube_apiKey : process.env.YOUTUBE_API_KEY,
      textData : decodedString
   });
})

app.get("/blogs", (req, res) => {
   res.render("blogs" , {
      user: req.user,
   });
})



const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
})