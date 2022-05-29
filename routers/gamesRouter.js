import { Router } from "express";
import { getAllGames, postGame } from "../controllers/gamesController.js";
import { validGame } from "../middwares/validGameMiddware.js";

const gamesRouter = Router();

gamesRouter.get("/games", getAllGames);
gamesRouter.post("/games", validGame, postGame);

export default gamesRouter;