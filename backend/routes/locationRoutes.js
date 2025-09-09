import { Router } from "express";
import { LocationController } from "../controllers/LocationController.js";

export const locationRoutes = Router()

locationRoutes.get('/:id/:versionGroup', LocationController.getPokemonWhoAppearsOnLocation)