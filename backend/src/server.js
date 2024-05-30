const express = require('express');
const livrosRouter = require('./routes/livros');
const app = express();
const porta = 3001;

app.use(express.json());
app.use('/livros', livrosRouter);

app.listen(porta, () => 
{
  console.log(`Servidor rodando na porta ${porta}`);
});