const express = require('express')
const app = express();
let cors = require('cors');
const userRouter = require('./routes/user')


app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use("/user", userRouter)



app.get('/', function(req, res){
    res.render('Home')
 })
 app.get('/generator', (req, res) => {
     res.render("generator", {
        apiKey : process.env.OPENAI_API_KEY,
        youtube_apiKey : process.env.YOUTUBE_API_KEY
    })
 })
 
 app.get("/login", (req, res) => {
    res.render('login');
 })

//  app.post("/generator", (req, res) => {
//     res.redirect("/api/videos")
//  })

//  app.get("/api/videos", (req, res) => {
//     res.render('loader');
//  })



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
})