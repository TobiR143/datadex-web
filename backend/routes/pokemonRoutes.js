import { Router } from "express";
import { PokemonController } from "../controllers/PokemonController.js";

export const pokemonRoutes = Router()

pokemonRoutes.get('/', PokemonController.getAllPokemons)
pokemonRoutes.get('/:id/info', PokemonController.getPokemonInfo)
pokemonRoutes.get('/:id/stats', PokemonController.getPokemonStats)
pokemonRoutes.get('/:id/abilities', PokemonController.getPokemonAbilities)
pokemonRoutes.get('/:id/:game/encounters', PokemonController.getPokemonGameEncounters)
pokemonRoutes.get('/:id/evolution-chain', PokemonController.getPokemonEvolutionChain)
pokemonRoutes.get('/prevNext/:id', PokemonController.getPrevNext)
pokemonRoutes.get('/game/:id/:game', PokemonController.getPokemonGameData)
pokemonRoutes.get('/moves/:id/:game', PokemonController.getPokemonMoves)
pokemonRoutes.get('/data/training/:id', PokemonController.getTraining)
pokemonRoutes.get('/data/breeding/:id', PokemonController.getBreeding)
pokemonRoutes.get('/data/damage-received/:id', PokemonController.getDamageReceivedData)