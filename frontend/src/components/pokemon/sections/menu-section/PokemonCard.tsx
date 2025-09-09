import type { Pokemon } from "src/types/types"
import "src/styles/pokemon/menu-section/PokemonCard.css"

type Props = {
    pokemon: Pokemon
}

export const PokemonCard = ({ pokemon } : Props) => {
    return (
        <a href={`/pokemon/${pokemon.id}`} style={{ backgroundColor: pokemon.colors.normal }} className="pokemon-prevnext-card">
            <header className="pokemon-prevnext-header">
                <div className="pokemon-prevnext-header-data">
                    <p 
                        style={{ color: pokemon.colors.darkest }} 
                        className="pokemon-prevnext-id"
                        >
                            #{pokemon.id}
                    </p>
                    <h3 
                        style={{ color: pokemon.colors.darkest }} 
                        className="pokemon-prevnext-name"
                        >
                            {pokemon.name}
                    </h3>
                </div>
                <div
                    className="pokemon-prevnext-types-container"
                >
                    { pokemon.types.map((type) => (
                        <div key={type} style={{ borderColor: pokemon.colors.darkest, color: pokemon.colors.darkest }} className="pokemon-prevnext-type">
                            {type}
                        </div>
                    ))}
                </div>
            </header>
            <aside style={{ backgroundColor: pokemon.colors.lightest }} className="pokemon-prevnext-aside">
                <img className="pokemon-prevnext-img" src={pokemon.img} />
            </aside>
        </a>
    )
}