import { Router } from "express"
import { TypeController } from "../controllers/TypeController.js"

export const typeRoutes = Router()

typeRoutes.get('/', TypeController.getAllTypes)