import type { GameData, Generation, VersionGroup } from "src/types/types"
import "src/styles/pokemon/menu-section/GameList.css"

type Props = {
  grouped: Partial<Record<Generation, { versionGroup: VersionGroup; games: GameData[] }[]>>
  onSelect: (game: GameData) => void
}

export const GameList = ({ grouped, onSelect }: Props) => {
  return (
    <div className="pgs-list">
      {Object.entries(grouped).map(([genKey, vgList]) => (
        <section key={genKey} className="pgs-gen">
          <h4 className="pgs-gen-title">{genKey.replace("-", " ")}</h4>

          {vgList.map(({ versionGroup, games }) => (
            <div key={versionGroup} className="pgs-vg-block">
              <div className="pgs-games-row">
                {games.map((g) => (
                  <button
                    key={g.game}
                    style={{
                      color: String(g.game).includes("white") ? "#454545" : "#ededed",
                      backgroundColor: g.color,
                    }}
                    className={String(versionGroup).includes("_") ? "pgs-pill group-pill" : "pgs-pill single-pill"}
                    onClick={() => onSelect(g)}
                  >
                    {String(g.game).replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}