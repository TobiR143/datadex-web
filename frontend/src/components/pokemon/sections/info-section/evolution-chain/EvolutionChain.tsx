import { Loader } from "@components/index/Loader"
import { useEvolutionChain } from "src/hooks/sections/info-section/usePokemonEvolutionChain"
import { EvolutionNode } from "./EvolutionNode"
import "src/styles/pokemon/info-section/evolution-chain/EvolutionChain.css"
import { usePokemon } from "src/contexts/PokemonContext"
import type { PokemonByIdResponse } from "src/types/types"

export const EvolutionChain = () => {
  const { pokemon } = usePokemon() as { pokemon: PokemonByIdResponse }
  const { id, colors } = pokemon
  const { data, isLoading, error } = useEvolutionChain(id)

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <h2
        style={{ color: colors.darkest }} 
        className="evolution-chain-title"
      >Evolution Chain</h2>
      <div className="evolution-chain">
        {data &&
          data.map((root) => (
            <EvolutionNode key={root.id} node={root} />
          ))}
      </div>
    </>
  )
}
