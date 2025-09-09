import { LackParametersError } from "../exceptions/LackParametersError.js"
import { NotFoundError } from "../exceptions/NotFoundError.js"
import { LocationModel } from "../models/LocationModel.js"

export class LocationController {
    static async getPokemonWhoAppearsOnLocation(req, res) {
        const { id, versionGroup } = req.params

        try {
            const pokemons = await LocationModel.getPokemonWhoAppearsOnLocation({ id, versionGroup })
            res.json(pokemons)
        } catch (err) {
            if (err instanceof NotFoundError) {
                res.status(404).json({ error: err.message })
            } else if (err instanceof LackParametersError) {
                res.status(400).json({ error: err.message })
            } else {
                res.status(500).json({ error: "Server internal error" })
            }
        }
    }
}