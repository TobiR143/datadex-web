import { db } from "../db/db.js";
import { getCache, setCache } from "../cache/cache.js"
import { NotFoundError } from "../exceptions/NotFoundError.js"

export class MoveModel {
    static async getPokemonWhoLearnMove({ id }) {
        const cacheKey = `${id}-pokemons-by-move`
        const cached = getCache(cacheKey)
        if (cached) return cached

        const resMove = await db.execute(`
            SELECT name FROM Move WHERE idMove = ?
        `,[id])

        const rowsMove = resMove.rows
        if (rowsMove.length === 0) throw new NotFoundError(`Move with id=${id} does not exist`)

        const res = await db.execute(`
            SELECT DISTINCT
                p.idPokemon,
                p.name,
                p.img,
                pt.typeName,
                pc.*,
                pgml.learnType
            FROM Pokemon_Game_Move_LearnType pgml
            JOIN Pokemon_Game pg ON pgml.idPokemonGame = pg.id
            JOIN Pokemon p ON pg.idPokemon = p.idPokemon
            JOIN Pokemon_Type pt ON pt.idPokemon = p.idPokemon
            JOIN Pokemon_Color pc ON pc.idPokemon = p.idPokemon
            WHERE pgml.idMove = ?
            ORDER BY p.idPokemon
        `, [id])

        const rows = res.rows
        if (rows.length === 0) throw new NotFoundError(`There are not any pokemon who learn move with id=${id}`)

        const grouped = {
            'level-up': new Map(),
            'tutor': new Map(),
            'machine': new Map(),
            'egg': new Map()
        }

        for (const row of rows) {
            const { 
                idPokemon, 
                name, 
                img, 
                typeName, 
                color,
                darkerColor,
                darkestColor,
                lighterColor,
                lightestColor,
                learnType
            } = row

            const group = grouped[learnType]
            if (!group) continue

            if (!group.has(idPokemon)) {
                group.set(idPokemon, {
                    id: idPokemon,
                    name,
                    img,
                    colors: {
                        normal: color,
                        darker: darkerColor,
                        darkest: darkestColor,
                        lighter: lighterColor,
                        lightest: lightestColor
                    },
                    types: [typeName]
                })
            } else {
                const existing = group.get(idPokemon)
                if (!existing.types.includes(typeName)) {
                    existing.types.push(typeName)
                }
            }
        }

        const result = {
            move: {
                id,
                name: rowsMove[0].name
            },
            pokemons: {
                'level-up': Array.from(grouped['level-up'].values()),
                'tutor': Array.from(grouped['tutor'].values()),
                'machine': Array.from(grouped['machine'].values()),
                'egg': Array.from(grouped['egg'].values())
            }
        }

        setCache(cacheKey,result)

        return result
    }
}