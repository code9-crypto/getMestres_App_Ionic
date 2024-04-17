//Esta constante express é uma função
const express = require("express");

//Então, será necessário invoca-lo para gerar a API
//Da mesma forma como está abaixo
const app = express();
const bodyParse = require("body-parser");

//Para usar uma biblioteca externa,
//deve-se expressar desta forma como está abaixo
//Isto é necessário para que a API responda em formato JSON
app.use(bodyParse({ extended: true }));

app.get("/", (req, res)=>{
    //req -> é o paramêtro que o servidor recebe
    //res -> é o paramêtro que o servidor devolve/responde
    res.status(200).send("Olá mundo");
})

app.post("/", (req, res)=>{
    res.status(201).send(req.body);
})

app.put("/:id", (req, res)=>{
    res.status(202).send({
        codigo: req.params.id,
        corpo: req.body
    })
})

app.delete("/:id", (req, res)=>{
    res.status(204).send(req.params.id);
})

app.listen(3000, ()=>{
    console.log("Opa, api inicializada");
})


/*
VERBOS HTTP
GET - Pegar alguma coisa, pode ser lista, pode ser um único elemento, até uma página(select)
POST - Enviar dados para sua Api(Salvar - save)
PUT - Atualizar à informação(update)
DELETE - Deletar

Status Code
200 - Ok
201 - created(POST)
202 - Accepted(PUT)
204 - No Content(DELETE)
*/