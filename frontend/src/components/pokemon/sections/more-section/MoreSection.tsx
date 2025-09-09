import { DamageReceivedSection } from "./damage-received/DamageReceivedSection"
import { TrainingSection } from "./training/TrainingSection"
import { BreedingSection } from "./breeding/BreedingSection"

export const MoreSection = () => {
    return (
        <>
            <DamageReceivedSection />
            <TrainingSection />
            <BreedingSection />
        </>
    )
}