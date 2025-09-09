import { useEffect, useState } from "react";
import type { GenerationData, TypeData } from "../../types/types.ts";
import { BASE_API_URL } from "../../constants/config.ts";


export const useFilters = () => {
    const [types, setTypes] = useState<TypeData[]>([])
    const [generations, setGenerations] = useState<GenerationData[]>([])

    useEffect(() => {
        fetch(`${BASE_API_URL}/type`)
            .then(response => response.json())
            .then(data => setTypes([...data]));
        fetch(`${BASE_API_URL}/generation`)
            .then(response => response.json())
            .then(data => setGenerations([...data]));
    }, [])

    return { types, generations }
}