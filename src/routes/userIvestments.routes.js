import { Router } from "express";
import userinvestment from '../controllers/UserInvestmentController.js';

const app = Router();



app.get("/:action", userinvestment.myActionUnique);
app.post("/:action/buy", userinvestment.buyAction);
app.get("/", userinvestment.myInvestments);

export default app;