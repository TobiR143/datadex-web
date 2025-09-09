import "../../styles/pokemon/PokemonCard.css"
import { usePokemon } from "src/contexts/PokemonContext"
import type { PokemonByIdResponse } from "src/types/types"

export const PokemonCard = () => {
    const { pokemon } = usePokemon() as { pokemon: PokemonByIdResponse }
    
    return (
        <section className="pokemon-card" style={{ backgroundColor: pokemon.colors.lighter }}>
            <header className="pokemon-header">
                <div className="pokemon-header-data">
                    <h1
                        className="pokemon-header-data-name"
                        style={{ color: pokemon.colors.darkest }}
                    >
                        {pokemon.name}
                    </h1>
                    <p
                        className="pokemon-header-data-id"
                        style={{ color: pokemon.colors.darkest }}
                    >
                        #{pokemon.id}
                    </p>
                </div>
                <div>
                    <p
                        className="pokemon-header-genus"
                        style={{ color: pokemon.colors.darkest }}
                    >
                        {pokemon.genus}
                    </p>
                </div>
                <div className="pokemon-header-types">
                    {pokemon.types.map((type, index) => (
                        <div
                            key={index}
                            className="pokemon-header-type"
                            style={{
                                border: `2px solid ${pokemon.colors.darkest}`,
                                color: pokemon.colors.darkest,
                            }}
                        >
                            {type}
                        </div>
                    ))}
                </div>
            </header>
            <aside className="pokemon-aside">
                <div
                    className="pokemon-aside-img-container"
                    style={{ backgroundColor: pokemon.colors.lightest }}
                >
                    <img
                        className="pokemon-aside-img"
                        src={pokemon.img}
                        alt={pokemon.name}
                    />
                </div>
            </aside>
        </section>
    )
}