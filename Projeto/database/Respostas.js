//Boa prática criar arquivos model com a letra maiúscula.

// Importar o Sequelizer.js que criamos lá no database.js
const { Sequelize } = require("sequelize");
const Sequelizer = require("sequelize");
//Importar a conexão com banco de dados.
const connection = require("./database");

// Vamos definir nosso model.
// chamando a connection e define o nome da tabela.
// Ai abre o JSON e começa a definir os campos.
// Tanto titulo como descricao passamos lá na página html e 
// na rota do post dessa página HTML.
const Resposta = connection.define("respostas", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

Resposta.sync({force: false});

module.exports = Resposta;