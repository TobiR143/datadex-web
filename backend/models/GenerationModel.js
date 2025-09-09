import { db } from "../db/db.js"
import { getCache, setCache } from "../cache/cache.js"

export class GenerationModel {
    static async getGenerations() {
        const cacheKey = 'all-generations'
        const cached = getCache(cacheKey)
        if (cached) return cached

        const res = await db.execute(`SELECT * FROM Generation`)
        const generations = res.rows

        setCache(cacheKey,{ generations })
        return { generations }
    }
}