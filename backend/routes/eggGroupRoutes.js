import { Router } from "express";
import { EggGroupController } from "../controllers/EggGroupController.js";

export const eggGroupRoutes = Router()

eggGroupRoutes.get('/:name', EggGroupController.getPokemonWhoBelongEggGroup)