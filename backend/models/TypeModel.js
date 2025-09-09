import { db } from "../db/db.js"
import { getCache, setCache } from "../cache/cache.js"

export class TypeModel {
    static async getAllTypes() {
        const cacheKey = 'all-types'
        const cached = getCache(cacheKey)
        if (cached) return cached

        const res = await db.execute(`
            SELECT * FROM Type
        `)
        const types = res.rows

        setCache(cacheKey,{ types })

        return { types }
    }
}