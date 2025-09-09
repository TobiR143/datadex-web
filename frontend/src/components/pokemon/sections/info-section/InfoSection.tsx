import { SpecieData } from "./specie/SpecieData.tsx"
import { AbilitiesData } from "./abilities/AbilitiesData.tsx"
import { StatsData } from "./stats/StatsData.tsx"
import { SpritesData } from "./sprites/SpritesData.tsx"
import { LocationsData } from "./locations/LocationsData.tsx"
import { EvolutionChain } from "./evolution-chain/EvolutionChain.tsx"


export const InfoSection = () => {
    return (
        <>
            <SpecieData />
            <AbilitiesData />
            <StatsData />
            <LocationsData />
            <EvolutionChain />
            <SpritesData />
        </>
    )
}