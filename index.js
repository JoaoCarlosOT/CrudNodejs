const express = require('express');

const conexao = require('./conexao.js');

const app = express();

app.use(express.json());

conexao.connect((error) => {
    if(error){
        console.log(error);
    }else{
        console.log("Conexão realizada com sucesso!");
    }

})

app.get('/users/:id', (req,res) => {
    const id = req.params.id
    const sql = "SELECT * FROM usuarios WHERE id=?;"
    conexao.query(sql, id, (error,resultado) => {
        const linha =resultado[0]
        if(error){
            res.status(404).json({"error":error})
        }else{
            res.status(200).json(linha)
        }
    })

})


app.get('/users', (req,res) => {
    const sql = "SELECT * FROM usuarios;"
    conexao.query(sql,(error,resultado) => {
        if(error){
            res.status(404).json({'error':error})
        }else{
            res.status(200).json(resultado)
        }
    })
})

app.post('/users', (req,res) => {
    const nome = req.body
    const sql ="INSERT INTO usuarios SET ?"
    conexao.query(sql, nome, (error,resultado)=>{
        if(error){
            res.status(404).json({'erro':error})
        }else{
            res.status(201).json(resultado)
        }

    })
})

app.put('/users/:id', (req,res) => {
    const id = req.params.id
    const name = req.body
    const sql = "UPDATE usuarios SET ? WHERE id=?;"
    conexao.query(sql, [name, id], (error,resultado)=>{
        if(error){
            res.status(404).json({'erro':error})
        }else{
            res.status(200).json(resultado)
        }
    })
})

app.delete('/users/:id', (req,res) => {
    const id = req.params.id
    const sql = "DELETE FROM usuarios WHERE id=?"
    conexao.query(sql, id, (error, resultado) => {
        const linha = resultado[0]
        if(error){
            res.status(401).json(({'erro':error}))
        }else{
            res.status(200).json(linha)
        }
    })
})


const port = 8080;

app.listen(port, () => 
    console.log("Rodando na porta "+port)
);