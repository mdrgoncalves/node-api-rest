import app from './src/app.js';

const port = process.env.PORT || 3000; //Porta do ambiente de produção ou 3000

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});