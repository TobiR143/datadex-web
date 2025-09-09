import { PokemonCard } from "src/components/index/PokemonCard"
import { HeaderSelector } from "./HeaderSelector"
import { useHeaderSelector } from "src/hooks/move/pokemons/useHeaderSelector"
import "src/styles/move/pokemons/PokemonsPage.css"
import { usePokemonsWhoLearnMove } from "src/hooks/move/pokemons/usePokemonWhoLearnMove"
import { Loader } from "src/components/index/Loader"
import { ErrorContainer } from "@components/pokemon/ErrorContainer"

interface Props {
  idMove: string
}

export const PokemonsPage = ({ idMove }: Props) => {
  const { data, isLoading, error } = usePokemonsWhoLearnMove(idMove)
  const { selectedLearnType, handleSelect } = useHeaderSelector()

  return (
    <>
      {
      isLoading ? <Loader />
      : error ? <ErrorContainer error={error} />
      : data &&
      <>

        <header className="header-move-learn-type-selector">
            <h1 className="header-move-pokemons-title">
            Pokémon who learn{" "}
            <span className="header-move-title-span">
                {data.move.name.replaceAll("-", " ")}
            </span>{" "}
            by
            </h1>
            <HeaderSelector
            onSelect={handleSelect}
            selectedLearnType={selectedLearnType}
            />
        </header>

        <main className="main-pokemons-learn-type">
            {data.pokemons[selectedLearnType]?.length > 0 ? (
            data.pokemons[selectedLearnType].map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
            ) : (
            <p className="pokemons-learn-type-no-results">
                There are no pokemons who learn{" "}
                {data?.move.name.replaceAll("-", " ")} by this method
            </p>
            )}
        </main>
      </>
    }
    </>
  )
}