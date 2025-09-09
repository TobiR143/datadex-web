import { usePokemon } from "src/contexts/PokemonContext";
import type { MoveResponse, PokemonByIdResponse } from "src/types/types";
import "src/styles/pokemon/moves-section/MoveModal.css"
import { useEffect, useState } from "react";

type Props = {
    move: MoveResponse
    open: boolean
    onClose?: () => void
}

export const MoveModal = ({ move, open, onClose } : Props) => {
    const { pokemon } = usePokemon() as { pokemon: PokemonByIdResponse }
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
        <section 
            className={`move-modal ${closing ? "slide-out" : ""}`} 
            onClick={handleClose}
        >
        <div className="move-modal-content">
            <header style={{ backgroundColor: pokemon.colors.normal }} className="move-modal-header">
                <h2 style={{ color: pokemon.colors.darkest }} className="move-modal-title">{move.move.name.replaceAll('-',' ')}</h2>
                <p style={{ color: pokemon.colors.darkest }} className="move-modal-description">{pokemon.name} move</p>
            </header>
            <aside className="move-modal-aside">
                <div>
                    <article className="move-modal-type-name">
                        <p 
                            className="move-modal-type-name-content" 
                            style={{ backgroundColor: move.move.type.colors.normal }}
                        >{move.move.type.name}</p>
                        <p className="move-modal-article-description">Type</p>
                    </article>
                    <article className="move-modal-category">
                        <p 
                            className={`move-modal-category-content move-modal-category-${move.move.category}`}
                        >{move.move.category}</p>
                        <p className="move-modal-article-description">Category</p>
                    </article>
                </div>
                <div>
                    <article className="move-modal-article">
                        <p className="move-modal-article-text">{move.move.power ?? '-'}</p>
                        <p className="move-modal-article-description">Power</p>
                    </article>
                    <article className="move-modal-article">
                        <p className="move-modal-article-text">{move.move.accuracy ?? '-'}</p>
                        <p className="move-modal-article-description">Accuracy</p>
                    </article>
                    <article className="move-modal-article">
                        <p className="move-modal-article-text">{move.move.pp}</p>
                        <p className="move-modal-article-description">PP</p>
                    </article>
                </div>
            </aside>
            <main className="move-modal-main">
                <article className="move-modal-section move-modal-game-description">
                    <h3 style={{ color: pokemon.colors.darkest }} className="move-modal-section-title">Game description</h3>
                    <p className="move-modal-section-text">{move.move.description}</p>
                </article>
                <article className="move-modal-section move-modal-effect">
                    <h3 style={{ color: pokemon.colors.darkest }} className="move-modal-section-title">Effect</h3>
                    <p className="move-modal-section-text">{move.move.effect}</p>
                </article>
            </main>
            <a 
                style={{ backgroundColor: pokemon.colors.darkest }}
                className="pokemon-who-learn-move-a" 
                href={`/move/${move.move.idMove}/pokemons`}
                >
                Pokemons who learn this move
            </a>
        </div>
        </section>
    )
}