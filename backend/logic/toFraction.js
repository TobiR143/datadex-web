export const toFraction = (num) => {
    if (Number.isInteger(num)) return String(num)

    const denominators = [2, 4, 8]
    for (const d of denominators) {
      const n = Math.round(num * d)
      if (Math.abs(num - n / d) < 1e-6) {
        return `${n}/${d}`
      }
    }

    return num.toFixed(2)
  }