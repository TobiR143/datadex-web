import { HomeIcon } from "src/icons/Icons"
import type { Colors } from "src/types/types"
import "src/styles/pokemon/menu-section/NavigationHome.css"

export const NavigationHome = ({ colors } : { colors: Colors }) => {
    return (
        <div className="home-navigation-container">
            <a href="/"className="home-navigation">
                <HomeIcon color={colors.darkest} />
                <p style={{ color: colors.darkest }} className="home-navigation-text">Home</p>
            </a>
            <div className="home-navigation-description-container">
                <p className="home-navigation-description">Press home button to return to main screen</p>
                <p className="home-navigation-description">Alternatively, press below buttons to go to previous or next Pokemon in list</p>
            </div>
        </div>
    )
}