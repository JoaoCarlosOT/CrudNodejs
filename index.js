const express = require('express');

const app = express();

app.get('/home', (req, res) => {
    res.status(200).send("Olá mundo");
})

app.get('/users', (req,res) => {
    const users =[
        {
            name:"Carlos senna",
            email:"Carlos@gmail.com"
        },
        {
            name:"Caty",
            email:"caty@gmail.com"
        },
    ]

    res.status(200).send(users);

})

const port = 8080;

app.listen(port, () => 
    console.log("Rodando na porta "+port)
);