import type { Type, Generation, TypeData, GenerationData } from "../../types/types.ts"
import "@styles/index/Selectors.css"
import { useSelectors } from "../../hooks/index/useSelectors.ts"

type Props = {
  types: TypeData[]
  generations: GenerationData[]
  onChangeFilters: (filters: { type: Type | null, generation: Generation | null }) => void
}

export const Selectors = ({ types, generations, onChangeFilters }: Props) => {
  const {
    showMenu,
    closing,
    selectedType,
    selectedGeneration,
    setShowMenu,
    handleSelect,
    menuRef
  } = useSelectors({ types, generations, onChangeFilters })

  return (
    <>
      <div className="selectors-container">
        <div style={
          selectedType !== "All Types"
            ? { backgroundColor: types.find(t => t.name === selectedType)?.color, color: "#fff", textTransform: "uppercase" }
            : {}
          } className="selector-button types" onClick={() => setShowMenu("type")}>
            {selectedType}
        </div>
        <hr />
        <div className="selector-button generations" onClick={() => setShowMenu("generation")}>
          {selectedGeneration}
        </div>
      </div>

      {showMenu && (
        <div ref={menuRef} className={`selector-menu ${closing ? "slide-down" : "slide-up"}`}>
          <h3 className="selector-title">Select a {showMenu === "type" ? "type" : "generation"}</h3>
          <div className="selector-options">
            {(showMenu === "type"
              ? ["All Types", ...types.map(t => t.name)]
              : ["All Generations", ...generations.map(g => g.name)]
            ).map(value => {
              const typeColor =
                showMenu === "type" && value !== "All Types"
                  ? types.find(t => t.name === value)?.color
                  : undefined

              return (
                  <div
                    key={value}
                    className="selector-option"
                    style={typeColor ? { backgroundColor: typeColor, color: "#fff" } : {}}
                    onClick={() => handleSelect(value as Type | Generation | "All Types" | "All Generations", showMenu)}
                  >
                    {value}
                  </div>
                )
          })}
          </div>
        </div>
      )}
    </>
  )
}
