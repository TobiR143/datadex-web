import { useGameContext } from "src/contexts/GameContext"
import { usePokemon } from "src/contexts/PokemonContext"
import { useLocations } from "src/hooks/sections/info-section/useLocations"
import type { PokemonByIdResponse } from "src/types/types"
import { SectionLoading } from "../../SectionLoading"
import "src/styles/pokemon/info-section/location/LocationsData.css"
import { InfoIcon } from "src/icons/Icons"

export const LocationsData = () => {
    const { pokemon } = usePokemon() as { pokemon: PokemonByIdResponse }
    const { id, colors } = pokemon
    const { selectedGame } = useGameContext()
    const { locations, isLoading } = useLocations({ id, game: selectedGame })

    return (
        <>
            <h2 style={{ color: colors.darkest }} className="locations-section-title">Locations</h2>
            { isLoading 
                ? <SectionLoading color={colors.normal} />
                : locations && (
                    <section className="locations-section">
                    { locations.length > 0 
                        ? 
                            <>
                                <p className="location-description">
                                    Locations on Pokemon 
                                        <span>
                                            {String(selectedGame?.game).replace('-',' ')}
                                        </span>
                                    .
                                </p>
                                <p className="location-description">
                                    Press one location to see more details.
                                </p>
                                <div className="locations-section-div">
                                    { 
                                        locations.map((location) => (
                                            <a href={`/location/${location.id}/${selectedGame?.versionGroup}`} style={{ backgroundColor: colors.lightest }} className="location" key={location.id}>
                                                <p style={{ color: colors.darkest }} className="location-name">
                                                    {location.name.replaceAll('-',' ')}
                                                </p>
                                                <div>
                                                    <InfoIcon color={colors.darkest} size={18}/>
                                                </div>
                                            </a>
                                        ))
                                    }
                                </div>
                            </>
                        : <p className="location-description">Didn't found locations for this edition.</p>
                    }
                    </section>
                )
            }
        </>
    )
}