import { useState } from "react";
import { useSelector } from "react-redux";
import { setPollingSettings } from "../../../http/deviceAPI";

const Polling = () => {
    const pollingSettings = useSelector(state=>state.settings.pollingSettings)
    const [currentPollingSettingsState,setCurrentPollingSettingsState] = useState({
        polling_frequency:pollingSettings.polling_frequency,
        polling_timeslot:pollingSettings.polling_timeslot,
        holding_registers_count:pollingSettings.holding_registers_count,
        input_registers_count:pollingSettings.input_registers_count,
        coils_count:pollingSettings.coils_count,
    })
    const updateCurrentPollingSettings = (settingName,newSettingValue)=>{
        const newSettings = JSON.parse(JSON.stringify(currentPollingSettingsState));
        newSettings[settingName] = newSettingValue;
        setCurrentPollingSettingsState(newSettings);
    }
    const applyNewPollingSettings = async()=>{
        try {
            const data = await setPollingSettings(JSON.stringify(currentPollingSettingsState));
            alert(data.message);
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    }
    return (
        <>
        <div className="settingBlock">
            <div className="setting">
                <span>Polling frequency</span>
                <input
                value={currentPollingSettingsState.polling_frequency}
                onChange ={(e)=>updateCurrentPollingSettings("polling_frequency",e.target.value)}
                type="text"
                />
            </div>
            <hr/>
            <div className="setting">
                <span>Polling timeslot</span>
                <input
                value={currentPollingSettingsState.polling_timeslot}
                onChange ={(e)=>updateCurrentPollingSettings("polling_timeslot",e.target.value)}
                type="text"
                />
            </div>
        </div>
        <div className="settingBlock">
            <div className="setting">
                <span>Holding registers count</span>
                <input
                value={currentPollingSettingsState.holding_registers_count}
                onChange ={(e)=>updateCurrentPollingSettings("holding_registers_count",e.target.value)}
                type="text"
                />
            </div>
            <hr/>
            <div className="setting">
                <span>Input registers count</span>
                <input
                value={currentPollingSettingsState.input_registers_count}
                onChange ={(e)=>updateCurrentPollingSettings("input_registers_count",e.target.value)}
                type="text"
                />
            </div>
            <hr/>
            <div className="setting">
                <span>Coils count</span>
                <input
                value={currentPollingSettingsState.coils_count}
                onChange ={(e)=>updateCurrentPollingSettings("coils_count",e.target.value)}
                type="text"
                />
            </div>
        </div>
        <div onClick={(e)=>applyNewPollingSettings()} id="ApplySettingsBtn">APPLY</div>
        </>
    );
};

export default Polling;