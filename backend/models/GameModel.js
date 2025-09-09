import { db } from '../db/db.js'
import { setCache, getCache } from "../cache/cache.js"

export class GameModel {
    static async getGames() {
        const cacheKey = 'games-all'
        const cached = getCache(cacheKey)
        if (cached) return cached

        const res = await db.execute(`SELECT name FROM Game`)
        const games = res.rows

        setCache(cacheKey,{ games })
        return { games }
    }

    static async getGamesByGen({ gen }) {
        const cacheKey = `${gen}-games`
        const cached = getCache(cacheKey)
        if (cached) return cached

        const res = await db.execute(`SELECT name FROM Game WHERE generation = ?`, [gen])
        const games = res.rows

        const result = { 
            [gen]: games.map(game => game.name) 
        }

        setCache(cacheKey,result)

        return result
    }

    static async getGamesForGen() {
        const cacheKey = 'games-by-gen-all'
        const cached = getCache(cacheKey)
        if (cached) return cached

        const res = await db.execute(`SELECT name FROM Generation`)
        const gens = res.rows

        const promises = gens.map(async (gen) => {
            const games = await this.getGamesByGen({ gen: gen.name })
            return games
        })

        const gamesByGen = await Promise.all(promises)

        setCache(cacheKey,{ gamesByGen })

        return { gamesByGen }
    }
}