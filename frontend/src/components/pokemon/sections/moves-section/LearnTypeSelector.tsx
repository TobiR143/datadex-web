import { LearnType, type PokemonByIdResponse } from "src/types/types"
import "src/styles/pokemon/moves-section/LearnTypeSelector.css"
import { usePokemon } from "src/contexts/PokemonContext"

type Props = {
    onChange: (value: keyof typeof LearnType) => void
    selected: keyof typeof LearnType
}

export const LearnTypeSelector = ({ onChange, selected }: Props) => {
    const { pokemon } = usePokemon() as { pokemon: PokemonByIdResponse }
    const { colors } = pokemon

    return (
        <div className="learn-type-selector-container">
            <div className="learn-type-selector">
            {Object.keys(LearnType).map((key) => (
                <button
                    key={key}
                    className="learn-type"
                    style={{
                        backgroundColor: selected === key ? colors.normal : colors.lighter,
                        color: colors.darkest,
                        fontWeight: selected === key ? "bold" : 500,
                    }}
                    onClick={() => onChange(key as keyof typeof LearnType)}
                >
                {LearnType[key as keyof typeof LearnType]}
                </button>
            ))}
            </div>
            <p className="learn-type-selector-description">Learning methods of moves</p>
        </div>
    )
}