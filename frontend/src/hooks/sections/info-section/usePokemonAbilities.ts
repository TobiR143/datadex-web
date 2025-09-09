import { useEffect, useState } from "react"
import { BASE_API_URL } from "src/constants/config"
import type { Abilities } from "src/types/types"

export const usePokemonAbilities = (id: number) => {
    const [abilities, setAbilities] = useState<Abilities | []>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        fetch(`${BASE_API_URL}/pokemon/${id}/abilities`)
            .then(res => res.json())
            .then(data => setAbilities(data))
            .finally(() => setIsLoading(false))
    }, [id])

    return { abilities, isLoading }
}