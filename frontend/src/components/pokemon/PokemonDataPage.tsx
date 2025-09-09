import { useState } from "react";
import { PokemonCard } from "./PokemonCard.tsx";
import type { PokemonByIdResponse } from "src/types/types.ts"
import { InfoSection } from "./sections/info-section/InfoSection.tsx";
import { MovesSection } from "./sections/moves-section/MovesSection.tsx";
import { MoreSection } from "./sections/more-section/MoreSection.tsx";
import { MenuSection } from "./sections/menu-section/MenuSection.tsx";
import { GameProvider } from "../../contexts/GameContext.tsx";
import { InfoIcon, MenuIcon, MoreIcon, SwordIcon } from "../../icons/Icons.tsx";
import "../../styles/pokemon/SectionSelector.css";
import { useGames } from "src/hooks/sections/menu-section/useGames.ts";
import { PokemonProvider } from "src/contexts/PokemonContext.tsx";

export const PokemonDataPage = ({ pokemon } : { pokemon: PokemonByIdResponse }) => {
    const [activeSection, setActiveSection] = useState<"info" | "moves" | "more" | "menu">("info");
    const { gamesByGeneration, defaultGame } = useGames({ id: pokemon.id })

    return (
        <PokemonProvider pokemon={pokemon}>
        {
            defaultGame && (
                <GameProvider gamesByGeneration={gamesByGeneration} defaultGame={defaultGame} >
                    <PokemonCard />
                    <main style={{ paddingBottom: '100px' }} className="section-container">
                        { activeSection === "info" && <InfoSection /> }
                        { activeSection === "moves" && <MovesSection /> }
                        { activeSection === "more" && <MoreSection /> }
                        { activeSection === "menu" && <MenuSection /> }
                    </main>
                    <footer style={{ backgroundColor: pokemon.colors.normal }} className="section-selector">
                        <button style={{ color: pokemon.colors.darkest }} className="footer-button" onClick={() => setActiveSection("info")}>
                            <InfoIcon size={32} color={ pokemon.colors.darkest } />
                            { activeSection === "info" &&  <label>Info</label> }
                        </button>
                        <button style={{ color: pokemon.colors.darkest }} className="footer-button" onClick={() => setActiveSection("moves")}>
                            <SwordIcon color={ pokemon.colors.darkest } />
                            { activeSection === "moves" &&  <label>Moves</label> }
                        </button>
                        <button style={{ color: pokemon.colors.darkest }} className="footer-button" onClick={() => setActiveSection("more")}>
                            <MoreIcon color={ pokemon.colors.darkest } />
                            { activeSection === "more" &&  <label>More</label> }
                        </button>
                        <button style={{ color: pokemon.colors.darkest }} className="footer-button" onClick={() => setActiveSection("menu")}>
                            <MenuIcon color={ pokemon.colors.darkest } />
                            { activeSection === "menu" &&  <label>Menu</label> }
                        </button>
                    </footer>
                </GameProvider>
            )
        }
        </PokemonProvider>

        /*
<section>
        {
            pokemon.evolutionChain.map(evo => (
                <article>
                    <p>{evo.from.id}</p>
                    <h2>{evo.from.name}</h2>
                    <img src={evo.from.img} alt={evo.from.name}>
                    {
                        evo.from.types.map(type => (
                            <div>{type}</div>
                        ))
                    }
                </article>
                <p>{evo.method}</p>
                <article>
                    <p>{evo.to.id}</p>
                    <h2>{evo.to.name}</h2>
                    <img src={evo.to.img} alt={evo.to.name}>
                    {
                        evo.to.types.map(type => (
                            <div>{type}</div>
                        ))
                    }
                </article>
            ))
        }
    </section>
*/
    )
}