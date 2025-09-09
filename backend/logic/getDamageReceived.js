import { toFraction } from "./toFraction.js"
import { getTypeColorScheme } from "./getTypeColorScheme.js"

export const getDamageReceived = async ({ db, types }) => {
  const allTypesRes = await db.execute(`SELECT name FROM Type`)
  const allTypes = allTypesRes.rows.map(r => r.name)

  const effectivenessRes = await db.execute(`
    SELECT attackerType, defenderType, multiplier FROM TypeEffectiveness
  `)

  const effectiveness = {}
  for (const { attackerType, defenderType, multiplier } of effectivenessRes.rows) {
    if (!effectiveness[attackerType]) effectiveness[attackerType] = {}
    effectiveness[attackerType][defenderType] = multiplier
  }

  const damageReceived = {
    resistances: [],
    debilities: [],
    normalDamage: []
  }

  for (const attackingTypeName of allTypes) {
    let totalMultiplier = 1.0

    for (const defendingType of types) {
      const multiplier = effectiveness[attackingTypeName]?.[defendingType.typeName] ?? 1.0
      totalMultiplier *= multiplier
    }

  const entry = {
    name: attackingTypeName,
    colors: getTypeColorScheme(attackingTypeName),
    totalMultiplier: toFraction(totalMultiplier)
  }

    if (totalMultiplier > 1.0) damageReceived.debilities.push(entry)
    else if (totalMultiplier < 1.0) damageReceived.resistances.push(entry)
    else damageReceived.normalDamage.push(entry)
  }

  return damageReceived
}