import { db } from "../db/db.js"
import { getCache, setCache } from "../cache/cache.js"

export class AbilityModel {
    static async getPokemonWhoHaveAbility({ name }) {
        const cacheKey = `${name}-pokemons-by-ability-all`
        const cached = getCache(cacheKey)
        if (cached) return cached

        const res = await db.execute(`
                SELECT 
                    p.idPokemon,
                    p.name,
                    p.img,
                    pt.typeName,
                    pa.isHidden,
                    pc.*
                FROM PokemonAbility pa
                JOIN Pokemon p ON p.idPokemon = pa.idPokemon
                JOIN Pokemon_Type pt ON pt.idPokemon = p.idPokemon
                JOIN Pokemon_Color pc ON pc.idPokemon = p.idPokemon
                WHERE pa.name = ?
            `, [name])
    
            const rows = res.rows
    
            const pokemonMap = {
                hidden: new Map(),
                normal: new Map()
            }
    
            for (const row of rows) {
                const { 
                    idPokemon, 
                    name, 
                    img,
                    typeName, 
                    isHidden,
                    color,
                    darkerColor,
                    darkestColor,
                    lighterColor,
                    lightestColor 
                } = row

                const abilityGroup = isHidden ? 'hidden' : 'normal'

                if (!pokemonMap[abilityGroup].has(idPokemon)) {
                    pokemonMap[abilityGroup].set(idPokemon, {
                        id: idPokemon,
                        name,
                        img,
                        types: [],
                        colors: {
                            normal: color,
                            darker: darkerColor,
                            darkest: darkestColor,
                            lighter: lighterColor,
                            lightest: lightestColor
                        }
                    })
                }
    
                pokemonMap[abilityGroup].get(idPokemon).types.push(typeName)
            }
    
            const pokemons = {
                hidden: Array.from(pokemonMap.hidden.values()),
                normal: Array.from(pokemonMap.normal.values())
            }

            setCache(cacheKey,{ pokemons })

            return { pokemons }
    }        
}