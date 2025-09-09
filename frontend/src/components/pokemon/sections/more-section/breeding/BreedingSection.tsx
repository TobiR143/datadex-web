import type { PokemonByIdResponse } from "src/types/types"
import "src/styles/pokemon/more-section/breeding/BreedingSection.css"
import { GenderRateSection } from "./GenderRateSection"
import { EggGroups } from "./EggGroups"
import { HatchCounterSection } from "./HatchCounterSection"
import { usePokemon } from "src/contexts/PokemonContext"
import { SectionLoading } from "../../SectionLoading"
import { usePokemonBreeding } from "src/hooks/sections/more-section/usePokemonBreeding"

export const BreedingSection = () => {
    const { pokemon } = usePokemon() as { pokemon: PokemonByIdResponse }
    const { colors, id } = pokemon
    const { breeding, isLoading } = usePokemonBreeding(id)

    return (
        <>            
            <h2
                className="breeding-section-title"
                style={{ color: colors.darkest }}
            >
                Breeding
            </h2>
        {
            isLoading ? <SectionLoading color={colors.normal}/>
            : breeding &&
            <section className="breeding-section">
                <GenderRateSection 
                    femaleRate={breeding.femaleRate}
                    maleRate={breeding.maleRate}
                />
                <EggGroups 
                    eggGroups={breeding.eggGroups}
                    colors={colors}
                />
                <HatchCounterSection 
                    hatchCounter={breeding.hatchCounter}
                    colors={colors}
                />
            </section>
        }
        </>
    )
}