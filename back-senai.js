const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bcrypt = require("bcrypt");

//configurar servidor
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

//criar banco sqlite
const db = new sqlite3.Database("./database.db");
//criar banco sqlite
db.run(`CREATE TABLE IF NOT EXISTS usuarios(
    id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT, senha TEXT )`);

//Cadastrar usuário 
app.post("/usuarios", async (req, res) => {

    console.log(req.body);

    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;
    let senhaHash = await bcrypt.hash(senha, 10);


    //Inserir no banco de dados
    db.run(`INSERT INTO usuarios(nome, email, senha)
    VALUE(?, ?, ?)`),
    [nome, email, senhaHash],
    res.json({
    id: ThisParameterType.lastID,
    nome,
    email
    });
});