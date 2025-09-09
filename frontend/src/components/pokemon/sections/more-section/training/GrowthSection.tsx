import type { Colors, GrowthRateTraining } from "src/types/types"
import "src/styles/pokemon/more-section/training/GrowthSection.css"

type Props = {
    growth: GrowthRateTraining,
    colors: Colors
}

export const GrowthSection = ({ growth, colors } : Props) => {
    return (
        <article className="growth-curve-container">
            <div className="growth-curve-container-div">
                {
                    growth &&
                        <div className="growth-curve">
                            <span 
                                style={{ color: colors.darker }}
                                className="growth-curve-rate"
                                >{String(growth.rate).replace('-',' ')}
                            </span>
                            <span 
                                className="growth-curve-experience"
                            >
                                ({growth.experience} Experience)
                            </span>
                        </div>
                }
            </div>
            <p className="training-description growth-curve-description">Growth curve</p>
        </article>
    )
}