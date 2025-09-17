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

//selecionar um usuario
app.get('usuarios/:id', (req,res) => {
    let idUsuario = req.paramas.id;

    db.get(`SELECT id, nome, email FROM usuarios 
    WHERE id = ?`,
    [idUsuario], (err, row) => {
        if (row) {
            res.json(row)
        } else{
            res.status(404).json({
                'message' : 'Usuario não encontrado.'
            })
        }
    })
})

//deletar usuarios
app.delete('usuarios/:id', (req, res) =>{
    let idUsuario = req.params.id

    db.get(`DELETE FROM usuarios WHERE id = ?`,
    [idUsuario], function(err, result) {
        if (result) {
            res.json({
            'masage' : 'Usuario deletado'
        })
        } else{
            res.status(404).json({
                'masage' : 'Usuario não encontrado'
            })
        }
    })
        
    })
    
// Editar usuário
app.put("/usuarios/:id", async (req, res) => {
    let idUsuario = req.params.id;  

    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;

    let senhaHash = await bcrypt.hash(senha, 10);

    db.run(
        `UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?`,
        [nome, email, senhaHash, idUsuario],
        function() {
            res.json({

            });
        }
    );
});



//listar todos os usuarios

app.get("/usuarios",(req, res) =>{
    db.all(`SELECT id, nome, email FROM usuarios`, [], (err, rows)=>{
        res.json(rows)
    })
})

//Iniciar o server
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))
