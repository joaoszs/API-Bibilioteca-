const express = require('express');
const router = express.Router();
const { lerLivros, escreverLivros } = require('../utils/livrosFileHandler');

//TODO Rota para listar todos os livros
router.get('/', (req, res) => {
  try {
    const livros = lerLivros();
    res.json(livros.books);
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ mensagem: "Erro ao buscar livros" });
  }
});

//TODO Rota para comprar um livro
router.post('/comprar', (req, res) => {
  const { id, quantidade } = req.body;
  try {
    const livros = lerLivros();
    const livro = livros.books.find(livro => livro.id === id);
    if (!livro) {
      return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }

    if (livro.estoque < quantidade) {
      return res.status(400).json({ mensagem: 'Estoque insuficiente' });
    }

    livro.estoque -= quantidade;
    escreverLivros(livros);
    res.json({ mensagem: 'Compra efetuada com sucesso', livro });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ mensagem: "Erro ao comprar livro" });
  }
});

//TODO Rota para adicionar um novo livro
router.post('/adicionar', (req, res) => {
  const { titulo, autor, genero, estoque } = req.body;
  try {
    const livros = lerLivros();
    const novoId = livros.books.length > 0 ? livros.books[livros.books.length - 1].id + 1 : 1;
    const novoLivro = { id: novoId, titulo, autor, genero, estoque };
    livros.books.push(novoLivro);
    escreverLivros(livros);
    res.status(201).json({ mensagem: 'Livro adicionado com sucesso', livro: novoLivro });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ mensagem: "Erro ao adicionar livro" });
  }
});

//TODO Rota para buscar um livro por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  try {
    const livros = lerLivros();
    const livro = livros.books.find(livro => livro.id === parseInt(id));
    if (!livro) {
      return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }
    res.json(livro);
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ mensagem: "Erro ao buscar livro" });
  }
});

//TODO Rota para editar um livro
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, autor, genero, estoque } = req.body;
  try {
    const livros = lerLivros();
    const livroIndex = livros.books.findIndex(livro => livro.id === parseInt(id));
    if (livroIndex === -1) {
      return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }
    livros.books[livroIndex] = { id: parseInt(id), titulo, autor, genero, estoque };
    escreverLivros(livros);
    res.json({ mensagem: 'Livro atualizado com sucesso', livro: livros.books[livroIndex] });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ mensagem: "Erro ao atualizar livro" });
  }
});

//TODO Rota para remover um livro
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  try {
    let livros = lerLivros();
    const livroIndex = livros.books.findIndex(livro => livro.id === parseInt(id));
    if (livroIndex === -1) {
      return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }
    livros.books = livros.books.filter(livro => livro.id !== parseInt(id));
    escreverLivros(livros);
    res.json({ mensagem: 'Livro removido com sucesso' });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ mensagem: "Erro ao remover livro" });
  }
});

module.exports = router;