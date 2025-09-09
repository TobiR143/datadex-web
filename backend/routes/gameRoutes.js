import { Router } from "express";
import { GameController } from "../controllers/GameController.js";

export const gameRoutes = Router()

gameRoutes.get('/', GameController.getGames)
gameRoutes.get('/by-gen/:gen', GameController.getGamesByGen)
gameRoutes.get('/all', GameController.getGamesForGen)