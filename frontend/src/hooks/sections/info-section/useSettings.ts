import { useEffect, useRef, useState } from "react"

export const useSettings = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [closing, setClosing] = useState<boolean>(false)
    const [voiceValue, setVoiceValue] = useState<number>(100)
    const [voiceRange, setVoiceRange] = useState<number>(200)
    const menuRef = useRef<HTMLDivElement>(null)

    const closeMenu = () => {
        setClosing(true)
        setTimeout(() => {
            setShowMenu(false)
            setClosing(false)
        }, 300)
    }

    const handleChangeVoice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value)
        setVoiceValue(newValue)
    }

    const handleChangeVoiceRange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value)
        setVoiceRange(newValue)
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                closeMenu()
            }
        }
        if (showMenu) document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [showMenu])

    return {
        showMenu,
        setShowMenu,
        closing,
        setClosing,
        voiceValue,
        setVoiceValue,
        voiceRange,
        setVoiceRange,
        menuRef,
        handleChangeVoice,
        handleChangeVoiceRange,
        closeMenu
    }
}