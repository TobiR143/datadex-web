import { useEffect, useState } from "react"
import { BASE_API_URL } from "src/constants/config"
import type { EvolutionNode } from "src/types/types"

export function useEvolutionChain(pokemonId: number) {
  const [data, setData] = useState<EvolutionNode[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEvolutionChain() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_API_URL}/pokemon/${pokemonId}/evolution-chain`)
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || "Error loading evolution chain")
        }
        const json = await res.json()
        setData(json)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (pokemonId) {
      fetchEvolutionChain()
    }
  }, [pokemonId])

  return { data, isLoading, error }
}
