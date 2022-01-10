const express = require("express");
const app = express();
const connection = require("./database/database");
const receitaModel = require("./database/Model")

//banco de dados

connection
    .authenticate()
    .then(() => {
        console.log("conexão feita com sucesso!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// bodyparser é o cara responsavel por traduzir os
// dados enviados do formulario de uma estrutura javascript
const bodyParser = require("body-parser"); 
const receita = require("./database/Model");

// estou pedindo para o expresse usar o EJS como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

//aqui ele vai decodificar os dados enviados pelo formulario
app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json());

app.get("/", (req,res) => {
    receita.findAll({raw: true}).then(receita => {
        res.render("index", {          //aqui estou pedindo que o ejs desenhe uma página
            receita:receita
        }); 
    }); 
});   

app.get("/receita", (req,res) => {
    res.render("receita") //aqui estou pedindo que o ejs desenhe uma página
})

app.post("/salvarreceita",(req,res) => { //rota para salvar os dados do formulario
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    receita.create({
        titulo:titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    })                         //INSERT INTO , como se fosse
});

app.listen(3000,() => {console.log("App rodando");});