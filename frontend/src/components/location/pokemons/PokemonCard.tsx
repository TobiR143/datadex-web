import type { PokemonDataByLocation } from "src/types/types"
import "src/styles/location/pokemons/PokemonCard.css"

interface Props {
  pokemon: PokemonDataByLocation
}

export const PokemonCard = ({ pokemon }: Props) => {
  return (
    <a
      href={`/pokemon/${pokemon.id}`}
      style={{
        backgroundColor: pokemon.colors.lighter,
        border: `2px solid ${pokemon.colors.darkest}`
      }}
      className="pokemon-card"
    >
      <header className="pokemon-card-header">
        <div className="pokemon-card-header-data">
          <h3
            style={{ color: pokemon.colors.darkest }}
            className="pokemon-name"
          >
            {pokemon.name}
          </h3>
          <p
            style={{ color: pokemon.colors.darkest }}
            className="pokemon-level-range"
          >
            Level {pokemon.minLevel === pokemon.maxLevel
              ? pokemon.minLevel
              : `${pokemon.minLevel} - ${pokemon.maxLevel}`}
          </p>
          <p
            className={`pokemon-chance ${
              pokemon.chance < 20
                ? "pokemon-chance-very-low"
                : pokemon.chance < 40
                ? "pokemon-chance-low"
                : pokemon.chance < 60
                ? "pokemon-chance-medium"
                : pokemon.chance < 80
                ? "pokemon-chance-high"
                : "pokemon-chance-very-high"
            }`}
          >
            {pokemon.chance}%
          </p>
        </div>
        <div className="pokemon-games-container">
          {pokemon.games.map((game) => (
            <div
              key={game}
              style={{ color: pokemon.colors.darkest }}
              className="pokemon-game"
            >
              {game}
            </div>
          ))}
        </div>
      </header>

      <aside className="pokemon-card-aside">
        <div className="pokemon-card-img-container">
          <img
            className="pokemon-card-img"
            src={pokemon.img}
            alt={pokemon.name}
          />
        </div>
      </aside>
    </a>
  )
}