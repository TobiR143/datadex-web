export function formatWeight(kg) {
  if (!kg || kg <= 0) return "Unknown"

  const lbs = kg * 2.20462
  return `${Math.round(lbs)} lbs (${kg.toFixed(1)} kg)`
}