import type { Colors, EggGroup } from "src/types/types"
import "src/styles/pokemon/more-section/breeding/EggGroups.css"
import { InfoIcon } from "src/icons/Icons"

type Props = {
    eggGroups: EggGroup[],
    colors: Colors
}

export const EggGroups = ({ eggGroups, colors } :  Props) => {
    return (
        <article className="egg-groups-section">
            <div className="egg-groups-section-div">
                {
                    eggGroups.map((eggGroup) => (
                        <a href={`/egg-group/${eggGroup}`} key={eggGroup} style={{ backgroundColor: colors.normal, color: colors.darkest }} className="egg-group">
                            <span className="egg-group-name">{eggGroup}</span>
                            <InfoIcon 
                                color={colors.darkest}
                                size={24}
                            />
                        </a>
                    ))
                }
            </div>
            <p className="egg-groups-description">Egg Groups</p>
        </article>
    )
}