import { Router } from "express";
import { autentica } from "../middlewares/auth.js";

const app = Router();

app.use(autentica);

app.get("/", function(req,res) {res.status(200).json({message: 'Teststtstst'})});

export default app;