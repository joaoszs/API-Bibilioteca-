const express = require('express');
const router = express.Router();
const { lerLivros, escreverLivros } = require('../utils/livrosFileHandler');

router.get('/', (req, res) => 
{
  try 
  {
    const livros = lerLivros();
    res.json(livros.books); 
  } catch (error) {
    console.error("Erro", error);
    res.status(500).json({ mensagem: "Erro" });
  }
});

router.post('/comprar', (req, res) => 
{
  const { id, quantidade } = req.body;
  try {
    const livros = lerLivros();
    const livro = livros.books.find(livro => livro.id === id); 
    if (!livro) 
    {
      return res.status(404).json({ mensagem: 'Livro nao encontrado' });
    }

    if (livro.estoque < quantidade) 
    {
      return res.status(400).json({ mensagem: 'Sem estoque' });
    }

    livro.estoque -= quantidade;

    escreverLivros(livros);

    res.json({ mensagem: 'Compra efetuada com sucesso', livro });
  } catch (error) {
    console.error("Erro", error);
    res.status(500).json({ mensagem: "Erro" });
  }
});

router.post('/adicionar', (req, res) => 
{
  const { titulo, autor, preco, estoque } = req.body;
  try {
    const livros = lerLivros();
    const novoId = livros.books.length ? livros.books[livros.books.length - 1].id + 1 : 1; 

    const novoLivro = { id: novoId, titulo, autor, preco, estoque };
    livros.books.push(novoLivro); 
    escreverLivros(livros);

    res.status(201).json({ mensagem: 'Cadastro efetuado', livro: novoLivro });
  } catch (error) {
    console.error("Erro ao adicionar um novo livro:", error);
    res.status(500).json({ mensagem: "Erro ao adicionar um novo livro" });
  }
});

module.exports = router;