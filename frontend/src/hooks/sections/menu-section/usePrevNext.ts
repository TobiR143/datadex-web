import { useEffect, useState } from "react"
import { BASE_API_URL } from "src/constants/config"
import type { Pokemon } from "src/types/types.ts"

export const usePrevNext = (id: number) => {
    const [prevNext, setPrevNext] = useState<{ prev: Pokemon | null, next: Pokemon | null }>({
        prev: null,
        next: null
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        fetch(`${BASE_API_URL}/pokemon/prevNext/${id}`)
            .then(res => res.json())
            .then(data => {
                setPrevNext({
                    prev: data.previous,
                    next: data.next
                })
            }).finally(() => setIsLoading(false))
    }, [id])

    return { prev: prevNext.prev, next: prevNext.next, isLoading }
}