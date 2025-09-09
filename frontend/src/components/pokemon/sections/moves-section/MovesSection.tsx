import { useContext, useState } from "react"
import { GameContext } from "src/contexts/GameContext"
import { usePokemon } from "src/contexts/PokemonContext"
import { useMoves } from "src/hooks/sections/moves-section/useMoves"
import { LearnType, type GameData, type PokemonByIdResponse } from "src/types/types"
import { LearnTypeSelector } from "./LearnTypeSelector"
import { SectionLoading } from "src/components/pokemon/sections/SectionLoading"
import { TableHeaderItem } from "./TableHeaderItem"
import { MoveDataItem } from "./MoveDataItem"

export const MovesSection = () => {
  const [learnType, setLearnType] = useState<keyof typeof LearnType>("level-up")
  const { selectedGame } = useContext(GameContext) as  { selectedGame: GameData }
  const { pokemon } = usePokemon() as { pokemon: PokemonByIdResponse }
  const { colors } = pokemon
  const { moves, isLoading } = useMoves(pokemon.id, selectedGame)

  return (
    <>
        <LearnTypeSelector onChange={setLearnType} selected={learnType} />

        {isLoading ? (
        <SectionLoading color={colors.normal} />
        ) : (
        moves &&
        moves[learnType as keyof typeof moves] && (
            <>
            {moves[learnType as keyof typeof moves].length === 0 ? (
                <div className="move-row no-moves">
                    No moves are learned using this method
                </div>
            ) : (
                <>
                <div
                    className="table-moves-header"
                    style={{ backgroundColor: colors.lightest }}
                >
                    {learnType === "level-up" 
                        ? <TableHeaderItem color={colors.darkest} text={'Level'} />
                    : learnType === "machine" 
                        && <TableHeaderItem color={colors.darkest} text={'MT/MO'} />
                    }

                    <TableHeaderItem color={colors.darkest} text={'Name'} />
                    <TableHeaderItem color={colors.darkest} text={'Power'} />
                    <TableHeaderItem color={colors.darkest} text={'Accuracy'} />
                    <TableHeaderItem color={colors.darkest} text={'PP'} />
                </div>

                {moves[learnType as keyof typeof moves].map((move, index) => (
                    <MoveDataItem 
                        key={move.move.idMove}
                        move={move}
                        colors={colors}
                        boolean={moves[learnType as keyof typeof moves].length - 1 > index ? true : false}
                        learnType={learnType}
                    />
                ))}
                </>
            )}
            </>
        )
        )}
    </>
    )
}