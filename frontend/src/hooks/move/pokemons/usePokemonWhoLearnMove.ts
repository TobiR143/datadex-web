import { useEffect, useState } from "react"
import { BASE_API_URL } from "src/constants/config"
import type { PokemonWhoLearnMoveIdResponse, Error } from "src/types/types"

export function usePokemonsWhoLearnMove(idMove: string) {
  const [data, setData] = useState<PokemonWhoLearnMoveIdResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_API_URL}/move/${idMove}`)
        if (!res.ok) {
          const errJson = await res.json()
          setError({
            status: res.status,
            message: errJson.error || "Error loading pokemons"
          })
          setData(null)
          return
        }
        const json = await res.json()
        setData(json)
        setError(null)
      } catch (e: any) {
        setError({
          status: 500,
          message: e.message || "Unknown error"
        })
        setData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPokemons()
  }, [idMove])

  return { data, isLoading, error }
}