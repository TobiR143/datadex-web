import type { HexColor } from "src/types/types"
import "src/styles/pokemon/SectionLoading.css"

export const SectionLoading = ({ color }: { color: HexColor }) => {
    return (
        <section className="section-loading">
            <div className="loader-circle" style={{ color: color }}></div>
        </section>
    )
}