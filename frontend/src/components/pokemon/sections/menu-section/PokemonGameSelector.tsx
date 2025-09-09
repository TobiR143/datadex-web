import { useEffect, useState } from "react";
import { useGameContext } from "src/contexts/GameContext";
import { useGroupedGames } from "src/hooks/sections/menu-section/useGroupedGames";
import { SelectedGameHeader } from "./SelectedGameHeader";
import { GameList } from "./GameList";
import "src/styles/pokemon/menu-section/PokemonGameSelector.css";
import { useVersionGroupMap } from "src/hooks/sections/menu-section/useVersionGroupMap";

export const PokemonGameSelector = () => {
  const { gamesByGeneration, selectedGame, setSelectedGame } = useGameContext()
  const [open, setOpen] = useState(false)

  const grouped = useGroupedGames(gamesByGeneration)
  const vgToGames = useVersionGroupMap(grouped)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div className="pgs-root">
      <SelectedGameHeader
        selectedGame={selectedGame}
        grouped={grouped}
        vgToGames={vgToGames}
        onClick={() => setOpen(true)}
      />

      {open && (
        <div className="pgs-overlay" onClick={() => setOpen(false)}>
          <div className="pgs-sheet" onClick={(e) => e.stopPropagation()}>
            <h3 className="pgs-title">Select a game edition</h3>
            <GameList
              grouped={grouped}
              onSelect={(g) => {
                setSelectedGame(g)
                setOpen(false)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}