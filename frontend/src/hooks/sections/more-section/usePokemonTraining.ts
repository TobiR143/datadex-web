import { useEffect, useState } from "react"
import { BASE_API_URL } from "src/constants/config"
import type { Training } from "src/types/types"

export const usePokemonTraining = (id: number) => {
    const [training, setTraining] = useState<Training | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        fetch(`${BASE_API_URL}/pokemon/data/training/${id}`)
            .then(res => res.json())
            .then(data => setTraining(data))
            .finally(() => setIsLoading(false))
    }, [])

    return { training, isLoading }
}