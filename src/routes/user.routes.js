import { Router } from "express";
import UserControllers from "../controllers/UserControllers.js";
import AuthControllers from "../controllers/AuthControllers.js";

const app = Router();


app.post("/register", UserControllers.create);
app.post("/login", AuthControllers.login);

export default app;