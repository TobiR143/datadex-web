import { FemaleIcon, MaleIcon } from "src/icons/Icons"
import "src/styles/pokemon/more-section/breeding/GenderRateSection.css"

type Props = {
    maleRate: number,
    femaleRate: number
}

export const GenderRateSection = ({ maleRate, femaleRate } : Props) => {
    return (
        <article className="gender-rate">
            <div className="gender-rate-values">
                <div 
                    style={{ width: `${maleRate > 75 ? 75 : maleRate < 25 ? 25 : maleRate}%` }} 
                    className="gender-male"
                >
                    <MaleIcon />
                    <p>{maleRate}%</p>
                </div>
                <div 
                    style={{ width: `${femaleRate > 75 ? 75 : femaleRate < 25 ? 25 : femaleRate }%` }} 
                    className="gender-female">
                    <FemaleIcon />
                    <p>{femaleRate}%</p>
                </div>
            </div>
            <p className="gender-rate-description">Gender Rate</p>
        </article>
    )
}