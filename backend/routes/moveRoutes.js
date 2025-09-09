import { Router } from "express";
import { MoveController } from "../controllers/MoveController.js";

export const moveRoutes = Router()

moveRoutes.get('/:id', MoveController.getPokemonWhoLearnMove)

