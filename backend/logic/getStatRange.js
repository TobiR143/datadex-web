export const getStatRange = ({ baseStat, statName }) => {
  const level = 100

  if (statName.toLowerCase() === 'hp') {
    const minValue = Math.floor(((2 * baseStat + 0 + 0) * level) / 100) + level + 10
    const maxValue = Math.floor(((2 * baseStat + 31 + Math.floor(252 / 4)) * level) / 100) + level + 10
    return { minValue, maxValue }
  } else {
    const minValue = Math.floor((Math.floor(((2 * baseStat + 0 + 0) * level) / 100) + 5) * 0.9)
    const maxValue = Math.floor((Math.floor(((2 * baseStat + 31 + Math.floor(252 / 4)) * level) / 100) + 5) * 1.1)
    return { minValue, maxValue }
  }
}