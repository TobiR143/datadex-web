import { GenerationModel } from '../models/GenerationModel.js'
import { romanToInt } from '../logic/romanToInt.js'

export class GenerationController {
    static async getGenerations(req, res) {
        const { generations } = await GenerationModel.getGenerations()

        const transformed = generations.sort((a,b) => {
            const romanA = a.name.split('-')[1].toUpperCase()
            const romanB = b.name.split('-')[1].toUpperCase()
            return romanToInt(romanA) - romanToInt(romanB)
        })

        res.json(transformed)
    }
}