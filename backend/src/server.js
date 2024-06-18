const express = require('express');
const cors = require('cors');
const livrosRouter = require('./routes/livros');
const app = express();
const porta = 3001;

app.use(express.json());
app.use(cors());
app.use('/livros', livrosRouter);
app.use(express.static('./frontend'));

app.listen(porta, () => 
{
  console.log(`Servidor rodando na porta ${porta}`);
}); 