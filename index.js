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
const escrever = require("./database/Model");

// estou pedindo para o expresse usar o EJS como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

//aqui ele vai decodificar os dados enviados pelo formulario
app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json());

app.get("/", (req,res) => {
    escrever.findAll({raw: true, order: [
        ['id','DESC']
    ]})
    .then(escrever => {
        res.render("index", {          //aqui estou pedindo que o ejs desenhe uma página
            escrever:escrever
        }); 
    }); 
});   

app.get("/escrever", (req,res) => {
    res.render("escrever") //aqui estou pedindo que o ejs desenhe uma página
})

//rota para salvar os dados do formulario
app.post("/salvarreceita",(req,res) => { 
    var titulo = req.body.titulo;  // recebo os dados do formulário
    var descricao = req.body.descricao; //salvo no meu banco de dados
    receita.create({
        titulo:titulo,
        descricao: descricao  //e se caso isso aconteça com sucesso
    }).then(() => {
        res.redirect("/") // esse then vai redirecionar o usuário para a página inicial
    })                         
});

app.get("/receitas/:id", (req, res) => {
    var id = req.params.id;
    receitas.findOne({
        where: {id:id}
    }).then(receitas => {
        if(receitas != undefined){ //receita encontrada
            res.render("receitas",{
                receitas:receitas
            });
        }else{ //não encontrada
            res.redirect("/");
        }
    })
})

app.listen(3000,() => {console.log("App rodando");});