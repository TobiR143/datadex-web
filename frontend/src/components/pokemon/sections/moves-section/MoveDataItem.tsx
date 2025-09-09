import { InfoIcon } from "src/icons/Icons"
import { LearnType, type Colors, type MoveResponse } from "src/types/types"
import "src/styles/pokemon/moves-section/MoveDataItem.css"
import { useEffect, useState } from "react"
import { MoveModal } from "./MoveModal"
import { useMoveModal } from "src/hooks/sections/moves-section/useMoveModal"

type Props = {
    move: MoveResponse,
    colors: Colors,
    boolean: boolean,
    learnType: keyof typeof LearnType 
}

export const MoveDataItem = ({ move, colors, boolean, learnType } : Props) => {
    const { open, setOpen, handleClick } = useMoveModal()

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey)
    }, [])

    return (
    <>
        { open && <MoveModal move={move} open={open} onClose={() => setOpen(false)} />}
        <div onClick={handleClick} key={move.move.idMove} className="move-row">
            <div className="move-info">
                {
                (learnType === "level-up" || learnType === "machine") && 
                <>
                    <span
                        className="move-info-item"
                        style={{ color: colors.darkest, fontWeight: 500 }}
                    >
                    {learnType === "level-up"
                        ? move?.level === 0
                            ? "-"
                            : move?.level
                        : learnType === "machine"
                            ? move?.mt
                            : ""}
                    </span>
                </>
                }

                <span
                    className="move-info-item"
                    style={{ color: colors.darkest, fontWeight: 500 }}
                >
                    {move.move.name.replace("-", " ")}
                </span>

                <span className="move-info-item">
                    {move.move.power ?? '-'}
                </span>
                <span className="move-info-item">
                    {move.move.accuracy ?? '-'}
                </span>
                <span className="move-info-item">{move.move.pp}</span>
            </div>

            <div className="badges">
                <span className="badge-type">
                    <span
                        style={{
                            backgroundColor: move.move.type.colors.dark,
                        }}
                        className="badge-type-span"
                    >
                        Type
                    </span>
                    <span
                        style={{
                            backgroundColor: move.move.type.colors.normal,
                        }}
                        className="badge-type-name"
                        >
                        {move.move.type.name}
                    </span>
                </span>

                <span
                    className={`badge-category badge-category-${move.move.category}`}
                >
                    {move.move.category}
                </span>

                <span className="badge-info">
                    <InfoIcon size={16} color="#898989" />
                </span>
            </div>
                {boolean 
                ? (
                    <hr />
                ) : (
                    ""
                )}
        </div>
    </>
    )
}