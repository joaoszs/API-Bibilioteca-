document.addEventListener("DOMContentLoaded", function() 
{
    const links = document.querySelectorAll('.scroll-link');
    const formAdicionar = document.getElementById('formulario-adicionar');
    const livrosContainer = document.querySelector('.livros-container');
    const buscarInput = document.querySelector('header input[type="text"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) 
        {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    //TODO Carregar Livros
    function carregarLivros(query = '') 
    {
        fetch('http://localhost:3001/livros')
            .then(response => response.json())
            .then(data => {
                livrosContainer.innerHTML = '';
                data
                    .filter(livro => livro.titulo.toLowerCase().includes(query.toLowerCase()))
                    .forEach(livro => {
                        const livroElement = document.createElement('div');
                        livroElement.classList.add('livro');
                        livroElement.innerHTML = `
                            <img src="${livro.imagem}" alt="Capa do Livro">
                            <div class="livro-info">
                                <h3>${livro.titulo}</h3>
                                <p>Autor: ${livro.autor}</p>
                                <p>Gênero: ${livro.genero}</p>
                                <p>Estoque: ${livro.estoque}</p>
                                <div class="btn-group">
                                    <button class="comprar-btn" data-id="${livro.id}">Comprar</button>
                                    <button class="editar-btn" data-id="${livro.id}">Editar</button>
                                    <button class="remover-btn" data-id="${livro.id}">Remover</button>
                                </div>
                            </div>
                        `;
                        livrosContainer.appendChild(livroElement);
                    });

                document.querySelectorAll('.comprar-btn').forEach(button => {
                    button.addEventListener('click', comprarLivro);
                });
                document.querySelectorAll('.remover-btn').forEach(button => {
                    button.addEventListener('click', removerLivro);
                });
                document.querySelectorAll('.editar-btn').forEach(button => {
                    button.addEventListener('click', editarLivro);
                });
            })
            .catch(error => console.error('Erro:', error));
    }

    //TODO Adicionar Livro
    formAdicionar.addEventListener('submit', function(e) 
    {
        e.preventDefault();

        const titulo = document.getElementById('titulo').value;
        const autor = document.getElementById('autor').value;
        const genero = document.getElementById('genero').value;
        const estoque = document.getElementById('estoque').value;

        fetch('http://localhost:3001/livros/adicionar', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({titulo, autor, genero, estoque})
        })
        .then(response => response.json())
        .then(data => {
            if (data.mensagem === 'Livro adicionado com sucesso') {
                alert('Livro adicionado com sucesso!');
                carregarLivros(); 
                formAdicionar.reset();
            } else {
                alert('Erro ao adicionar livro');
            }
        })
        .catch(error => console.error('Erro:', error));
    });

    //TODO Comprar Livro
    function comprarLivro(e) 
    {
        const livroId = e.target.dataset.id;
        const quantidade = prompt('Quantidade a comprar:', '1');

        if (quantidade) {
            fetch('http://localhost:3001/livros/comprar', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: parseInt(livroId), quantidade: parseInt(quantidade) })
            })
            .then(response => response.json())
            .then(data => {
                if (data.mensagem === 'Compra efetuada com sucesso') {
                    alert('Compra efetuada com sucesso!');
                    carregarLivros(); 
                } else {
                    alert(data.mensagem);
                }
            })
            .catch(error => console.error('Erro:', error));
        }
    }

    //TODO Remover Livro
    function removerLivro(e) 
    {
        const livroId = e.target.dataset.id;

        if (confirm('Tem certeza que deseja remover este livro?')) {
            fetch(`http://localhost:3001/livros/${livroId}`, { 
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (data.mensagem === 'Livro removido com sucesso') {
                    alert('Livro removido com sucesso!');
                    carregarLivros(); // Atualiza a lista de livros
                } else {
                    alert('Erro ao remover livro');
                }
            })
            .catch(error => console.error('Erro:', error));
        }
    }

    // TODO Editar Livro
    function editarLivro(e) 
    {
        const livroId = e.target.dataset.id;

        fetch(`http://localhost:3001/livros/${livroId}`)  
            .then(response => response.json())
            .then(livro => {
                const novoTitulo = prompt('Novo título:', livro.titulo);
                const novoAutor = prompt('Novo autor:', livro.autor);
                const novoGenero = prompt('Novo gênero:', livro.genero);
                const novoEstoque = prompt('Novo estoque:', livro.estoque);

                if (novoTitulo && novoAutor && novoGenero && novoEstoque) {
                    fetch(`http://localhost:3001/livros/${livroId}`, {  
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ titulo: novoTitulo, autor: novoAutor, genero: novoGenero, estoque: parseInt(novoEstoque) })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.mensagem === 'Livro atualizado com sucesso') {
                            alert('Livro atualizado com sucesso!');
                            carregarLivros(); 
                        } else {
                            alert('Erro ao atualizar livro');
                        }
                    })
                    .catch(error => console.error('Erro:', error));
                }
            })
            .catch(error => console.error('Erro:', error));
    }

    //TODO Buscar Livro
    buscarInput.addEventListener('input', function() 
    {
        const query = this.value;
        carregarLivros(query);
    });

    carregarLivros();
});