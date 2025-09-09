import { useEffect, useState } from "react"
import { BASE_API_URL } from "src/constants/config"
import type { Stats } from "src/types/types"

export const usePokemonStats = (id: number) => {
    const [stats, setStats] = useState<Stats | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        fetch(`${BASE_API_URL}/pokemon/${id}/stats`)
            .then(res => res.json())
            .then(data => setStats(data))
            .finally(() => setIsLoading(false))
    }, [id])

    return { stats, isLoading }
}