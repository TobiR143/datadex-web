import { db } from "../db/db.js"
import { buildEvolutionMethod } from "../logic/buildEvolutionMethod.js"
import { getPercentage } from "../logic/getPercentage.js"
import { getDamageReceived } from "../logic/getDamageReceived.js"
import { getStatRange } from "../logic/getStatRange.js"
import { getTypeColor } from "../logic/getTypeColor.js"
import { formatHeight } from "../logic/formatHeight.js"
import { formatWeight } from "../logic/formatWeight.js"
import { buildEvolutionChains } from "../logic/buildEvolutionChains.js"
import { getTypeColorScheme } from "../logic/getTypeColorScheme.js"
import { getCache, setCache } from "../cache/cache.js"
import { NotFoundError } from "../exceptions/NotFoundError.js"

export class PokemonModel {
    static async getPokemonInfo({ id }) {
        const cacheKey = `${id}-info`
        const cached = getCache(cacheKey)
        if (cached) return cached

        const res = await db.execute(`
            SELECT 
                p.idPokemon,
                p.name,
                p.cry,
                p.height,
                p.weight,
                p.img,
                p.genus,
                pc.*,
                pt.typeName
            FROM Pokemon p
            JOIN Pokemon_Color pc ON p.idPokemon = pc.idPokemon
            JOIN Pokemon_Type pt ON p.idPokemon = pt.idPokemon
            WHERE p.idPokemon = ?
        `, [id])

        if (res.rows.length === 0) {
            throw new NotFoundError("Pokemon not found")
        }

        const firstRow = res.rows[0]

        const pokemon = {
            id: firstRow.idPokemon,
            genus: firstRow.genus,
            name: firstRow.name,
            img: firstRow.img,
            cry: firstRow.cry,
            height: formatHeight(firstRow.height),
            weight: formatWeight(firstRow.weight),
            colors: {
                normal: firstRow.color,
                lighter: firstRow.lighterColor,
                darker: firstRow.darkerColor,
                lightest: firstRow.lightestColor,
                darkest: firstRow.darkestColor
            },
            types: []
        }

        const typesSet = new Set()
        for (const row of res.rows) {
            if (!typesSet.has(row.typeName)) {
                pokemon.types.push(row.typeName)
                typesSet.add(row.typeName)
            }
        }

        setCache(cacheKey,pokemon)

        return pokemon
    }

    static async getPokemonStats({ id }) {
        const cacheKey = `${id}-stats`
        const cached = getCache(cacheKey)
        if (cached) return cached

        const res = await db.execute(`
            SELECT 
                bs.stat,
                bs.baseValue
            FROM BaseStat bs
            WHERE bs.idPokemon = ?
        `, [id])

        if (res.rows.length === 0) return { values: [], baseTotal: 0 }

        const stats = { values: [], baseTotal: 0 }
        const statsSet = new Set()

        for (const { stat, baseValue } of res.rows) {
            if (!statsSet.has(stat)) {
                const { minValue, maxValue } = getStatRange({ baseStat: baseValue, statName: stat })
                stats.values.push({
                    stat: stat.replace('-', ' ').replace('special', 'sp.'),
                    baseValue,
                    minValue,
                    maxValue
                })
                statsSet.add(stat)
                stats.baseTotal += baseValue
            }
        }

        setCache(cacheKey, stats)

        return stats
    }

    static async getPokemonAbilities({ id }) {
        const cacheKey = `${id}-abilities`
        const cached = getCache(cacheKey)
        if (cached) return cached

        const res = await db.execute(`
            SELECT 
                pa.name AS abilityName,
                a.description AS abilityDescription,
                a.effect AS abilityEffect,
                a.depthEffect AS abilityDepthEffect,
                pa.isHidden
            FROM PokemonAbility pa
            JOIN Ability a ON a.name = pa.name
            WHERE pa.idPokemon = ?
        `, [id])

        if (res.rows.length === 0) return { normal: [], hidden: [] }

        const abilities = { normal: [], hidden: [] }
        const abilitiesSet = new Set()

        for (const { abilityName, abilityDescription, abilityEffect, abilityDepthEffect, isHidden } of res.rows) {
            if (!abilitiesSet.has(abilityName)) {
                const ability = {
                    name: abilityName,
                    description: abilityDescription,
                    effect: abilityEffect,
                    depthEffect: abilityDepthEffect
                }
                if (isHidden) {
                    abilities.hidden.push(ability)
                } else {
                    abilities.normal.push(ability)
                }
                abilitiesSet.add(abilityName)
            }
        }

        setCache(cacheKey,abilities)

        return abilities
    }

    static async getPokemonEvolutionChain({ id }) {
        const cacheKey = `${id}-evolution-chain`
        const cached = getCache(cacheKey)
        if (cached) return cached

        const evoRes = await db.execute(`
            SELECT
                p_from.idPokemon AS fromId,
                p_from.name AS fromPokemon,
                p_from.img AS fromImg,
                pt_from.typeName AS fromType,

                p_to.idPokemon AS toId,
                p_to.name AS toPokemon,
                p_to.img AS toImg,
                pt_to.typeName AS toType,

                pc_from.color AS fromColor,
                pc_from.darkerColor AS fromDarker,
                pc_from.darkestColor AS fromDarkest,
                pc_from.lighterColor AS fromLighter,
                pc_from.lightestColor AS fromLightest,

                pc_to.color AS toColor,
                pc_to.darkerColor AS toDarker,
                pc_to.darkestColor AS toDarkest,
                pc_to.lighterColor AS toLighter,
                pc_to.lightestColor AS toLightest,

                e.evolutionTrigger,
                e.minLevel,
                e.minHappiness,
                e.timeOfDay,
                e.isTrade,

                CASE 
                    WHEN e.gender = 1 THEN 'female'
                    WHEN e.gender = 2 THEN 'male'
                    ELSE NULL
                END AS gender,

                ei.name AS heldItem,
                ei2.name AS item,
                m.name AS move,
                l.name AS location
            FROM Evolution e
            JOIN Pokemon p_from ON p_from.idPokemon = e.fromPokemonId
            JOIN Pokemon p_to ON p_to.idPokemon = e.toPokemonId

            JOIN Pokemon_Color pc_from ON p_from.idPokemon = pc_from.idPokemon
            JOIN Pokemon_Color pc_to ON p_to.idPokemon = pc_to.idPokemon

            LEFT JOIN Pokemon_Type pt_from ON pt_from.idPokemon = p_from.idPokemon
            LEFT JOIN Pokemon_Type pt_to ON pt_to.idPokemon = p_to.idPokemon

            LEFT JOIN Move m ON e.needsMoveId = m.idMove
            LEFT JOIN EvolutionItem ei ON e.heldItemId = ei.id
            LEFT JOIN EvolutionItem ei2 ON e.itemId = ei2.id
            LEFT JOIN Location l ON l.id = e.locationId

            WHERE e.evolutionChainRootId = (
                SELECT evolutionChainRootId
                FROM Evolution
                WHERE fromPokemonId = ?
                OR toPokemonId = ?
                LIMIT 1
            )
        `, [id, id])

        const evoMap = new Map()

        for (const row of evoRes.rows) {
            const key = `${row.fromId}-${row.toId}`

            if (!evoMap.has(key)) {
                evoMap.set(key, {
                    from: {
                        id: row.fromId,
                        name: row.fromPokemon,
                        img: row.fromImg,
                        types: row.fromType ? [row.fromType] : [],
                        colors: {
                            normal: row.fromColor,
                            darker: row.fromDarker,
                            darkest: row.fromDarkest,
                            lighter: row.fromLighter,
                            lightest: row.fromLightest
                        }
                    },
                    to: {
                        id: row.toId,
                        name: row.toPokemon,
                        img: row.toImg,
                        types: row.toType ? [row.toType] : [],
                        colors: {
                            normal: row.toColor,
                            darker: row.toDarker,
                            darkest: row.toDarkest,
                            lighter: row.toLighter,
                            lightest: row.toLightest
                        }
                    },
                    method: buildEvolutionMethod(row)
                })
            } else {
                const evo = evoMap.get(key)
                if (row.fromType && !evo.from.types.includes(row.fromType)) {
                    evo.from.types.push(row.fromType)
                }
                if (row.toType && !evo.to.types.includes(row.toType)) {
                    evo.to.types.push(row.toType)
                }
            }
        }

        const values = Array.from(evoMap.values())
        const result = buildEvolutionChains(values)

        setCache(cacheKey,result)

        return result
    }

    static async getPokemonGameEncounters({ id, game }) {
        const cacheKey = `${id}-${game}-encounters`
        const cached = getCache(cacheKey)
        if (cached) return cached
        
        const res = await db.execute(`
            SELECT
                l.*
            FROM Pokemon_Game pg
            JOIN Pokemon_Game_Location pgl ON pgl.idPokemonGame = pg.id
            JOIN Location l ON l.id = pgl.idLocation
            WHERE pg.idPokemon = ? AND pg.game = ?
        `, [id, game])

        const rows = res.rows

        const encounters = []
        const encountersSet = new Set()
    
        for (const row of rows) {
            const {
                id,
                name
            } = row

            if (!encountersSet.has(id)) {
                encountersSet.add(id)
                
                encounters.push({
                    id,
                    name
                })
            }
        }

        setCache(cacheKey,encounters)

        return encounters
    }

    static async getPokemonGameData({ id, game }) {
        const cacheKey = `${id}-${game}-data`
        const cached = getCache(cacheKey)
        if (cached) return cached
        
        const res = await db.execute(`
            SELECT 
                pg.sprite as sprite, 
                pg.spriteShiny AS spriteShiny, 
                pg.description AS description
            FROM Pokemon_Game pg
            WHERE pg.idPokemon = ? AND pg.game = ?
        `, [id, game])
        const rows = res.rows

        const pokemonGameData = {
            description: rows[0].description,
            sprite: rows[0].sprite,
            spriteShiny: rows[0].spriteShiny || null,
        }

        setCache(cacheKey,{ pokemonGameData })

        return { pokemonGameData }
    }

    static async getPokemonMoves({ id, game }) {
        const cacheKey = `${id}-${game}-moves`
        const cached = getCache(cacheKey)
        if (cached) return cached

        const res = await db.execute(`
            SELECT
                m.idMove, 
                m.name AS moveName,
                m.description AS moveDescription,
                m.effect AS moveEffect,
                m.power AS movePower,
                m.accuracy AS moveAccuracy,
                m.category AS moveCategory,
                m.type AS moveType,
                m.pp AS movePP,
                pgml.learnType AS learnType,
                ll.level AS level,
                mgm.mt
            FROM Pokemon_Game pg
            JOIN Pokemon_Game_Move_LearnType pgml ON pgml.idPokemonGame = pg.id
            JOIN Move m ON m.idMove = pgml.idMove
            LEFT JOIN LearnLevel ll ON ll.idPokemonGameMoveLearnType = pgml.id
            LEFT JOIN MT_Game_Move mgm ON mgm.idMove = m.idMove
            WHERE pg.idPokemon = ? AND pg.game = ?
            ORDER BY ll.level ASC
        `, [id, game])
        const rows = res.rows

        const moves = {
                'level-up': [],
                'egg': [],
                'tutor': [],
                'machine': []
        }

        const movesSet = new Set()

        for (const row of rows) {
            const { idMove, learnType } = row

            if (!movesSet.has(idMove)) {
                movesSet.add(idMove)

                const { moveName, moveAccuracy, movePP, moveDescription, moveCategory, movePower, moveType, moveEffect } = row
                
                const move = {
                    idMove,
                    name: moveName,
                    accuracy: moveAccuracy,
                    pp: movePP,
                    description: moveDescription,
                    effect: moveEffect,
                    category: moveCategory,
                    power: movePower,
                    type: { 
                        name: moveType, 
                        colors: getTypeColorScheme(moveType) 
                    }
                }

                if (learnType === 'level-up') {
                    const { level } = row
                    moves[learnType].push({ move, level })
                } else if (learnType === 'machine') {
                    const { mt } = row
                    moves[learnType].push({ move, mt })
                } else {
                    moves[learnType].push({ move })
                }
            }
        }

        const result = { moves }
        setCache(cacheKey, result)

        return result
    }

    static async getAllPokemons({ limit = 20, offset = 0, generation, type }) {
        const cacheKey = `${limit}-${offset}-${generation}-${type}-pokemons`
        const cached = getCache(cacheKey)
        if (cached) return cached
        
        const params = []
        let innerFilter = `
            SELECT DISTINCT p2.idPokemon
            FROM Pokemon p2
            JOIN Pokemon_Type pt2 ON p2.idPokemon = pt2.idPokemon
            WHERE 1 = 1
        `

        if (type) {
            innerFilter += ` AND pt2.typeName = ?`;
            params.push(type);
        }

        if (generation) {
            innerFilter += ` AND p2.generation = ?`;
            params.push(generation);
        }

        innerFilter += ` ORDER BY p2.idPokemon LIMIT ? OFFSET ?`;
        params.push(limit + 1);
        params.push(offset);

        const fullQuery = `
            SELECT p.idPokemon, p.name, p.img, pt.typeName, pc.*
            FROM Pokemon p
            JOIN Pokemon_Type pt ON p.idPokemon = pt.idPokemon
            JOIN Pokemon_Color pc ON p.idPokemon = pc.idPokemon
            WHERE p.idPokemon IN (${innerFilter})
            ORDER BY p.idPokemon
        `

        const res = await db.execute(fullQuery, params)
        const rows = res.rows

        const pokemonMap = new Map()

        for (const row of rows) {
            const { idPokemon, name, img, typeName, color, darkerColor, lighterColor, lightestColor, darkestColor } = row

            if (!pokemonMap.has(idPokemon)) {
                pokemonMap.set(idPokemon, {
                    id: idPokemon,
                    name,
                    img,
                    colors: {
                        normal: color,
                        darker: darkerColor,
                        lighter: lighterColor,
                        darkest: darkestColor,
                        lightest: lightestColor
                    },
                    types: [],
                })
            }

            pokemonMap.get(idPokemon).types.push(typeName)
        }

        const allPokemons = Array.from(pokemonMap.values())
        const hasMore = allPokemons.length > limit

        const result = {
            pokemons: hasMore ? allPokemons.slice(0, limit) : allPokemons,
            hasMore
        }

        setCache(cacheKey,result)

        return result
    }

    static async getDamageReceivedData({ id }) {
        const cacheKey = `${id}-damage-received`
        const cached = getCache(cacheKey)
        if (cached) return cached

        const res = await db.execute(
            `SELECT pt.typeName
            FROM Pokemon_Type pt
            WHERE pt.idPokemon = ?`,
            [id]
        )

        const rows = res.rows
        const types = []
        const typesSet = new Set()

        for (const { typeName } of rows) {
            if (!typesSet.has(typeName)) {
                types.push({ typeName, color: getTypeColor(typeName) })
                typesSet.add(typeName)
            }
        }

        const result = await getDamageReceived({ db, types })
    
        setCache(cacheKey,result)

        return result
    }

    static async getBreeding({ id }) {
        const cacheKey = `${id}-breeding`
        const cached = getCache(cacheKey)
        if (cached) return cached

        const res = await db.execute(
            `SELECT 
                p.maleRate,
                p.hatchCounter,
                peg.eggGroup
            FROM Pokemon p
            JOIN Pokemon_EggGroup peg ON peg.idPokemon = p.idPokemon
            WHERE p.idPokemon = ?`,
            [id]
        )

        const rows = res.rows
        const { maleRate, hatchCounter } = rows[0]

        const breeding = {
            maleRate,
            femaleRate: maleRate ? 100 - maleRate : null,
            eggGroups: [],
            hatchCounter: {
                cicles: hatchCounter,
                steps: hatchCounter * 255
            }
        }

        const eggGroupsSet = new Set()
        for (const { eggGroup } of rows) {
            if (!eggGroupsSet.has(eggGroup)) {
                breeding.eggGroups.push(eggGroup)
                eggGroupsSet.add(eggGroup)
            }
        }

        setCache(cacheKey,breeding)

        return breeding
    }

    static async getTraining({ id }) {
        const cacheKey = `${id}-training`
        const cached = getCache(cacheKey)
        if (cached) return cached

        const res = await db.execute(
            `SELECT 
                p.captureRate,
                p.baseExperience,
                p.baseHappiness,
                gr.name AS growthRateName,
                gr.experience,
                bs.stat,
                bs.ev
            FROM Pokemon p
            JOIN GrowthRate gr ON p.growthRateName = gr.name
            JOIN BaseStat bs ON bs.idPokemon = p.idPokemon
            WHERE p.idPokemon = ?`,
            [id]
        )

        const rows = res.rows
        const { captureRate, baseExperience, baseHappiness, growthRateName, experience } = rows[0]

        const training = {
            ev: [],
            captureRate: {
                value: captureRate,
                percentage: getPercentage({ captureRate })
            },
            growth: {
                rate: growthRateName,
                experience: experience
            },
            baseHappiness,
            baseExperience
        }

        const evSet = new Set()
        for (const { stat, ev } of rows) {
            if (!evSet.has(stat) && ev > 0) {
                training.ev.push({ stat, ev })
                evSet.add(stat)
            }
        }

        setCache(cacheKey,training)

        return training
    }

    static async getPrevNextPokemon({ id }) {
        const cacheKey = `${id}-prev-next`
        const cached = getCache(cacheKey)
        if (cached) return cached

        const prevId = parseInt(id) - 1
        const nextId = parseInt(id) + 1

        const res = await db.execute(`
            SELECT 
                p.idPokemon,
                p.name,
                p.img,
                pt.typeName,
                pc.*
            FROM Pokemon p
            LEFT JOIN Pokemon_Type pt ON p.idPokemon = pt.idPokemon
            LEFT JOIN Pokemon_Color pc ON pc.idPokemon = p.idPokemon
            WHERE p.idPokemon = ? OR p.idPokemon = ?
        `, [prevId, nextId])

        const prevNext = {
            prev: null,
            next: null
        }

        const map = {
            [prevId]: {
                id: prevId,
                name: null,
                colors: {
                    normal: null,
                    lighter: null,
                    darker: null,
                    lightest: null,
                    darkest: null
                },
                types: [],
            },
            [nextId]: {
                id: nextId,
                name: null,
                colors: {
                    normal: null,
                    lighter: null,
                    darker: null,
                    lightest: null,
                    darkest: null
                },
                types: []
            }
        }

        for (const row of res.rows) {
            const { idPokemon,
                name,
                typeName,
                color, 
                darkerColor,
                darkestColor,
                lighterColor,
                lightestColor,
                img              
            } = row
            if (!map[idPokemon]) continue

            map[idPokemon].name = name
            map[idPokemon].colors = {
                normal: color,
                darker: darkerColor,
                lighter: lighterColor,
                lightest: lightestColor,
                darkest: darkestColor
            }
            map[idPokemon].img = img

            if (typeName && !map[idPokemon].types.includes(typeName)) {
                map[idPokemon].types.push(typeName)
            }
        }

        prevNext.prev = map[prevId].name ? map[prevId] : null
        prevNext.next = map[nextId].name ? map[nextId] : null

        const result = { previous: prevNext.prev, next: prevNext.next }

        setCache(cacheKey,result)

        return result
    }
}