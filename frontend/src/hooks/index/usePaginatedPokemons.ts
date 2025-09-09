import { useEffect, useRef, useState } from "react"
import type { Pokemon, Type, Generation } from "../../types/types.ts"
import { LIMIT, BASE_API_URL } from "../../constants/config.ts"

export const usePaginatedPokemons = (filters: {
  type: Type | null
  generation: Generation | null
}) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<HTMLDivElement | null>(null)

  const shouldLoadFirst = useRef(false)

  useEffect(() => {
    setOffset(0)
    setPokemons([])
    setHasMore(true)
    shouldLoadFirst.current = true
  }, [filters])

  useEffect(() => {
    if (!shouldLoadFirst.current) return

    const controller = new AbortController()
    const fetchPokemons = async () => {
      setIsLoading(true)
      const params = new URLSearchParams()
      if (filters.generation) params.append("generation", String(filters.generation))
      if (filters.type) params.append("type", String(filters.type))

      params.append("offset", "0")
      params.append("limit", LIMIT.toString())

      try {
        const res = await fetch(`${BASE_API_URL}/pokemon?${params.toString()}`, {
          signal: controller.signal
        })
        const data = await res.json()
        setPokemons(data.pokemons)
        setHasMore(data.pokemons.length === LIMIT)
      } catch (err: any) {
        if (err.name !== "AbortError") console.error(err)
      } finally {
        setIsLoading(false)
        shouldLoadFirst.current = false
      }
    }

    fetchPokemons()
    return () => controller.abort()
  }, [filters])

  useEffect(() => {
    if (!hasMore || isLoading || offset === 0) return

    const controller = new AbortController()
    const fetchMorePokemons = async () => {
      setIsLoading(true)
      const params = new URLSearchParams()
      if (filters.generation) params.append("generation", String(filters.generation))
      if (filters.type) params.append("type", String(filters.type))
      params.append("offset", offset.toString())
      params.append("limit", LIMIT.toString())

      try {
        const res = await fetch(`${BASE_API_URL}/pokemon?${params.toString()}`, {
          signal: controller.signal
        })
        const data = await res.json()
        setPokemons(prev => [...prev, ...data.pokemons])
        setHasMore(data.pokemons.length === LIMIT)
      } catch (err: any) {
        if (err.name !== "AbortError") console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMorePokemons()
    return () => controller.abort()
  }, [offset])

  useEffect(() => {
    const node = observerRef.current
    if (!node || !hasMore || isLoading) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setOffset(prev => prev + LIMIT)
        }
      },
      { threshold: 1.0 }
    )

    observer.observe(node)
    return () => {
      if (node) observer.unobserve(node)
    }
  }, [observerRef.current, hasMore, isLoading])

  return { pokemons, observerRef, isLoading }
}