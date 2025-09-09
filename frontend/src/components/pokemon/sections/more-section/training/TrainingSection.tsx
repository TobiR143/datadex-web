import type { PokemonByIdResponse } from "src/types/types"
import "src/styles/pokemon/more-section/training/TrainingSection.css"
import { EvSection } from "./EvSection"
import { CaptureRateSection } from "./CaptureRateSection"
import { GrowthSection } from "./GrowthSection"
import { BaseValuesSection } from "./BaseValuesSection"
import { usePokemon } from "src/contexts/PokemonContext"
import { SectionLoading } from "../../SectionLoading"
import { usePokemonTraining } from "src/hooks/sections/more-section/usePokemonTraining"

export const TrainingSection = () => {
    const { pokemon } = usePokemon() as { pokemon: PokemonByIdResponse }
    const { colors, id } = pokemon
    const { training, isLoading } = usePokemonTraining(id)

    return (
        <>
            <h2
                className="training-section-title"
                style={{ color: colors.darkest }}
            >
                Training
            </h2>
            {
                isLoading ? <SectionLoading color={colors.normal}/>
                : training &&
                <section className="training-section">
                    <EvSection 
                        evArray={training.ev}
                        colors={colors}
                    />
                    <CaptureRateSection 
                        captureRate={training.captureRate}
                        colors={colors}
                    />
                    <GrowthSection 
                        growth={training.growth}
                        colors={colors}
                    />
                    <BaseValuesSection 
                        baseExperience={training.baseExperience}
                        baseHappiness={training.baseHappiness}
                        colors={colors}
                    />
                </section>
            }
        </>
    )
}