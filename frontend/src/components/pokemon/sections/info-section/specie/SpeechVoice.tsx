import { useEffect, useState } from "react";
import { StopIcon, VoiceIcon } from "src/icons/Icons";
import type { HexColor } from "src/types/types";
import "src/styles/pokemon/info-section/specie/ShowMenu.css"
import { SpeechVoiceMenu } from "./SpeechVoiceMenu";
import { useOptions } from "src/hooks/sections/info-section/useOptions";

export const SpeechVoice = ({ text, color }: { text: string, color: HexColor }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const { options, handleChangeOptions } = useOptions()

    useEffect(() => {
      const loadVoices = () => {
        setVoices(window.speechSynthesis.getVoices())
      }

      loadVoices()
      window.speechSynthesis.onvoiceschanged = loadVoices
    }, [])

    const handleClick = () => {
      if (isPlaying) {
        window.speechSynthesis.cancel()
        setIsPlaying(false)
        return
      }
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      const englishVoice = voices.find((v) => v.lang.startsWith("en"))
      if (englishVoice) {
        utterance.voice = englishVoice
      }

      utterance.rate = options.voiceRange / 200
      utterance.pitch = options.voice / 100
      utterance.volume = 1

      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => setIsPlaying(false)

      window.speechSynthesis.speak(utterance)
    }

  return (
    <>
        <div onClick={handleClick} className="info-section-icons-voice">
            {
              isPlaying
                ? <StopIcon color={color} />
                : <VoiceIcon size={18} color={color} />
            }
        </div>
        <SpeechVoiceMenu onChange={handleChangeOptions} />
    </>
  )
}