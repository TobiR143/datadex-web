import { useEffect, useState } from "react";
import { BASE_API_URL } from "src/constants/config";
import type { GameData, LearnType, MoveResponse } from "src/types/types";

export const useMoves = (id: number, game: GameData) => {
    const [moves, setMoves] = useState<Record<LearnType, MoveResponse[]>>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        fetch(`${BASE_API_URL}/pokemon/moves/${id}/${game.game}`)
            .then(res => res.json())
            .then(data => {
                setMoves(data)
            }).finally(() => setIsLoading(false))
    }, [id, game])

    return { moves, setMoves, isLoading }
}