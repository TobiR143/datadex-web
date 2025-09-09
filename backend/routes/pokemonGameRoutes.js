import Router from 'express'
import { PokemonGameController } from '../controllers/PokemonGameController.js'

export const pokemonGameRoutes = Router()

pokemonGameRoutes.get('/:id', PokemonGameController.getAllGamesForPokemon)