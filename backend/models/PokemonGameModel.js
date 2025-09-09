import { db } from '../db/db.js';
import { getCache, setCache } from "../cache/cache.js"

export class PokemonGameModel {
    static async getAllGamesForPokemon({ id }) {
        const cacheKey = `${id}-all-games`
        const cached = getCache(cacheKey)
        if (cached) return cached

        const result = await db.execute(`
            SELECT 
                pg.game AS game, 
                g.generation AS generation, 
                vg.name AS versionGroup,
                g.color AS color
            FROM Pokemon_Game pg
            JOIN Game g ON pg.game = g.name
            JOIN VersionGroup vg ON vg.id = g.versionGroupId
            WHERE pg.idPokemon = ?
        `, [id])

        const rows = result.rows

        const games = {}

        for (const row of rows) {
            games[row.generation] = [...games[row.generation] || [], {
                game: row.game,
                versionGroup: row.versionGroup,
                color: row.color
            }]
        }

        setCache(cacheKey,{ games })

        return { games }
    }
}