import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js'

db.on('error', console.log.bind(console, 'Erro de conexão'))
db.once('open', () => {
    console.log('Conexão com o banco feita com sucesso.')
});

const app = express();

// Recurso do express para interpretar o que está chegando via POST ou PUT como JSON
app.use(express.json());

// Rotas
routes(app);

export default app;