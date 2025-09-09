import { TypeModel } from "../models/TypeModel.js"
import { getTypeColor } from "../logic/getTypeColor.js"

export class TypeController {
    static async getAllTypes(req, res) {
        const { types } = await TypeModel.getAllTypes()
        
        for (const type of types) {
            const color = getTypeColor(type.name)
            type.color = color
        }

        res.json(types)
    }
}