import { useEffect, useState } from "react"
import { BASE_API_URL } from "src/constants/config"
import type { PokemonDataDamageReceived } from "src/types/types"

export const usePokemonDamage = (id: number) => {
    const [damageReceived, setDamageReceived] = useState<PokemonDataDamageReceived | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        fetch(`${BASE_API_URL}/pokemon/data/damage-received/${id}`)
            .then(res => res.json())
            .then(data => setDamageReceived(data))
            .finally(() => setIsLoading(false))
    }, [])

    return { damageReceived, isLoading }
}