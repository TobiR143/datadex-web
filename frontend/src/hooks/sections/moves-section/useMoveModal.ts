import { useState } from "react"

export const useMoveModal = () => {
    const [open, setOpen] = useState<boolean>(false)

    const handleClick = () => {
        setOpen(true)
    }

    return { 
        open, 
        setOpen, 
        handleClick 
    }
}