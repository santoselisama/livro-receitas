const Sequelize = require("sequelize");
const connection = require("./database");

const receita = connection.define('receita', { //aqui eu defino o nome da tabela
    titulo:{                //aqui eu defino os campos da tabela do banco
        type:Sequelize.STRING,    
        allowNull:false
    },
    descricao: {            //aqui eu defino os campos da tabela do banco
        type:Sequelize.TEXT,
        allowNull:false
    }
});

receita.sync({force:false}).then(() => {  //aqui eu envio para o banco crie a tabela
    console.log("Tabela criada!")
});

module.exports= receita;

//o model é uma representação da sua tabela no banco de dados.
//o sequelize pega o código javascript e envia para o sql em forma de tabela.