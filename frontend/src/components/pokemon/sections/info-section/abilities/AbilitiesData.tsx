import type { PokemonByIdResponse } from "src/types/types";
import "src/styles/pokemon/info-section/abilities/AbilitiesData.css"
import { InfoIcon } from "src/icons/Icons";
import React, { useEffect } from "react";
import { usePokemon } from "src/contexts/PokemonContext";
import { usePokemonAbilities } from "src/hooks/sections/info-section/usePokemonAbilities";
import { useAbilityModal } from "src/hooks/sections/info-section/useAbilityModal";
import { AbilityModal } from "./AbilityModal";
import { SectionLoading } from "../../SectionLoading";

export const AbilitiesData = () => {
    const { pokemon } = usePokemon() as { pokemon: PokemonByIdResponse }
    const { id, colors } = pokemon
    const { abilities, isLoading } = usePokemonAbilities(id)
    const { open, setOpen, selectedAbility, handleClick } = useAbilityModal()

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey)
    }, [])
    
    return (
    <>  
        <h2 className="abilities-section-title" style={{ color: colors.darkest }}>
            Abilities
        </h2>
        { open && 
            (
                <AbilityModal 
                    open={open} 
                    selectedAbility={selectedAbility} 
                    pokemon={pokemon}
                    onClose={() => setOpen(false)}
                />
            )
        }
        { isLoading 
            ? <SectionLoading color={colors.normal} />
            :   abilities && "normal" in abilities && "hidden" in abilities &&
        <section className="abilities-section">
            <div className="normal-abilities-container">
            {(abilities).normal.map((ability, index) => (
                <React.Fragment key={ability.name}>
                <article 
                    className="normal-ability" 
                    style={{ backgroundColor: colors.normal }}
                    onClick={() => handleClick(ability, abilities)}
                >
                    <header className="normal-ability-header">
                    <p className="normal-ability-content" style={{ color: colors.darkest }}>
                        {String(ability.name).replace('-', ' ')}
                    </p>
                    </header>
                    <aside className="normal-ability-aside">
                    <InfoIcon size={18} color={colors.darkest}/>
                    </aside>
                </article>
                {index < abilities.normal.length - 1 && (
                    <span className="ability-separator"> o </span>
                )}
                </React.Fragment>
            ))}
            </div>
            <div className="hidden-abilities-container">
                {
                    (abilities).hidden.map((ability) => (
                        <article 
                            key={ability.name} 
                            className="hidden-ability" 
                            style={{ backgroundColor: colors.lightest }}
                            onClick={() => handleClick(ability, abilities)}
                        >
                            <aside className="hidden-ability-aside" style={{ backgroundColor: colors.normal}}>
                                <p className="hidden-ability-hidden" style={{ color: colors.darkest }}>Hidden</p>
                            </aside>
                            <header className="hidden-ability-header" style={{ border: `1px solid ${colors.normal}` }}>
                                <p className="hidden-ability-content" style={{ color: colors.darker }}>{String(ability.name).replace('-',' ')}</p>
                                <InfoIcon size={18} color={colors.darker} />
                            </header>
                        </article>
                    ))
                }
            </div>
        </section>
        }
        
    </>
    )
}