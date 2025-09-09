import { useEffect, useState } from "react"
import { BASE_API_URL } from "src/constants/config"
import type { GameData, Location } from "src/types/types"

type Props = {
    id: number,
    game: GameData | null
}

export const useLocations = ({ id, game } : Props) => {
    const [locations, setLocations] = useState<Location[] | []>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!game) return
        setIsLoading(true)

        fetch(`${BASE_API_URL}/pokemon/${id}/${game.game}/encounters`)
            .then(res => res.json())
            .then(data => setLocations(data))
            .finally(() => setIsLoading(false))
    }, [id, game])

    return { locations, isLoading }
}