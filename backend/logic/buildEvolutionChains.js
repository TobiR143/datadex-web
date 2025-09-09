export const buildEvolutionChains = (values) => {
  const byFrom = new Map()

  for (const evo of values) {
    if (!byFrom.has(evo.from.id)) {
      byFrom.set(evo.from.id, {
        id: evo.from.id,
        name: evo.from.name,
        img: evo.from.img,
        types: evo.from.types,
        colors: evo.from.colors,
        evolvesTo: []
      })
    }
    
    byFrom.get(evo.from.id).evolvesTo.push({
      method: evo.method,
      id: evo.to.id,
      name: evo.to.name,
      img: evo.to.img,
      types: evo.to.types,
      colors: evo.to.colors
    })
  }

  for (const evo of values) {
    const parent = byFrom.get(evo.from.id)
    for (const child of parent.evolvesTo) {
      if (byFrom.has(child.id)) {
        child.evolvesTo = byFrom.get(child.id).evolvesTo
      }
    }
  }

  const allToIds = new Set(values.map(v => v.to.id))
  const roots = [...byFrom.values()].filter(node => !allToIds.has(node.id))

  return roots
}
