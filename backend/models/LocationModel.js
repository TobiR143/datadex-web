import { db } from "../db/db.js";
import { NotFoundError } from "../exceptions/NotFoundError.js"
import { LackParametersError } from "../exceptions/LackParametersError.js";
import { getCache, setCache } from "../cache/cache.js"

export class LocationModel {
    static async getPokemonWhoAppearsOnLocation({ id, versionGroup }) {
        if (!id || !versionGroup) {
            throw new LackParametersError("There is a lack of parameters: id & versionGroup")
        }

        const cacheKey = `${id}-${versionGroup}-pokemons-by-location`
        const cached = await getCache(cacheKey)
        if (cached) return cached

        const res = await db.execute(`
            SELECT
                p.idPokemon AS idPokemon,
                p.name AS pokemonName,
                p.img AS pokemonImg,
                pgl.minLevel AS minLevel,
                pgl.maxLevel AS maxLevel,
                pgl.chance AS chance,
                cv.name AS conditionValue,
                em.name AS encounterMethod,
                pt.typeName AS type,
                l.name AS locationName,
                g.name AS gameName,
                pc.color,
                pc.darkestColor,
                pc.darkerColor,
                pc.lightestColor,
                pc.lighterColor
            FROM Pokemon_Game_Location pgl
            JOIN Location l ON l.id = pgl.idLocation
            JOIN ConditionValue cv ON cv.id = pgl.idConditionValue
            JOIN EncounterMethod em ON em.id = pgl.idEncounterMethod
            JOIN Pokemon_Game pg ON pg.id = pgl.idPokemonGame
            JOIN Game g ON g.name = pg.game
            JOIN VersionGroup vg ON vg.id = g.versionGroupId
            JOIN Pokemon p ON p.idPokemon = pg.idPokemon
            JOIN Pokemon_Color pc ON pc.idPokemon = p.idPokemon
            JOIN Pokemon_Type pt ON pt.idPokemon = p.idPokemon
            WHERE pgl.idLocation = ? AND vg.name = ?
            `, [id, versionGroup])
            
            const rows = res.rows
            
            if (rows.length === 0) {
                throw new NotFoundError(`There are not any pokemons for locationId=${id} and versionGroup='${versionGroup}'`)
            }

            const pokemons = {}
            
            for (const row of rows) {
                const {
                    idPokemon,
                    pokemonImg,
                    pokemonName,
                    conditionValue,
                    encounterMethod,
                    minLevel,
                    maxLevel,
                    chance,
                    type,
                    color,
                    darkestColor,
                    darkerColor,
                    lightestColor,
                    lighterColor,
                    gameName
                    } = row
                    
                    pokemons[encounterMethod] ??= {}
                    pokemons[encounterMethod][conditionValue] ??= []
                    
            let existing = pokemons[encounterMethod][conditionValue].find(
                (p) => p.id === idPokemon
            )

            if (!existing) {
                existing = {
                    id: idPokemon,
                    name: pokemonName,
                    img: pokemonImg,
                    colors: {
                        normal: color,
                        darker: darkerColor,
                        darkest: darkestColor,
                        lighter: lighterColor,
                        lightest: lightestColor
                    },
                    types: [],
                    games: [],
                    minLevel,
                    maxLevel,
                    chance
                }
                pokemons[encounterMethod][conditionValue].push(existing)
            }
            
            if (!existing.types.includes(type)) {
                existing.types.push(type)
            }
            
            if (!existing.games.includes(gameName)) {
                existing.games.push(gameName)
            }
        }

        const uniquePokemonIds = new Set()
        
        Object.values(pokemons).forEach(groups => {
            Object.values(groups).forEach(pokemonsArray => {
                pokemonsArray.forEach(pokemon => uniquePokemonIds.add(pokemon.id))
            })
        })

        const totalUniquePokemons = uniquePokemonIds.size
        const result = {
            pokemonCount: totalUniquePokemons,
            location: rows[0]?.locationName ?? null,
            pokemons
        }

        setCache(cacheKey,result)

        return result
    }
}