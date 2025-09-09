import { useSettings } from "src/hooks/sections/info-section/useSettings"
import { CloseIcon, SettingsIcon, VoiceIcon } from "src/icons/Icons"

type Options = {
    voice: number,
    voiceRange: number
}

export const SpeechVoiceMenu = ({ onChange } : { onChange: (options: Options) => void}) => {
    const { 
        menuRef, 
        voiceValue,
        voiceRange,
        setShowMenu, 
        showMenu, 
        handleChangeVoice,
        handleChangeVoiceRange, 
        closeMenu,
        closing,
    } = useSettings()

    const handleClick = () => {
        onChange({ voice: voiceValue, voiceRange })
        closeMenu()
    }

    return (
        <>
            <div className="info-section-icons-setting" onClick={() => setShowMenu(true)}>
                <SettingsIcon />
            </div>
            { showMenu &&     
                <div ref={menuRef} className={`${closing ? 'slide-down' : ''} show-menu`}>
                    <div>
                        <h2 className="show-menu-title">dataDex voice</h2>
                        <div onClick={closeMenu} className="show-menu-close-icon">
                        <CloseIcon />
                        </div>
                    </div>
                    <div className="show-menu-input-values">
                        <div className="show-menu-input-container">
                            <label className="show-menu-input-label">Tone</label>
                            <input 
                                style={{ 
                                    background: `linear-gradient(
                                        to right, 
                                        #384f61 0%,
                                        #384f61 ${voiceValue / 150 * 100}%, 
                                        #ccc ${voiceValue / 150 * 100}%, 
                                        #ccc 100%
                                    )`
                                }} 
                                value={voiceValue} 
                                onChange={handleChangeVoice} 
                                type="range" 
                                min="0" 
                                max="150" 
                            />
                            <p className="show-menu-input-value">{voiceValue}%</p>
                        </div>
                        <div className="show-menu-input-container">
                            <label className="show-menu-input-label">Voice range</label>
                            <input
                                style={{ 
                                    background: `linear-gradient(
                                        to right, 
                                        #384f61 0%,
                                        #384f61 ${voiceRange / 300 * 100}%, 
                                        #ccc ${voiceRange / 300 * 100}%, 
                                        #ccc 100%
                                    )`
                                }} 
                                value={voiceRange}
                                onChange={handleChangeVoiceRange}
                                type="range" 
                                min="0" 
                                max="300" 
                            />
                            <p className="show-menu-input-value">{voiceRange}%</p>
                        </div>
                        <button onClick={handleClick} className="show-menu-apply-button">
                            <VoiceIcon
                                size={22}
                                color="#ededed"/>
                            <p className="show-menu-apply-button-text">Apply</p>
                        </button>
                    </div>
                </div>
            }
        </>
    )
}