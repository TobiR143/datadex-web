import { useEffect, useState } from "react"
import { BASE_API_URL } from "src/constants/config"
import type { Breeding } from "src/types/types"

export const usePokemonBreeding = (id: number) => {
    const [breeding, setBreeding] = useState<Breeding | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        fetch(`${BASE_API_URL}/pokemon/data/breeding/${id}`)
            .then(res => res.json())
            .then(data => setBreeding(data))
            .finally(() => setIsLoading(false))
    }, [])

    return { breeding, isLoading }
}