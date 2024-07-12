const express = require('express')
const app = express();
let cors = require('cors');
const userRouter = require('./routes/user')
// const staticRoute  = require('./routes/staticRouter');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));  // For accepting form data

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use("/user", userRouter)
// app.use("/", staticRoute);


app.get("/login", (req, res) => {
   res.render('login');
})
app.get('/', function(req, res){
   res.render('Home')
})
app.get('/generator', (req, res) => {
   res.render("generator", {
      apiKey : process.env.OPENAI_API_KEY,
   })
})



// app.get("/api/videos/:" , (req, res) => {
//     const query = req.query.q;
//     res.render('loader', {
//       youtube_apiKey : process.env.YOUTUBE_API_KEY,
//       queryParameter : query
//     });
// })


//  app.post("/generator", (req, res) => {
//     res.redirect("/api/videos")
//  })

 app.get("/api/videos/:", (req, res) => {
    res.render('loader', {
      youtube_apiKey : process.env.YOUTUBE_API_KEY,
      
    });
 })



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
})