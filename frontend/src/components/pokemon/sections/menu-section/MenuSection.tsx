import type { PokemonByIdResponse } from "src/types/types.ts"
import { usePokemon } from "src/contexts/PokemonContext.tsx"
import "src/styles/pokemon/menu-section/PrevNextSection.css"
import { NavigationSection } from "./NavigationSection"
import { PokemonGameSelector } from "./PokemonGameSelector"

export const MenuSection = () => {
    const { pokemon } = usePokemon() as { pokemon: PokemonByIdResponse }
    const { id, colors } = pokemon

    return (
        <>
            <PokemonGameSelector />
            <NavigationSection id={id} colors={colors} />
        </>
    )
}