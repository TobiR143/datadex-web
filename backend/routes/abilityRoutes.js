import { Router } from "express";
import { AbilityController } from '../controllers/AbilityController.js'

export const abilityRoutes = Router()

abilityRoutes.get('/:name', AbilityController.getPokemonWhoHaveAbility)