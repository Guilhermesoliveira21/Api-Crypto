import { Router } from "express";
import { autentica } from "../middlewares/auth.js";

import CryptoController from "../controllers/CryptoController.js";

const app = Router();

app.use(autentica);

app.post('/:action/buy', CryptoController.buyCypto);
app.get("/:symbol/crypto", CryptoController.crypto);
app.get("/:action/graph", CryptoController.graph);
app.get('/low', CryptoController.cryptoAlta);
app.get("/", CryptoController.cryptoAll);


export default app;