import { useEffect, useState } from "react"
import { BASE_API_URL } from "src/constants/config"
import type { Game, GamesByGeneration, Generation } from "src/types/types"

export const useGames = ({ id }: { id: number }) => {
  const [gamesByGeneration, setGamesByGeneration] = useState<GamesByGeneration>({} as GamesByGeneration)
  const [defaultGame, setDefaultGame] = useState<Game | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`${BASE_API_URL}/pokemongame/${id}`)
      .then(res => res.json())
      .then((data) => {
        setGamesByGeneration(data)

        const generations = Object.keys(data)
        if (generations.length > 0) {
          const lastGen = generations[generations.length - 1] as Generation
          const lastGenGames = data[lastGen]
          if (lastGenGames?.length > 0) {
            setDefaultGame(lastGenGames[0])
          }
        }
      })
      .catch(err => console.error("Error en fetch:", err))
  }, [id])

  return { gamesByGeneration, defaultGame }
}