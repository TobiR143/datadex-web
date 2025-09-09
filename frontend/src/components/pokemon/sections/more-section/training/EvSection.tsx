import type { Colors, Ev } from "src/types/types"
import "src/styles/pokemon/more-section/training/EvSection.css"

type Props = {
    evArray: Ev[],
    colors: Colors
}

export const EvSection = ({ evArray, colors } : Props) => {
    return (
        <article className="training-ev-container">
            <div className="training-ev-container-div">
                {
                    evArray
                    .map((ev, index) => (
                        <div key={ev.stat} className="training-ev">
                            <span style={{ color: colors.darker }} className="training-ev-value">
                                {ev.ev}
                            </span>{" "}
                            <span className="training-ev-stat">
                                {String(ev.stat).replace("-", " ").replace("special", "sp.")}
                            </span>
                            {index < evArray.length - 1 && (
                                <span className="training-separator"> - </span>
                            )}
                        </div>
                    ))
                }
            </div>
            <p className="training-description ev-description">EVs provided</p>
        </article>
    )
}