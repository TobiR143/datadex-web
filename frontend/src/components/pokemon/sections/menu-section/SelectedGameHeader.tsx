import type { GameData, Generation, VersionGroup } from "src/types/types"
import "src/styles/pokemon/menu-section/SelectedGameHeader.css"

type Props = {
  selectedGame: GameData | null;
  grouped: Partial<Record<Generation, { versionGroup: VersionGroup; games: GameData[] }[]>>
  vgToGames: Map<VersionGroup, string[]>;
  onClick: () => void;
}

export const SelectedGameHeader = ({ selectedGame, grouped, vgToGames, onClick }: Props) => {
  if (!selectedGame) return null;

  return (
    <section className="pgs-header">
      <span onClick={onClick} className="pgs-button-text">
        {vgToGames.get(selectedGame.versionGroup)?.map((name, idx, arr) => (
          <span
            key={name}
            className={`pgs-pill ${arr.length > 1 ? "group-pill" : "single-pill"}`}
            style={{
              backgroundColor:
                Object.values(grouped)
                  .flatMap((vgList) => vgList.flatMap((vg) => vg.games))
                  .find((g) => String(g.game) === name)?.color || "#7aa6ff",
              color: String(name).includes("white") ? "#454545" : "#ededed",
            }}
          >
            {String(name).replace("-", " ")}
          </span>
        ))}
      </span>
      <p className="pgs-header-description">Select a version of a game to see relevant data like base stats, moves, locations and more</p>
    </section>
  )
}