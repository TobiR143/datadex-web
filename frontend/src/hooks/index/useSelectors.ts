import { useState, useRef, useEffect } from "react"
import type { Type, Generation, TypeData, GenerationData } from "../../types/types.ts"

export const useSelectors = ({
  types,
  generations,
  onChangeFilters
}: {
  types: TypeData[]
  generations: GenerationData[]
  onChangeFilters: (filters: { type: Type | null, generation: Generation | null }) => void
}) => {
  const [showMenu, setShowMenu] = useState<"type" | "generation" | null>(null)
  const [closing, setClosing] = useState(false)
  const [selectedType, setSelectedType] = useState<Type | "All Types">("All Types")
  const [selectedGeneration, setSelectedGeneration] = useState<Generation | "All Generations">("All Generations")
  const menuRef = useRef<HTMLDivElement>(null)

  const closeMenu = () => {
    setClosing(true)
    setTimeout(() => {
      setShowMenu(null)
      setClosing(false)
    }, 300)
  }

  const handleSelect = (
    value: Type | Generation | "All Types" | "All Generations",
    category: "type" | "generation"
  ) => {
    if (category === "type") {
      if (value === "All Types" || types.some(t => t.name === value)) {
        setSelectedType(value as Type | "All Types")
        onChangeFilters({
          type: value === "All Types" ? null : value as Type,
          generation: selectedGeneration === "All Generations" ? null : selectedGeneration
        })
      }
    } else {
      if (value === "All Generations" || generations.some(g => g.name === value)) {
        setSelectedGeneration(value as Generation | "All Generations")
        onChangeFilters({
          type: selectedType === "All Types" ? null : selectedType,
          generation: value === "All Generations" ? null : value as Generation
        })
      }
    }
    closeMenu()
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
    closing,
    selectedType,
    selectedGeneration,
    setShowMenu,
    handleSelect,
    closeMenu,
    menuRef
  }
}