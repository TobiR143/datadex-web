export const getPercentage = ({ captureRate, ballBonus = 1 }) => {
    const a = (captureRate * ballBonus) / 3
    const percentage = Math.round(Math.min(a, 255) / 255 * 100 * 10) / 10

    return percentage
}