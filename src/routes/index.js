import { Router } from "express";
import user from "./user.routes.js";
import action from './actions.routes.js';
import userInvestment from './userIvestments.routes.js';
import crypto from './crypto.routes.js'
import { autentica } from "../middlewares/auth.js";

const app = new Router();

app.use('/user', user);
// app.use('/dashboard', dashboard);
app.use('/action', action);
app.use('/investment', autentica, userInvestment);
app.use('/crypto', crypto);

export default app;
