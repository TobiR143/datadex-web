import { LearnType } from "src/types/types"
import "src/styles/move/pokemons/HeaderSelector.css"

type Props = {
    onSelect: (key: keyof typeof LearnType) => void
    selectedLearnType: keyof typeof LearnType
}

export const HeaderSelector = ({ onSelect, selectedLearnType }: Props) => {
    return (
        <>
            <div className="header-learn-type-selector">
                {Object.entries(LearnType).map(([key, learnType]) => (
                    <button 
                        style={
                            key === selectedLearnType
                                ? { color: '#641a1a', backgroundColor: '#a35252' }
                                : { color: '#701c1c', backgroundColor:'#da7c7cff' }
                        }
                        className="header-learn-type"
                        onClick={() => onSelect(key as keyof typeof LearnType)}
                        key={key}
                        >
                        {learnType}
                    </button>
                ))}
            </div>
            <hr style={{ width: '100%' }} />
        </>
    )
}