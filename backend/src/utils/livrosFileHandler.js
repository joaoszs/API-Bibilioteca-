const fs = require('fs');
const path = require('path');

const livrosFilePath = path.join(__dirname, '../../livros.json');

const lerLivros = () => {
  const dados = fs.readFileSync(livrosFilePath, 'utf8');
  return JSON.parse(dados);
};

const escreverLivros = (livros) => {
  fs.writeFileSync(livrosFilePath, JSON.stringify(livros, null, 2));
};

module.exports = {
  lerLivros,
  escreverLivros
};