const colorsNormal = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
}

const colorsDark = {
    normal: '#8B8B5E',
    fire: '#C46E26',
    water: '#4F70C0',
    electric: '#C6AF1F',
    grass: '#5FA334',
    ice: '#74B3B0',
    fighting: '#9A1E1B',
    poison: '#80287F',
    ground: '#B69C50',
    flying: '#8766C9',
    psychic: '#C7356B',
    bug: '#8B9B13',
    rock: '#937F2B',
    ghost: '#5C4673',
    dragon: '#5831C9',
    dark: '#574738',
    steel: '#9494B0',
    fairy: '#B76590'
}

export const getTypeColorScheme = (type) => {
    const lowerType = type.toLowerCase()
    return {
        normal: colorsNormal[lowerType] || '#777',
        dark: colorsDark[lowerType] || '#444'
    }
}