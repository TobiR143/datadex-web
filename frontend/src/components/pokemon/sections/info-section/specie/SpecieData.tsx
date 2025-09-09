import { PokemonCry } from "@components/pokemon/sections/info-section/specie/PokemonCry"
import { SpeechVoice } from "@components/pokemon/sections/info-section/specie/SpeechVoice"
import type { PokemonByIdResponse } from "src/types/types"
import "src/styles/pokemon/info-section/SpecieData.css"
import { usePokemon } from "src/contexts/PokemonContext"
import { useGameContext } from "src/contexts/GameContext"
import { useInfoData } from "src/hooks/sections/info-section/useInfoData"
import { SectionLoading } from "../../SectionLoading"

export const SpecieData = () => {
    const { pokemon } = usePokemon() as { pokemon: PokemonByIdResponse }
    const { id, height, weight, colors, cry } = pokemon
    const { selectedGame } = useGameContext()
    const { infoData, isLoading } = useInfoData(id, selectedGame)
    const { description } = infoData

    return (
        <>
        <h2 className="specie-section-title" style={{ color: colors.darkest }}>
            Specie
        </h2>
        {
            isLoading ? <SectionLoading color={colors.normal}/>
            : (
            <section className="info-section-data">
                <div className="info-section-data-description-container">
                    <p className="info-section-data-description">{description}</p>
                </div>
                <p className="info-section-data-description-details">Description of Pokedex (from Pokemon <span>{String(selectedGame?.game).replace('-',' ')}</span>)</p>
                <div className="info-section-data-values">
                    <div className="info-section-data-values-height-container">
                        <p className="info-section-data-height">{height}</p>
                        <label className="info-section-data-height-label">Height</label>
                    </div>
                    <div className="info-section-data-values-weight-container">
                        <p className="info-section-data-weight">{weight}</p>
                        <label className="info-section-data-weight-label">Weight</label>
                    </div>
                </div>
                <div className="info-section-data-sounds">
                    <div className="info-section-data-voice-container">
                        <div className="info-section-icons-container">
                            <SpeechVoice color={colors.normal} text={description} />
                        </div>
                        <label className="info-section-data-voice-label">dataDex voice</label>
                    </div>
                    <div className="info-section-data-cry-container">
                        <PokemonCry color={colors.normal} audio={cry} />
                        <label className="info-section-data-cry-label">Cry</label>
                    </div>
                </div>
            </section>
            )
        }
        </>
    )
}