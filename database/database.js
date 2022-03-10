// Vamos criar a conexão com Sequelize
const Sequelize = require("sequelize");
//Aqui vai o nome do banco de dados pra conectar.
const connection = new Sequelize('guiaperguntas', 'root', 'SENHAOCULTA', {
    host: 'localhost',
    dialect: 'mysql',
});


//banco de dados = guiaperguntas, criado no Workbench MySQL
// usuário = root
// senha do banco de dados = Ee@87654321
// host = o local no caso é localhost meu pc
// dialect = qual banco de dados está usando, no caso MySQL


// Exportar a conexão criada.
module.exports = connection;