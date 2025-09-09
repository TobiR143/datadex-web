import type { PokemonByIdResponse } from "src/types/types";
import "src/styles/pokemon/info-section/StatsData.css"
import { useEffect, useState } from "react";
import { usePokemon } from "src/contexts/PokemonContext";
import { usePokemonStats } from "src/hooks/sections/info-section/usePokemonStats";
import { SectionLoading } from "../../SectionLoading";

export const StatsData = () => {
    const [statSelected, setStatSelected] = useState<"baseValue" | "minValue" | "maxValue">("baseValue")
    const [maxStat, setMaxStat] = useState<number>(0)
    const { pokemon } = usePokemon() as { pokemon: PokemonByIdResponse }
    const { id, colors } = pokemon
    const { stats, isLoading } = usePokemonStats(id)

    useEffect(() => {
        if (!stats) return
        setMaxStat(Math.max(...stats.values.map
            ((stat) => stat[statSelected]))
        )
    }, [statSelected, stats])

    return (
        <>
            <h2 className="stats-section-title" style={{ color: pokemon.colors.darkest}}>
                Stats
            </h2>
            { isLoading ? <SectionLoading color={colors.normal} />
            : stats &&
            <section className="stats-section">
                <div className="stats-selector">
                    <div 
                        onClick={() => setStatSelected("baseValue")} 
                        className="stat-option"
                        style={{
                            backgroundColor: (statSelected === 'baseValue') ? colors.normal : colors.lighter, 
                            borderRadius: (statSelected === 'baseValue') ? '5px 5px 0 0' : '5px', 
                            color: colors.darkest
                        }}
                    >
                        Base stats
                    </div>
                    <div 
                        onClick={() => setStatSelected("minValue")} 
                        className="stat-option"
                        style={{
                            backgroundColor: (statSelected === 'minValue') ? colors.normal : colors.lighter, 
                            borderRadius: (statSelected === 'minValue') ? '5px 5px 0 0' : '5px', 
                            color: colors.darkest
                        }}
                    >
                        Min
                    </div>
                    <div 
                        onClick={() => setStatSelected("maxValue")} 
                        className="stat-option"
                        style={{
                            backgroundColor: (statSelected === 'maxValue') ? colors.normal : colors.lighter, 
                            borderRadius: (statSelected === 'maxValue') ? '5px 5px 0 0' : '5px', 
                            color: colors.darkest
                        }}
                    >
                        Max
                    </div>
                </div>
                
                <div className="stats-values">
                    {stats.values.map((stat) => (
                        <article className="stat" key={stat.stat}>
                            <header 
                                className="stat-name" 
                                style={{ 
                                    backgroundColor: colors.normal,
                                    color: colors.darkest 
                                }}
                            >
                                {stat.stat}
                            </header>
                            <div className="stat-bar-container">
                                <div 
                                    className="stat-bar" 
                                    style={{ 
                                        backgroundColor: colors.lighter,
                                        color: colors.darkest, 
                                        width: `${(stat[statSelected] / maxStat) * 100}%`
                                    }}
                                >
                                    {stat[statSelected]}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                
                {statSelected === "baseValue" ? (
                    <p className="base-total">
                        Total <span style={{ color: colors.darkest }}>{stats.baseTotal}</span>
                    </p>
                ) : statSelected === "minValue" ? (
                    <p className="stats-description">
                        Min: Pokémon level 100, unfavorable nature, 0 IVs, 0 EVs (Worst)
                    </p>
                ) : (
                    <p className="stats-description">
                        Max: Pokémon level 100, beneficial nature, 31 IVs, 252 EVs (Perfect)
                    </p>
                )}
            </section>
            }
        </>
    )
}