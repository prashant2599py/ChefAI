const express = require('express')
const app = express();
const path = require("path");
let cors = require('cors');
const userRouter = require('./routes/user')
const blogRouter = require('./routes/blogs')
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie, setUserLocals } = require('./middlewares/user');
const Contact = require('./models/contact');
const Blogs = require('./models/blogs');
// const User = require('./models/user');
const session = require('express-session');
const { default: axios } = require('axios');

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true if you're using HTTPS
}));

app.use(cors({
   origin: process.env.CORS_ORIGIN,
   credentials:true,
}));

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(setUserLocals)
 // For accepting form data
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));
app.use(express.static(path.resolve('./public')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('Something broke!');
 });

app.use("/user", userRouter);
app.use("/blog", blogRouter);


app.get('/', function(req, res){
   res.render('Home')
})

app.get('/generator', (req, res) => {
   res.render("generator", {
      apiKey : process.env.OPENAI_API_KEY,
   })
})
app.get('/AllBlogs', async (req, res) => {
   try{
      const allBlogs = await Blogs.find({})
      const user = req.session.user;

      res.locals.user = user; 
       res.render("AllBlogs", {
          user : user,
          blogs: allBlogs
         })
      
   }catch(error){
      res.status(500).json({
         message : "Unable to fetch Blogs"
      })
   }
})

app.get("/utube", async (req, res) => {
   const queryString  = req.query.q;
   const decodedString = decodeURIComponent(queryString);
   
   try{
      const apiKey = process.env.YOUTUBE_API_KEY;
      const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search`, {
         params : {
            key : apiKey,
            type: 'video',
            part: 'snippet',
            q: decodedString,
            maxResults: 50
         }
      })
      res.render('utube', {
         videos: response.data.items,
         textData : decodedString,
      })
   }catch(error){
      console.error(error);
      res.status(500).json({message : "Error fetching youtube videos"})
   }
})

app.get('/contact', (req, res) => {
   res.render('Contact');
})


app.post('/contact', async (req, res) => {
   const fullName = req.body.fullName;
   const email = req.body.email;
   const phone = req.body.phone;
   const message = req.body.message;

   await Contact.create({
      fullName,
      email,
      phone,
      message,
   })
   res.status(200).render('Contact', {
      message :"Data sent successfully"
   });

})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is listening at port:${PORT}`);
})