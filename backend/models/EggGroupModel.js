import { db } from "../db/db.js"
import { getCache, setCache } from "../cache/cache.js"

export class EggGroupModel {
    static async getPokemonWhoBelongsEggGroup({ name }) {
        const cacheKey = `${name}-pokemons-by-egg-group`
        const cached = getCache(cacheKey)
        if (cached) return cached

        const res = await db.execute(`
            SELECT
                p.idPokemon, 
                p.name,
                p.img,
                pt.typeName,
                pc.*
            FROM Pokemon_EggGroup peg
            JOIN Pokemon p ON peg.idPokemon = p.idPokemon
            JOIN Pokemon_Type pt ON pt.idPokemon = p.idPokemon
            JOIN Pokemon_Color pc ON pc.idPokemon = p.idPokemon
            WHERE peg.eggGroup = ?
        `, [name])

        const rows = res.rows

        const pokemonMap = new Map()

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
                lightestColor 
            } = row

            if (!pokemonMap.has(idPokemon)) {
                pokemonMap.set(idPokemon, {
                    id: idPokemon,
                    name,
                    img,
                    types: [],
                    colors: {
                        normal: color,
                        lighter: lighterColor,
                        darker: darkerColor,
                        lightest: lightestColor,
                        darkest: darkestColor
                    },
                })
            }
            
            pokemonMap.get(idPokemon).types.push(typeName)
        }

        const pokemons = Array.from(pokemonMap.values())

        setCache(cacheKey,{ pokemons })

        return { pokemons }
    }
}