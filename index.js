const bodyParser = require('body-parser'); //incluir a requisição do json parse
const cors = require('cors');
const express = require('express'); //importa a biblioteca do express
const dbMysql = require('mysql'); //referencia a biblioteca do mysql

const app = express(); //cria um objeto do express

app.use(cors({origin: '*'}));

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    next();
});

//configurações da base de dados
const db = dbMysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "luiz",
    password: "Admin",
    database: "automacaoprocessos"
});

//conectar na base de dados
db.connect(function(err){
    if(err) throw err;

    console.log("Conectado com sucesso!");
});

// executar queries
function executarSQL(sql, response){
    db.query(sql, function(erros, results, fields){
        if (erros)
            response.json(erros);
        else
            response.json(results);
    });

    console.log('Query executada com sucesso!')
};

//ponto de acesso (endpoint)
app.get('/', function (request, response) {
    response.send('Hello World!');
});

//Retornar usuários
app.get('/usuario', function(request, response){
    const sqlQuery = "select * from usuarios";
    executarSQL(sqlQuery, response);
});

//Retornar apenas um usuário
app.get('/usuario/:id', function(request, response){
    let id = request.params.id;
    const sqlQuery = `select * from usuarios where idusuario = ${id}`;
    executarSQL(sqlQuery, response);
});

app.post('/usuario', function(request, response){
    const {usuario, senha} = request.body;
    const sql = `insert into usuarios(usuario, senha) values('${usuario}', '${senha}')`;
    executarSQL(sql, response);
});

app.put('/usuario/', function(request, response){
    const {usuario, senha, idusuarios} = request.body;
    const sql = `update usuarios set usuario = '${usuario}', senha = '${senha}' where idusuarios = '${idusuarios}'`;
    executarSQL(sql, response);
});

app.delete('/usuario/:id', function(request, response){
    const id = request.params.id;
    const sql = `delete from usuarios where idusuarios = '${id}'`;
    executarSQL(sql, response);
});

//outro ponto de acesso
app.get('/clientes', function (request, response) {
    let cliente = {
        "nome": "Luiz Bittar",
        "idade": 67
    }

    response.json(cliente);
});

//outro ponto de acesso
app.get('/produtos', function (request, response) {
    let produto = {
        "nome": "Máscara de tratamento capilar",
        "peso": "400g",
        "preço" : "R$ 16,00"
    }

    response.json(produto);
});

//escuta a porta 3000
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
module.exports = app;
