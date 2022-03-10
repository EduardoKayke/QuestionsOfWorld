/** Instalações.
 *  Primeiro de tudo demos o comando:
 *  npm init
 *  npm install express --save
 *  npm install ejs --save 
 * 
 *  Ejs é uma biblioteca pra mostrar HTML e poder colocar 
 *  variáveis.
*/


// ---------------------PARTE 1------------------------------
// Estrutura básica de uma aplicação Express.
const express = require("express"); // Importei o módulo.
const app = express(); // Cópia do Express na variável.
const bodyParser = require("body-parser"); 
// Body-Parser, e temos que configurar ali na PARTE 3

//Vamos carregar a conexão com o banco de dados.
const connection = require("./database/database");
//Importando o model de perguntas.
const Perguntas = require("./database/Perguntas");
const Respostas = require("./database/Respostas")
// Database Essa estrutura é chamada Promises

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

// ---------------------PARTE 3------------------------------
// Colocar o EJS no Express.
app.set('view engine', 'ejs');

// Arquivos estáticos.
app.use(express.static('public')); 

//Esse comando permite enviar os dados do formulário
//Traduzindo os dados em uma estrutura JavaScript
app.use(bodyParser.urlencoded({extended: true}));
//Permite que leia os dados do formulário via JSON.
// Utilizado quando trabalhado com API.
app.use(bodyParser.json());

// PS: Estou dizendo ao Express para usar o EJS como view 
// engine.
// Crie uma pasta chamada views, é importante que tenha esse 
// nome para salvar os arquivos HTML. 
// Podemos colocar pastas dentro da pasta views para 
// organizar.
// Arquivos com a extensão .ejs
// Agora que o arquivos está pronto, vamos juntar com Express.
// Observe o que foi feito na parte 1. 

// ---------------------PARTE 4------------------------------

//Página inicial.
app.get("/", (requisition, response) => {

    //Method responsável por ver todos os dados da tabela.
    // Equivalente a SELECT * FROM Perguntas
    // raw: true = Para pegar só os dados que criamos
    // raw é cru. Ou seja, uma pesquisa crua.
    // Alterando a ordem dos itens apresentados do banco de dados
    //order = DESC é decrescente
    //order = ASC é crescente
    // Podemos ordenar com o nome do campo da tabela.
    // Poderiamos usar titulo, pois usamos no banco de dados.
    Perguntas.findAll({raw: true, order:[
        ['id', 'DESC']
    ]}).then(perguntas => {
        response.render("index", {
            perguntas: perguntas,
        });// para mostrar as perguntas.
    });// pesquisando no banco, mandando os dados pra variável
       // e renderizando no front-end com o render.

    



    
    // <!-------PARTE 4 DO INDEX.JS--------->
    // <!-- <h1>Perguntas e Respostas</h1>
    // <hr>
    // <h3>Lista de perguntas</h3>
    // <img src="/source/img/desenvolvedor.png" alt="Desenvolvedor">
    // <p>Nome: <%= nome %></p>
    // <p>Linguagem Favorita: <%= lang %></p>
    // <p>Empresa: <%= empresa %></p>
    // <p>Inscritos: <%= inscritos %></p>

    // <% if(msg == true){ %>
    //     <h3>Isso é uma mensagem de erro!</h3>
    // <% } else { %>
    //     <h3>Está tudo em ordem</h3>
    // <% }; %>

    // <% produtos.forEach(function(produto) { %>
    // <hr>
    // <h3><%= produto.nome %></h3>
    // <h4><%= produto.preco %></h4>
    // <% }); %> --></hr>

    // Parte de cima foi o INDEX.EJS antigo
    // Essa de baixo foi aqui com Express.js

    // Vamos linkar as variáveis do JS para o HTML do EJS
    // No HTML a tag da variável deve ser assim
    // <%= lang %>, sendo lang qualquer variável.
    // <%= nome %> e etc...
    // Para criar uma condição(if, else etc..) é diferente. 
    // Observe no arquivo index.ejs

    // USADO NO INDEX.EJS
    // var nome = requisition.params.nome;
    // var lang = requisition.params.lang;
    // var exibirMsg = true;
    // // Vamos usar forEach no EJS veja no arquivo.
    // var produtos = [
    //     {nome: "Doritos", preco: 3.14},
    //     {nome: "Coca-cola", preco: 5},
    //     {nome: "Leite", preco: 1.45},
    //     {nome: "Carne", preco: 15},
    //     {nome: "Redbull", preco: 6},
    //     {nome: "Nescau", preco: 4},
    // ];

    // response.render("index", {
    //     // USADO NO INDEX.EJS
    //     // nome: nome, 
    //     // lang: lang,
    //     // empresa: "Desenvolvedor Freelancer",
    //     // inscritos: 8000,
    //     // msg: exibirMsg,
    //     // produtos: produtos,        
    // }); //leia mais na parte 3


    // response.send("Bem vindo ao meu site!"); exemplo passado antes de criar o response.render("index");

});

//Página onde pergunta.
app.get("/perguntar", (requisition, response) => {
    response.render("perguntar");
});

// Para receber formulários precisamos baixar do Express
// o body-parser, use o comando no terminal:
// npm install body-parser --save
// Agora temos que colocar em uma constante. Suba até o topo
// desse arquivo e veja a importação do body-parser.
// body-parser vem do express.js
// O Body-parser é responsável pelo body utilizado aqui.
// objeto body que usamos pra pegar o nome dos inputs no html
// Vamos instalar o Sequelize para usar o MySQL
// Instalação por terminal, digite:
// npm install --save sequelize
// Para trabalhar junto com o MySQL precisa baixar um lib
// Instalação por terminal, digite:
// npm install --save mysql2

// Salva a pergunta no banco de dados.
app.post("/salvarpergunta", (requisition, response) => {

    var titulo = requisition.body.titulo;
    var descricao = requisition.body.descricao;

    // Salva a pergunta no banco de dados
    // Isso é o equivalente ao código SQL
    // insert into perguntas (informações)...
    Perguntas.create({
        titulo: titulo,
        descricao: descricao,
    }).then(() => {
        response.redirect("/");
        //Redirecionando o user para a pág principal após
        // enviar a pergunta.
    });
});

//Página da pergunta.
app.get("/pergunta/:id", (requisition, response) => {
    var id = requisition.params.id;
    Perguntas.findOne({
        where:{
            id: id,
        }
    }).then(pergunta => {
        if(pergunta != undefined){ // Pergunta encontrada

            Respostas.findAll({
                where: {
                    perguntaId: pergunta.id,
                },
                order:[ 
                    ["id", "DESC"]
                ],
            }).then(respostas => {
                response.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas,
                });
            });
        } else { // Pergunta não encontrada
            response.redirect("/");
        }
    });
});

//Página de resposta.
app.post("/responder", (requisition, response) => {
    var corpo = requisition.body.corpo;
    var perguntaId = requisition.body.pergunta;
    Respostas.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        response.redirect(`/pergunta/${perguntaId}`);
    });
});

// ---------------------PARTE 2------------------------------
// Porta do servidor localhost:8080/
app.listen(8080, () => {
    console.log("App Rodando");
});