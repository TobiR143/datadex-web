import type { HexColor } from "src/types/types";
import "src/styles/pokemon/moves-section/TableHeaderItem.css"

type Props = {
    color: HexColor,
    text: string
}

export const TableHeaderItem = ({ color, text } : Props) => {
    return (
        <span
            style={{ color }}
            className="table-moves-header-item"
        >{text}</span>
    )
}