import React from "react"
import type { EvolutionNode as EvolutionNodeType } from "src/types/types"

export const EvolutionNode = ({ node }: { node: EvolutionNodeType }) => {
  if (node.evolvesTo && node.evolvesTo.length > 1) {
    return (
      <div className="evolution-branches multi-branch">
        {node.evolvesTo.map((evo) => (
          <div key={evo.id} className="evolution-branch">
            <div className="evolution-node">
              <a
                style={{ backgroundColor: node.colors.normal}} 
                href={`/pokemon/${node.id}`}
                className="pokemon-card-evolution"
              >
                <div style={{ backgroundColor: node.colors.lightest}} className="pokemon-card-evolution-img-container">
                  <img src={node.img} alt={node.name} />
                </div>
                <p style={{ color: node.colors.darkest }} >#{node.id}</p>
                <p style={{ color: node.colors.darkest }} >{node.name}</p>
                <div className="types-badges">
                  {node.types.map((type) => (
                    <span
                      style={{ borderColor: node.colors.darkest, color: node.colors.darkest }} 
                      key={type}
                      className={`type-badge type-${type}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </a>
              <div className="evolution-method-container">
                <div className="arrow arrow--line"></div>
                <p className="method">{evo.method}</p>
              </div>

              <EvolutionNode node={evo as EvolutionNodeType} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="evolution-node">
      <a 
        style={{ backgroundColor: node.colors.normal}} 
        href={`/pokemon/${node.id}`} 
        className="pokemon-card-evolution"
      >
        <div
          style={{ backgroundColor: node.colors.lightest }}  
          className="pokemon-card-evolution-img-container"
        >
          <img src={node.img} alt={node.name} />
        </div>
        <p style={{ color: node.colors.darkest }} >#{node.id}</p>
        <p style={{ color: node.colors.darkest }} >{node.name}</p>
        <div className="types-badges">
          {node.types.map((type) => (
            <span
              style={{ borderColor: node.colors.darkest, color: node.colors.darkest }} 
              key={type}
              className={`type-badge type-${type}`}
            >
              {type}
            </span>
          ))}
        </div>
      </a>

      {node.evolvesTo && node.evolvesTo.length === 1 && (
        <div className="evolution-branches single-branch">
          {node.evolvesTo.map((evo) => (
            <React.Fragment key={evo.id}>
              <div className="evolution-method-container">
                <div className="arrow arrow--line"></div>
                <p className="method">{evo.method}</p>
              </div>
              <div className="evolution-branch">
                <EvolutionNode node={evo as EvolutionNodeType} />
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  )
}
