import { Router } from "express";
import { GenerationController } from "../controllers/GenerationController.js";

export const generationRoutes = Router()

generationRoutes.get('/', GenerationController.getGenerations)