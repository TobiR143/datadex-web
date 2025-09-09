import type { Pokemon } from "../../types/types.ts";
import '@styles/index/PokemonCard.css'

export const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <a href={`/pokemon/${pokemon.id}`}>
      <article
        className="pokemon"
        style={{ backgroundColor: pokemon.colors.normal, color: pokemon.colors.darkest }}
      >
        <header className="pokemon-data-container">
          <div className="pokemon-data">
            <p className="pokemon-data-id">#{pokemon.id}</p>
            <h2 className="pokemon-data-name">{pokemon.name}</h2>
          </div>
          <div className="pokemon-types-container">
            {pokemon.types.map((type) => (
              <div key={type} className="pokemon-type" style={{ borderColor: pokemon.colors.darkest }}>
                {type}
              </div>
            ))}
          </div>
        </header>
        <aside className="pokemon-img-container" style={{ backgroundColor: pokemon.colors.lightest }}>
          <img src={pokemon.img} alt={pokemon.name} />
        </aside>
      </article>
    </a>
  );
}

