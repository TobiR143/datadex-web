import type { Colors } from "src/types/types"
import "src/styles/pokemon/more-section/training/BaseValuesSection.css"

type Props = {
    baseExperience: number,
    baseHappiness: number,
    colors: Colors
}

export const BaseValuesSection = ({ baseExperience, baseHappiness, colors } : Props) => {
    return (
        <article className="base-values">
            <div className="base-happiness">
                <div className="base-happiness-value">
                    <span style={{ color: colors.darker }}>{baseHappiness}</span>
                </div>
                <p className="training-description base-happiness-description">Base Happiness</p>
            </div>
            <div className="base-experience">
                <div className="base-experience-value">
                    <span style={{ color: colors.darker }}>{baseExperience}</span>
                </div>
                <p className="training-description base-experience-description">Base Experience</p>
            </div>
        </article>
    )
}