import { useGameContext } from "src/contexts/GameContext"
import { usePokemon } from "src/contexts/PokemonContext"
import { useInfoData } from "src/hooks/sections/info-section/useInfoData"
import "src/styles/pokemon/info-section/SpritesData.css"
import type { PokemonByIdResponse } from "src/types/types"
import { SectionLoading } from "../../SectionLoading"

export const SpritesData = () => {
    const { pokemon } = usePokemon() as { pokemon: PokemonByIdResponse }
    const { id, colors } = pokemon
    const { selectedGame } = useGameContext()
    const { infoData, isLoading } = useInfoData(id, selectedGame)
    const { sprite, spriteShiny } = infoData

    return (
        <>            
            <h2 className="sprites-section-title" style={{ color: colors.darkest}}>
                Sprites
            </h2>
            { isLoading ? <SectionLoading color={colors.normal}/>
                :
                <section className="sprites-section">
                    {sprite &&
                        <div className="normal-sprite-container">
                            <h2 className="normal-sprite-title">Normal</h2>
                            <img className="normal-sprite" src={sprite}/>
                        </div>
                    }
                    {spriteShiny &&
                        <div className="shiny-sprite-container">
                            <h2 className="shiny-sprite-title">Shiny</h2>
                            <img className="shiny-sprite" src={spriteShiny}/>
                        </div>
                    }
                    <p className="sprites-description">Sprites from: Pokemon <span>{String(selectedGame?.game).replace('-',' ')}</span></p>
                </section>
            }
        </>
    )
}