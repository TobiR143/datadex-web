import { useMemo } from "react";
import type { GameData, Generation, VersionGroup } from "src/types/types";

export function useGroupedGames(
  gamesByGeneration: Partial<Record<Generation, GameData[]>>
) {
  return useMemo(() => {
    if (!gamesByGeneration) return {} as Partial<Record<Generation, { versionGroup: VersionGroup; games: GameData[] }[]>>

    const res: Partial<Record<Generation, { versionGroup: VersionGroup; games: GameData[] }[]>> = {}

    Object.entries(gamesByGeneration).forEach(([gen, games]) => {
      if (!games) return
      const byVG: { [key in VersionGroup]?: GameData[] } = {}
      games.forEach((g) => {
        (byVG[g.versionGroup] ||= []).push(g)
      })

      res[gen as Generation] = Object.entries(byVG).map(([vg, arr]) => ({
        versionGroup: vg as unknown as VersionGroup,
        games: arr,
      }))
    })

    return res
  }, [gamesByGeneration])
}