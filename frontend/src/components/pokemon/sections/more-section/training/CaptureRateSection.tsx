import type { CaptureRate, Colors } from "src/types/types"
import "src/styles/pokemon/more-section/training/CaptureRateSection.css"

type Props = {
    captureRate: CaptureRate,
    colors: Colors
}

export const CaptureRateSection = ({ captureRate, colors } : Props) => {
    return (
        <article className="capture-rate-container">
            <div className="capture-rate-container-div">
                {
                    captureRate && 
                        <div className="capture-rate">
                            <span 
                                style={{ color: colors.darker }}
                                className="capture-rate-value"
                                >{captureRate.value}
                            </span>
                            <span 
                                className="capture-rate-percentage"
                            >
                                ({captureRate.percentage}% - Pokeball - max HP)
                            </span>
                        </div>
                }
            </div>
            <p className="training-description capture-rate-description">Capture Rate</p>
        </article>
    )
}