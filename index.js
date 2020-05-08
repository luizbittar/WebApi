var express = require('express'); //importa a biblioteca do express
var app = express(); //cria um objeto do express

//ponto de acesso (endpoint)
app.get('/', function (request, response) {
    response.send('Hello World!');
});

//outro ponto de acesso
app.get('/clientes', function (request, response) {
    let cliente = {
        "nome": "Thamires Santos",
        "idade": 21
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