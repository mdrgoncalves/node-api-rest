<h1 align="center">
    Node.js: API Rest com Express e MongoDB
</h1>

<p align="center">
 • <a href="#-about">Sobre</a> 
 • <a href="#-tech-stack">Conteúdo Estudado</a>  
</p>

# 💻 Sobre

API Restful com Express e MongoDB - Projeto para estudo de APIs.

---

# 🛠 Conteúdo Estudado

# Criação de servidor local padrão

Em um arquivo server.js, importar o módulo de protocolo http, definir uma porta e realizar a requisição através do módulo importado.

```js
const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Olá Mundo!');
});

server.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});
```

# Definindo rotas

Para criar rotas no servidor, defina-se em uma variável.

```js
const http = require('http');
const port = 3000;

const rotas = {
    '/': 'Curso de Note',
    '/livros': 'Entrei na pag de livros',
    '/autores': 'Listagem de autores',
    '/editora': 'Pag de Editora'
}

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end(rotas[req.url]);
});
```

Como o servidor não tem uma característica de hot reload, usa-se a lib NODEMON para dar essa característica a ele.

# Express

Um dos frameworks de Node.js mais utilizados do mercado.
Para começar a utilizar o express é necessário fazer sua instalação via NPM e importá-la no projeto. Após isso já é possível usar suas requisições.

```js
import express from 'express';

const app = express();

const livros = [
    {id: 1, 'titulo': 'Senhor dos Aneis'},
    {id: 2, 'titulo': 'O Hobbit'},
];

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node');
});

app.get('/livros', (req, res) => {
    res.status(200).json(livros);
});

export default app;
```

Há também mudança no código do server para albergar as mudanças no servidor.

```js
import app from './src/app.js';

const port = process.env.PORT || 3000; //Porta do ambiente de produção ou 3000

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});
```

# Postman

É uma ferramenta para testar requisições HTTP. É possível criar uma conta e salvar as requisições para serem reutilizadas.
Com ela foi possível realizar de forma dinâmica a requisição de POST para adicionar um novo item a uma lista pré-definida. 

# CRUD

CRUD é um acrônimo para as quatro operações básicas utilizadas em bases de dados relacionais ou em programação: Create (criar), Retrieve (recuperar), Update (atualizar) e Delete (deletar).

```js
// Recurso do express para interpretar o que está chegando via POST ou PUT como JSON
app.use(express.json());

const livros = [
    {id: 1, 'titulo': 'Senhor dos Aneis'},
    {id: 2, 'titulo': 'O Hobbit'},
];

// Recuperar
app.get('/', (req, res) => {
    res.status(200).send('Curso de Node');
});

app.get('/livros', (req, res) => {
    res.status(200).json(livros);
});

app.get('/livros/:id', (req, res) => {
    let index = buscaLivro(req.params.id); //ID vindo no parâmetro da requisição
    res.json(livros[index]);
});

// Criar
app.post('/livros', (req, res) => {
    // Adiciona no array o que vem no corpo da requisição
    livros.push(req.body);
    res.status(201).send('Livro foi cadastrado com sucesso')
});

// Atualização
app.put('/livros/:id', (req, res) => {
    let index = buscaLivro(req.params.id); //ID vindo no parâmetro da requisição
    livros[index].titulo = req.body.titulo;
    res.json(livros);
});

function buscaLivro(id) {
    return livros.findIndex(livro => livro.id == id);
}

// Delete
app.delete('/livros/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaLivro(req.id); //ID vindo no parâmetro da requisição
    livros.splice(index, 1);
    res.json(livros);
});
```

# MongoDB

É um banco de dados NoSQL orientado a documentos. Necessário para persistir dados.

# Mongoose

É uma biblioteca que permite a conexão do Node.js com o MongoDB. É necessário fazer a instalação do mongoose e importá-lo no projeto.

```js
import mongoose from "mongoose";

mongoose.connect('mongodb+srv://onlink:admin@cluster0.yauk4rs.mongodb.net/alura-node');

let db = mongoose.connection;

export default db;
```

# Schema

É uma estrutura que define como os dados serão armazenados no banco de dados. É necessário fazer a importação do mongoose e criar um schema.

```js
import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
    {
        id: {type: String},
        titulo: {type: String, required: true},
        autor: {type: String, required: true},
        editora: {type: String, required: true},
        numeroPaginas: {type: Number}
    }
);

const livros = mongoose.model('livros', livroSchema);

export default livros;
```

# Roteamento Express

É uma forma de organizar o código de rotas do express. É necessário fazer a importação do express e criar um router.

```js
import express from 'express';
import LivroController from '../controllers/livrosController.js';

const router = express.Router();

router
    .get("/", LivroController.listarLivros)

export default router;
```