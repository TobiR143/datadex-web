import { EggGroupModel } from '../models/EggGroupModel.js' 

export class EggGroupController {
    static async getPokemonWhoBelongEggGroup(req, res) {
        const { name } = req.params

        const { pokemons } = await EggGroupModel.getPokemonWhoBelongsEggGroup({ name })

        res.json(pokemons)
    }
}