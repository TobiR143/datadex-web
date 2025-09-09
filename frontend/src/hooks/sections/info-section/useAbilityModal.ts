import { useState } from "react"
import type { Ability } from "src/types/types"

export const useAbilityModal = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [selectedAbility, setSelectedAbility] = useState<{ ability: Ability, type: "hidden" | "normal" | ""}>({
        ability: "" as unknown as Ability,
        type: ""
    })

    const handleClick = (ability: Ability, abilities: { normal: Ability[], hidden: Ability[] }) => {
        setOpen(true)
        setSelectedAbility({
            ability,
            type: (abilities && !Array.isArray(abilities) && abilities.normal.some(a => a.name === ability.name)) ? "normal" : "hidden"
        })
    }

    return { 
        open, 
        setOpen, 
        selectedAbility, 
        handleClick 
    }
}