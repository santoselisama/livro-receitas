const express = require("express");
const app = express();
// estou pedindo para o expresse usar o EJS como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (req,res) => {
    res.render("index") //aqui estou pedindo que o ejs desenhe uma página
})

app.get("/perguntar", (req,res) => {
    res.render("perguntar") //aqui estou pedindo que o ejs desenhe uma página
})

app.listen(3000,() => {console.log("App rodando");});