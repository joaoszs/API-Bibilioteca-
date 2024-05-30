# API Bibilioteca

#### Trabalho desenvolvido para disciplina de desenvolvimento web UCB, consiste em uma API (somente backend) de um sistema de bibilioteca, a API possui 3 funcionalidades sendo elas, Listar livros, Comprar livros e adicionar um novo livro.

# Como utilizar :
* #### Clone o repositorio https://github.com/joaoszs/API-Bibilioteca-.git
* #### inicie o servidor utilizando o comando ' node server.js ' (lembre-se de alterar os caminhos caso nescessario).
* #### você pode usar ferramentas como Postman ou Insomnia para enviar requisições para o servidor.
* #### Para listar os livros : Envie uma solicitação GET para http://localhost:3001/livros.
* #### Para comprar um livro : Envie uma solicitação POST para http://localhost:3001/livros/comprar, lembre-se de incluir no body da solicitação o id do livro que deseja comprar e a quantidade desejada (.json) . Por exemplo: 
        {  
          "id": 1,
          "quantidade": 2
        }
* #### Para Adicionar um novo livro : Envie uma solicitação POST para http://localhost:3001/livros/adicionar, incluindo no body da solicitação os detalhes do novo livro, titulo, autor, preco e estoque (.json). Por exemplo:
        {
          "titulo": "Novo Livro",
          "autor": "Autor Desconhecido",
          "preco": 20.99,
          "estoque": 10
        }









