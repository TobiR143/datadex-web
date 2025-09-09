import type { PokemonByIdResponse } from "src/types/types"
import { DamageReceivedElementsContainer } from "./DamageReceivedElementsContainer"
import "src/styles/pokemon/more-section/damage-received/DamageSection.css"
import { usePokemon } from "src/contexts/PokemonContext"
import { SectionLoading } from "../../SectionLoading"
import { usePokemonDamage } from "src/hooks/sections/more-section/usePokemonDamage"

export const DamageReceivedSection = () => {
    const { pokemon } = usePokemon() as { pokemon: PokemonByIdResponse }
    const { id, colors } = pokemon
    const { damageReceived, isLoading } = usePokemonDamage(id)

    return (
        <>       
            <h2 
                className="damage-received-section-title" 
                style={{ color: colors.darkest }}
            >
                Damage Received
            </h2>
            {  isLoading ? <SectionLoading color={colors.normal}/>
            :
            <section className="damage-received-section">
                { damageReceived &&
                    damageReceived?.debilities?.length > 0 &&
                    <>
                        <p className="damage-received-description">Weak against...</p>
                        <DamageReceivedElementsContainer damageReceivedArray={damageReceived.debilities} />
                    </>
                }
                { damageReceived &&
                    damageReceived?.resistances?.length > 0 &&
                    <>
                        <p className="damage-received-description">Resistant against...</p>
                        <DamageReceivedElementsContainer damageReceivedArray={damageReceived.resistances} />
                    </>
                }
                { damageReceived &&
                    damageReceived?.normalDamage?.length > 0 &&
                    <>
                        <p className="damage-received-description">Normal in part of...</p>
                        <DamageReceivedElementsContainer damageReceivedArray={damageReceived.normalDamage} />
                    </>
                }
            </section>
            }
        </>
    )
}