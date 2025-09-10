import { useState } from "react";
import { useFilters } from "../../hooks/index/useFilters.ts";
import { usePaginatedPokemons } from "../../hooks/index/usePaginatedPokemons.ts"
import { Selectors } from "./Selectors.tsx";
import type { Generation, Type } from "../../types/types.ts";
import { PokemonCard } from "./PokemonCard.tsx";
import { Loader } from "./Loader.tsx";

export const PokemonPage = () => {
  const [filters, setFilters] = useState<{ type: Type | null; generation: Generation | null }>({
    type: null,
    generation: null
  })

  const { types, generations } = useFilters()
  const { pokemons, observerRef, isLoading } = usePaginatedPokemons(filters)

  return (
    <>
      {(types.length > 0 && generations.length > 0) && (
        <Selectors types={types} generations={generations} onChangeFilters={setFilters} />
      )}
      <section style={{ display: 'flex', flexDirection: 'column', padding: '0 6px', marginTop: '20px', fontFamily: 'system-ui' }}>
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
        <div ref={observerRef} style={{ height: "20px", width: "100%" }} />
        {isLoading && <Loader />}
      </section>
    </>
  )
}