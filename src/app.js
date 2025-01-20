import 'dotenv/config';
import express from 'express';
import cors from 'cors';  
import routes from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

let port = 3000;

app.listen(port, () => {

    console.log(`Servidor rodando na porta: ${port}`)

})