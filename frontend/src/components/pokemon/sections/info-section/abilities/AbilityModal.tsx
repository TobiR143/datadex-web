import { useState, useEffect } from "react"
import type { Ability, PokemonByIdResponse } from "src/types/types"
import { usePokemonByAbility } from "src/hooks/sections/info-section/usePokemonsByAbility"
import { PokemonCard } from "src/components/pokemon/sections/menu-section/PokemonCard"
import "src/styles/pokemon/info-section/abilities/AbilityModal.css"
import { SectionLoading } from "../../SectionLoading"

type Props = {
  open: boolean,
  pokemon: PokemonByIdResponse,
  selectedAbility: {
    ability: Ability,
    type: "hidden" | "normal" | ""
  },
  onClose?: () => void
}

export const AbilityModal = ({ open, selectedAbility, pokemon, onClose }: Props) => {
  const { pokemons, isLoading } = usePokemonByAbility(selectedAbility.ability.name)
  const [selectedType, setSelectedType] = useState<"normal" | "hidden">("normal")
  const [closing, setClosing] = useState<boolean>(false)

  useEffect(() => {
    if (open) setClosing(false)
  }, [open])

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => {
      onClose?.()
    }, 300)
  }

  return (
    <div 
      className={`ability-modal ${closing ? "slide-out" : ""}`} 
      onClick={handleClose}
    >
      <div className="ability-modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ backgroundColor: pokemon.colors.normal }} className="ability-modal-header">
          <h3
            style={{ color: pokemon.colors.darkest }} 
            className="selected-ability-name">
            {selectedAbility.ability.name.replace("-", " ")}
          </h3>
          <p 
            style={{ color: pokemon.colors.darkest }} 
            className="selected-ability-description">
            { selectedAbility.type === 'hidden' ? 'Hidden ability' : 'Abilities'} of 
            <span className="selected-ability-description-pokemon">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase()}</span>
          </p>
        </div>

        <section className="am-section">
          <h4 style={{ color: pokemon.colors.darkest }} className="am-section-title">GAME DESCRIPTION</h4>
          <p className="am-section-text">{selectedAbility.ability.description}</p>
        </section>

        <section className="am-section">
          <h4 style={{ color: pokemon.colors.darkest }} className="am-section-title">EFFECT</h4>
          <p className="am-section-text">{selectedAbility.ability.effect}</p>
        </section>

        <section className="am-section">
          <h4 style={{ color: pokemon.colors.darkest }} className="am-section-title">DEPTH EFFECT</h4>
          <p className="am-section-text">{selectedAbility.ability.depthEffect}</p>
        </section>

        <section className="am-pokemon-container">
          <header className="am-pokemon-header">
            <h4 style={{ color: pokemon.colors.darkest }} className="am-pokemon-header-title">POKEMON WITH THIS ABILITY</h4>
            <div className="am-pokemon-header-buttons-container">
              <button
                style={ 
                  selectedType === "normal" 
                  ? { backgroundColor: pokemon.colors.normal, color: pokemon.colors.darkest, fontWeight: 600 } 
                  : { backgroundColor: pokemon.colors.lighter, color: pokemon.colors.darker}
                }
                onClick={() => setSelectedType("normal")}
                className={`am-pokemon-header-button ${selectedType === "normal" ? "active" : ""}`}
              >
                Normal
              </button>
              <button
                style={ 
                  selectedType === "hidden" 
                  ? { backgroundColor: pokemon.colors.normal, color: pokemon.colors.darkest, fontWeight: 600 } 
                  : { backgroundColor: pokemon.colors.lighter, color: pokemon.colors.darker }
                }
                onClick={() => setSelectedType("hidden")}
                className={`am-pokemon-header-button ${selectedType === "hidden" ? "active" : ""}`}
              >
                Hidden
              </button>
            </div>
          </header>
          <hr />
          <main className="am-pokemon-list">
            {isLoading && <SectionLoading color={pokemon.colors.normal} />}
            {pokemons?.[selectedType]?.map((poke) => (
              <PokemonCard key={poke.id} pokemon={poke} />
            ))}
          </main>
        </section>
      </div>
    </div>
  )
}