const express = require('express')
const app = express();
const path = require("path");
let cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user')
// const staticRoute  = require('./routes/staticRouter');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));  // For accepting form data
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));
app.use(express.static('./public'));
app.use("/", userRouter)
// app.use("/", staticRoute);

app.get('/', function(req, res){
   res.render('Home')
})

app.get('/generator', (req, res) => {
   res.render("generator", {
      apiKey : process.env.OPENAI_API_KEY,
   })
})


app.get("/loader", (req, res) => {
   const queryString  = req.query.q;
   const decodedString = decodeURIComponent(queryString);
   console.log(decodedString);
   res.render('loader',{
      youtube_apiKey : process.env.YOUTUBE_API_KEY,
      textData : decodedString
   });
})


// app.get("/loader/:query", (req, res) => {
//    const data = req.params.query;
//    console.log(data);
//     return res.render('loader', {
//       youtube_apiKey : process.env.YOUTUBE_API_KEY,
//       // queryData : data
//      });
//  })

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