export function buildEvolutionMethod(row) {
    if (row.evolutionTrigger === 'trade') {
        return 'trade'
    } else if (row.move) {
        return `learning ${row.move}`
    } else if (row.location) {
        return `level up on ${row.location}`
    } else if (row.item) {
        if (row.timeOfDay) return `using item ${row.item} at ${row.timeOfDay}`
        else return `using item ${row.item}`
    } else if (row.heldItem) {
        if (row.timeOfDay) return `${row.evolutionTrigger} holding ${row.item} at ${row.timeOfDay}`
        else return `${row.evolutionTrigger} holding ${row.heldItem}`
    } else if (row.gender) {
        return `level ${row.minLevel} being ${row.gender}`
    } else if (row.minHappiness) {
        if (row.timeOfDay) return `level up with ${row.minHappiness} happiness at ${row.timeOfDay}`
        else return `level up with ${row.minHappiness} happiness`
    } else if (row.timeOfDay) {
        return `level up at ${row.timeOfDay}`
    } else if (row.evolutionTrigger === 'level-up' && row.minLevel) {
        return `level ${row.minLevel}`
    } else {
        return 'unknown'
    }
}