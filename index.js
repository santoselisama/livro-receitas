const express = require("express");
const app = express();
const connection = require("./database/database");
const Model = require("./database/Model");
const jwt = require("jsonwebtoken");
const secret = "sabrinabonita"; 

//banco de dados

function login(){
    var emailField = document.getElementById("email");
    var passwordField = document.getElementById("password");

    var email = email.value;
    var password = passwordField.value;
}

function verifyJWT(req, res, next){
    const token = req.headers['x-acess-token'];
    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).end();

        req.userId = decoded.userId;
        next();
    })
}

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
    Model.findAll({raw: true, order: [
        ['id','DESC']                   //aqui será mostrado da receita mais nova p a mais antiga
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

//autorização que você é você mesmo
// diferente de autenticação que seria deixar vc entrar no sistema
app.post("/login", (req,res) => {
    if(req.body.user === 'sabrina' && req.body.password === "1234"){ 
        const token = jwt.sign({userId: 1}, secret, {expiresIn: 300 });  //quanto tempo vale esse token
        return res.json({auth:true, token});            
    }
    res.status(401).end();
})

app.get("/receitas", (req,res) => {
    res.render("receitas") //aqui estou pedindo que o ejs desenha uma página
})

//rota para salvar os dados do formulario
app.post("/salvarreceita",(req,res) => { 
    var titulo = req.body.titulo;  // recebo os dados do formulário
    var descricao = req.body.descricao; //salvo no meu banco de dados
    Model.create({
        titulo:titulo,
        descricao: descricao  //e se caso isso aconteça com sucesso
    }).then(() => {
        res.redirect("/") // esse then vai redirecionar o usuário para a página inicial
    })                         
});

app.get("/receitas/:id", (req, res) => {
    var id = req.params.id;
    Model.findOne({
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