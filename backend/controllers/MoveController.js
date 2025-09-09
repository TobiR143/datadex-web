import { NotFoundError } from "../exceptions/NotFoundError.js"
import { MoveModel } from "../models/MoveModel.js"

export class MoveController {
    static async getPokemonWhoLearnMove(req, res) {
        const { id } = req.params
        
        try {
            const { pokemons, move } = await MoveModel.getPokemonWhoLearnMove({ id })
            res.json({ pokemons, move })
        } catch(err) {
            if (err instanceof NotFoundError) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: "Internal server error" })
            }
        }
    }
}