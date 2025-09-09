import { useMemo } from "react";
import type { GameData, Generation, VersionGroup } from "src/types/types";

export const useVersionGroupMap = (grouped: Partial<Record<Generation, { versionGroup: VersionGroup; games: GameData[] }[]>>) => {
  return useMemo(() => {
    const map = new Map<VersionGroup, string[]>()

    Object.values(grouped).forEach((vgList) => {
      vgList?.forEach(({ versionGroup, games }) => {
        const list = map.get(versionGroup) ?? []
        games.forEach((g) => {
          const gameId = typeof g.game === "string" && g.game
          if (gameId && !list.includes(gameId)) list.push(gameId)
        })
        map.set(versionGroup, list)
      })
    })

    return map
  }, [grouped])
}