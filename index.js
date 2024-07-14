const express = require('express')
const app = express();
const path = require("path");
let cors = require('cors');
const userRouter = require('./routes/user')
// const staticRoute  = require('./routes/staticRouter');


 // For accepting form data
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));
app.use(express.static('./public'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use("/", userRouter)

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




const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
})