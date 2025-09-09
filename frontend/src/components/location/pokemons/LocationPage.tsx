import { Loader } from "@components/index/Loader"
import { ErrorContainer } from "@components/pokemon/ErrorContainer"
import { usePokemonsOnLocation } from "src/hooks/location/pokemons/usePokemonOnLocation"
import "src/styles/location/pokemons/LocationPage.css"
import { PokemonCard } from "./PokemonCard"

type Props = {
  id: string,
  versionGroup: string
}

export const LocationPage = ({ id, versionGroup }: Props) => {
  const { data, isLoading, error } = usePokemonsOnLocation(id, versionGroup)

  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorContainer error={error} />}
      {data && (
        <>
          <div className="location-info-container">
            <h1 className="location-title">
              {data.location.replaceAll("-", " ")}
              <span className="version-group">
                {versionGroup.replace("_","&").replace("-", " ")}
              </span>
            </h1>
            <p className="pokemon-quantity">{data.pokemonCount} Pokemon</p>
          </div>

          {Object.entries(data.pokemons).map(([method, groups]) => (
            <section key={method} className="encounter-method-section">
              <h2 className="encounter-method-name">{method.replaceAll("-", " ")}</h2>
              {Object.entries(groups).map(([conditionValue, pokemons]) => (
                <main key={conditionValue} className="encounter-condition-container">
                  {conditionValue !== "none" && (
                    <h3 className="encounter-condition-name">
                      {conditionValue.replaceAll("-", " ")}
                    </h3>
                  )}

                  <div className="pokemons-container">
                    {pokemons.map((pokemon) => (
                      <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                  </div>
                </main>
              ))}
            </section>
          ))}
        </>
      )}
    </>
  )
}