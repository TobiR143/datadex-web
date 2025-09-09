import type { DamageReceived } from "src/types/types"

export const DamageReceivedElementsContainer = ({ damageReceivedArray }: { damageReceivedArray: DamageReceived[] }) => {
    return (
        <div className="damage-received-elements-container">
        {
            damageReceivedArray.map((damageReceived) => (
                <article style={{ backgroundColor: damageReceived.colors.normal }} key={damageReceived.name} className="damage-received-element">
                    <header className="damage-received-element-header">
                        {damageReceived.name}
                    </header>
                    <aside style={{ backgroundColor: damageReceived.colors.dark }} className="damage-received-element-aside">
                        ×{damageReceived?.totalMultiplier}
                    </aside>
                </article>
            ))
        }
        </div>
    )
}