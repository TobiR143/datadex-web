import { useEffect, useState } from "react"
import { BASE_API_URL } from "src/constants/config"
import type { PokemonWhoAppearsOnLocationResponse, Error } from "src/types/types"

export function usePokemonsOnLocation(id: string, versionGroup: string) {
  const [data, setData] = useState<PokemonWhoAppearsOnLocationResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchLocation() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_API_URL}/location/${id}/${versionGroup}`)
        if (!res.ok) {
          const err = await res.json()
          setError({
            status: res.status,
            message: err.error || "Error loading location"
          })
        } else {
          const json = await res.json()
          setData(json)
        }
      } catch (e: any) {
        setError({
          status: 500,
          message: e.message
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchLocation()
  }, [id, versionGroup])

  return { data, isLoading, error }
}