import "src/styles/pokemon/menu-section/PrevNextSection.css"
import type { Colors } from "src/types/types"
import { PrevNextSection } from "./PrevNextSection"
import "src/styles/pokemon/menu-section/NavigationSection.css"
import { NavigationHome } from "./NavigationHome"
import { usePrevNext } from "src/hooks/sections/menu-section/usePrevNext"
import { SectionLoading } from "../SectionLoading"

type Props = {
    id: number,
    colors: Colors
}

export const NavigationSection = ({ id, colors } : Props) => {
    const { prev, next, isLoading } = usePrevNext(id)

    return (
        <>
            <h2 style={{ color: colors.darkest }} className="navigation-section-title">Navigation</h2>
            { isLoading ? 
                <SectionLoading color={colors.normal}/>
            :
                <section className="navigation-section">
                    <NavigationHome colors={colors} />
                    <PrevNextSection prev={prev} next={next}/>
                </section>
            }
        </>
    )
}