export function formatHeight(meters) {
  if (!meters || meters <= 0) return "Unknown"

  const totalInches = meters * 39.3701
  const feet = Math.floor(totalInches / 12)
  const inches = Math.round(totalInches % 12)

  return `${feet}'${inches}" (${meters.toFixed(2)} meters)`
}