import { useEffect, useState } from "react"
import type { GameData, PokemonInfoResponseById } from "../../../types/types.ts"

export const useInfoData = (id: number, selectedGame: GameData | null) => {
    const [infoData, setInfoData] = useState<PokemonInfoResponseById>({
        description: "",
        sprite: "",
        spriteShiny: ""
        }
    )
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!selectedGame) return
        setIsLoading(true)
        fetch(`http://localhost:3000/pokemon/game/${id}/${selectedGame.game}`)
            .then(res => res.json())
            .then(data => {
                setInfoData(data)
            }).finally(() => setIsLoading(false))
    }, [id, selectedGame])

    return { infoData, setInfoData, isLoading }
}