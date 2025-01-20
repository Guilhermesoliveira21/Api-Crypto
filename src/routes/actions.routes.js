import { Router } from "express";
import InvestmentController from "../controllers/ActionsController.js";

const app = Router();


app.get("/:action", InvestmentController.actionUnique);
app.get("/actions", InvestmentController.actionAll);
app.get("/history", InvestmentController.actionHistory);

export default app;