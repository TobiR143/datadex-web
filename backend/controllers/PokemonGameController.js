import { PokemonGameModel } from '../models/PokemonGameModel.js'
import { romanToInt } from '../logic/romanToInt.js' 

export class PokemonGameController {
    static async getAllGamesForPokemon(req, res) {
        const { id } = req.params

        const { games } = await PokemonGameModel.getAllGamesForPokemon({ id })

        const sortedEntries = Object.entries(games).sort(([genA], [genB]) => {
            const romanA = genA.split("-")[1].toUpperCase()
            const romanB = genB.split("-")[1].toUpperCase()
            return romanToInt(romanA) - romanToInt(romanB)
        })

        const sortedData = Object.fromEntries(sortedEntries)

        res.json(sortedData)
    }
}