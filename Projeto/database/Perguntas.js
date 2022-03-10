//Boa prática criar arquivos model com a letra maiúscula.

// Importar o Sequelizer.js que criamos lá no database.js
const Sequelizer = require("sequelize");
//Importar a conexão com banco de dados.
const connection = require("./database");

// Vamos definir nosso model.
// chamando a connection e define o nome da tabela.
// Ai abre o JSON e começa a definir os campos.
// Tanto titulo como descricao passamos lá na página html e 
// na rota do post dessa página HTML.
const Perguntas = connection.define('perguntas', {
    titulo:{
        type: Sequelizer.STRING, // Textos curtos
        allowNull: false, //Impede que receba valores nulos.
    },
    descricao:{
        type: Sequelizer.TEXT, // Textos longos
        allowNull: false, //Impede que receba valores nulos.
    }
});

// Para criar essa tabela no banco:
// Sincroniza o que está aqui com o banco de dados.
// Esse force: false significa que se a tabela exitir ele
// não vai forçar a criação de dela.
// O then é executado quando a tabela é criada.
Perguntas.sync({force: false}).then(() => {
    console.log("Tabela Criada!");
});

// Para executar devemos ir ao index.js e importar o model.
// const perguntaModel = require("./database/Pergunta");

//Para importar a tabela pro index.js
module.exports = Perguntas;