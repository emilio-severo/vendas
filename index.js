const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("index", {nome: "", quantidade: "", precounitario: "",
                         precovista: "", parcelas: "", valorparcela: "", precoprazo: ""});
} );

app.post("/calcular", function(req, res){
    let nome = req.body.nome;
    let quantidade = parseInt(req.body.quantidade);
    let precounitario = parseFloat(req.body.precounitario);
    let precovista = precounitario * quantidade;
    let parcelas = parseInt(req.body.parcelas);
    let precoprazo = precovista + precovista * 3 / 100;
    let valorparcela = precoprazo / parcelas;
    
    res.render("index", {nome: nome, quantidade: quantidade, precounitario: precounitario.toFixed(2),
                        precovista: precovista.toFixed(2), parcelas: parcelas, valorparcela: valorparcela.toFixed(2),
                        precoprazo: precoprazo.toFixed(2)
                    });
});

app.listen(3000);
