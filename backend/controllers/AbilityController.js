import { AbilityModel } from '../models/AbilityModel.js'

export class AbilityController {
    static async getPokemonWhoHaveAbility(req, res) {
        const { name } = req.params

        const { pokemons } = await AbilityModel.getPokemonWhoHaveAbility({ name })
        
        res.json(pokemons)
    }
}