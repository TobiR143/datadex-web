import { useEffect, useRef, useState } from "react"
import { MusicNoteIcon, StopIcon } from "src/icons/Icons"
import type { HexColor } from "src/types/types"

export const PokemonCry = ({ audio, color }: { audio: string, color: HexColor }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(audio)
        }

        const handleEnded = () => {
            setIsPlaying(false)
        }

        audioRef.current.addEventListener("ended", handleEnded)

        return () => {
            audioRef.current?.removeEventListener("ended", handleEnded)
        }
    }, [audio])

    const handleClick = () => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(false)
        } else {
            audioRef.current.currentTime = 0
            audioRef.current.play()
            setIsPlaying(true)
        }
    }

    return (
        <div onClick={handleClick} className="info-section-icons-container">
            {
                isPlaying
                    ? <StopIcon color={color} />
                    : <MusicNoteIcon color={color} />
            }
        </div>
    )
}