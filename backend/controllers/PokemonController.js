import { PokemonModel } from "../models/PokemonModel.js";
import { NotFoundError } from "../exceptions/NotFoundError.js"

export class PokemonController {
    static async getPokemonInfo(req,res) {
        const { id } = req.params

        try {
            const pokemon = await PokemonModel.getPokemonInfo({ id })
            res.json(pokemon)
        } catch (err) {
            if (err instanceof NotFoundError) {
                res.status(err.status).json({ error: err.message })
            } else {
                res.status(500).json({ message: "Internal server error" })
            }
        }


    }

    static async getPokemonStats(req,res) {
        const { id } = req.params

        const stats = await PokemonModel.getPokemonStats({ id })

        res.json(stats)
    }

    static async getPokemonAbilities(req,res) {
        const { id } = req.params

        const abilities = await PokemonModel.getPokemonAbilities({ id })

        res.json(abilities)
    }

    static async getPokemonEvolutionChain(req, res) {
        const { id } = req.params

        const evolutionChain = await PokemonModel.getPokemonEvolutionChain({ id })

        res.json(evolutionChain)
    }

    static async getPokemonGameEncounters(req, res) {
        const { id, game } = req.params

        const encounters = await PokemonModel.getPokemonGameEncounters({ id, game })

        res.json(encounters)
    }

    static async getPokemonGameData(req, res) {
        const { id, game } = req.params

        const { pokemonGameData } = await PokemonModel.getPokemonGameData({ id, game })

        res.json(pokemonGameData)
    }

    static async getPokemonMoves(req, res) {
        const { id, game } = req.params

        const { moves } = await PokemonModel.getPokemonMoves({ id, game })

        res.json(moves)
    }

    static async getAllPokemons(req, res) {
        const { limit, offset, generation, type } = req.query
        const { pokemons, hasMore } = await PokemonModel.getAllPokemons({ limit, offset, generation, type})
        
        res.json({ pokemons, hasMore })
    }

    static async getTraining(req,res) {
        const { id } = req.params

        const training = await PokemonModel.getTraining({ id })

        res.json(training)
    }

    static async getBreeding(req,res) {
        const { id } = req.params

        const breeding = await PokemonModel.getBreeding({ id })

        res.json(breeding)
    }

    static async getDamageReceivedData(req,res) {
        const { id } = req.params

        const damageReceived = await PokemonModel.getDamageReceivedData({ id })

        res.json(damageReceived)
    }

    static async getPrevNext(req, res) {
        const { id } = req.params

        const { previous, next } = await PokemonModel.getPrevNextPokemon({ id })

        res.json({ previous, next })
    }
}