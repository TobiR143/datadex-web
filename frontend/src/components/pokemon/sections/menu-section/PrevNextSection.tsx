import { LeftArrowIcon, RightArrowIcon } from "src/icons/Icons"
import { PokemonCard } from "src/components/pokemon/sections/menu-section/PokemonCard"
import type { Pokemon } from "src/types/types"

type Props = {
    prev: Pokemon | null,
    next: Pokemon | null
}

export const PrevNextSection = ({ prev, next } : Props) => {

    return (
        <> 
        {
            (prev || next) && (
                <section className="prev-next">
                    {next &&
                        <article className="next">
                            <div className="next-text-container">
                                <a href={`${next?.id}`} className="pokemon-next" style={{ color: next.colors.darkest }}>Next pokemon</a>
                                <RightArrowIcon color={next.colors.darkest} size={18} />
                            </div>
                            <PokemonCard pokemon={next} />
                        </article> 
                    }
                    {prev &&                     
                        <section className="prev">
                            <div className="prev-text-container">
                                <LeftArrowIcon color={prev.colors.darkest} size={18} />
                                <a href={`${prev?.id}`} className="pokemon-prev" style={{ color: prev.colors.darkest }}>Previous pokemon</a>
                            </div>
                            <PokemonCard pokemon={prev} />
                        </section> 
                    }
                </section>
            )
        }
        </>
    )
}