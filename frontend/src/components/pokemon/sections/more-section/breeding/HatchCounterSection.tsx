import type { Colors, HatchCounter } from "src/types/types"
import "src/styles/pokemon/more-section/breeding/HatchCounterSection.css"

type Props = {
    hatchCounter: HatchCounter,
    colors: Colors
}

export const HatchCounterSection = ({ hatchCounter, colors } : Props) => {
    return (
        <article className="hatch-counter">
            <div className="hatch-counter-div">
                <span style={{ color: colors.darkest }} className="hatch-counter-cicles">
                    {hatchCounter.cicles}
                </span>
                <span className="hatch-counter-steps">
                    ({hatchCounter.steps} steps)
                </span>
            </div>
            <p className="hatch-counter-description">Hatch Counter</p>
        </article>
    )
}