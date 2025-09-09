import { createContext, useContext, useEffect, useState } from "react"
import type { GameData, Generation, GamesByGeneration } from "src/types/types"

export const GameContext = createContext<{
  selectedGame: GameData | null;
  setSelectedGame: (game: GameData) => void;
  gamesByGeneration: Record<Generation, GameData[]> | {};
}>({
  selectedGame: null,
  setSelectedGame: () => {},
  gamesByGeneration: {}
})

type GameProviderProps = {
  children: React.ReactNode;
  gamesByGeneration: GamesByGeneration;
  defaultGame: GameData | null;
}

export const useGameContext = () => useContext(GameContext)

export const GameProvider = ({ children, gamesByGeneration, defaultGame }: GameProviderProps) => {
  const [selectedGame, setSelectedGame] = useState<GameData | null>(defaultGame)

  useEffect(() => {
    if (gamesByGeneration) {
      const gens = Object.keys(gamesByGeneration) as Generation[]
      const lastGen = gens[gens.length - 1]
      setSelectedGame(gamesByGeneration[lastGen][0])
    }
  }, [gamesByGeneration])

  return (
    <GameContext.Provider value={{ selectedGame, setSelectedGame, gamesByGeneration }}>
      {children}
    </GameContext.Provider>
  )
}