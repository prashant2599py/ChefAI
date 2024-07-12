const express = require('express')
const app = express();
const path = require("path");
let cors = require('cors');
const userRouter = require('./routes/user')
// const staticRoute  = require('./routes/staticRouter');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));  // For accepting form data
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));
app.use(express.static('./public'));
app.use("/user", userRouter)
// app.use("/", staticRoute);

app.get('/', function(req, res){
   res.render('Home')
})
app.get('/generator', (req, res) => {
   res.render("generator", {
      apiKey : process.env.OPENAI_API_KEY,
   })
})

app.get("/login", (req, res) => {
   res.render('login');
})

app.get("/loader", (req, res) => {
   res.render('loader',{
      youtube_apiKey : process.env.YOUTUBE_API_KEY,
   });
})


app.get("/loader/:query", (req, res) => {
   const data = req.params.query;
    res.render('loader', {
      youtube_apiKey : process.env.YOUTUBE_API_KEY,
      textData : data
    });
 })
 
// app.get("/loader/", (req, res) => {
//     res.render('loader', {
//       youtube_apiKey : process.env.YOUTUBE_API_KEY,
//       textData : req.query
//     });
//  })



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
})