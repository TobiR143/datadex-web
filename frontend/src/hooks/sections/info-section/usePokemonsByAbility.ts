import { useEffect, useState } from "react"
import { BASE_API_URL } from "src/constants/config"
import type { Pokemon } from "src/types/types"

type PokemonResponse = {
    hidden: Pokemon[],
    normal: Pokemon[]
}

export const usePokemonByAbility = (abilityName: string) => {
    const [pokemons, setPokemons] = useState<PokemonResponse>({
        normal: [],
        hidden: []
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        fetch(`${BASE_API_URL}/ability/${abilityName}`)
            .then(res => res.json())
            .then(data => {
                setPokemons(data)
            })
            .finally(() => setIsLoading(false))
    }, [abilityName])

    return { pokemons, isLoading }
}