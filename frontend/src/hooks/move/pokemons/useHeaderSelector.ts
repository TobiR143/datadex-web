import { useState } from "react"
import { LearnType } from "src/types/types"

export const useHeaderSelector = () => {
    const [selectedLearnType, setSelectedLearnType] = useState<keyof typeof LearnType>("level-up")

    const handleSelect = (key: keyof typeof LearnType) => {
        setSelectedLearnType(key)
    }
    
    return {
        selectedLearnType,
        setSelectedLearnType,
        handleSelect
    }
}