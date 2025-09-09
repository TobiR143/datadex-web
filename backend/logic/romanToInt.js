export const romanToInt = (roman) => {
  const map = {
    I: 1, V: 5, X: 10
  }

  let total = 0
  for (let i = 0; i < roman.length; i++) {
    const current = map[roman[i]]
    const next = map[roman[i + 1]]

    if (next && current < next) {
      total += next - current
      i++
    } else {
      total += current
    }
  }

  return total
}