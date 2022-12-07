import { useState } from "react";
import Elements from "./Elements";
import Polling from "./Polling";

const AdminPanelSettings = () => {
    const [settingsNames,setSettingsNames] = useState([
        {name:'Elements',status:true},
        {name:'Modbus',status:false},
    ])
    const [currentSetting,setCurrentSetting] = useState({name:'Elements',status:true});
    const selectSetting = (index)=>{
        const newSettings = JSON.parse(JSON.stringify(settingsNames));
        newSettings.forEach((setting)=>{setting.status=false});
        newSettings[index].status = true;
        setCurrentSetting(newSettings[index]);
        setSettingsNames(newSettings);
    }
    return (
        <>
        <div className="settingsWrapper">
            <div className="settingsBody">
                <div className="settingsNamesList">
                    {
                        settingsNames.map((setting,index)=>(
                            <div 
                                key = {index} 
                                className={`settingsNamesElement ${setting.status?'active':''}`}
                                onClick={()=>(selectSetting(index))}
                                >
                                <span>{setting.name}</span>
                            </div>
                        ))
                    }
                </div>
                <div className="settingsList">
                    <div className="currentSettingTitle">{currentSetting.name}</div>
                    <div className="currentSetting">
                        {
                            currentSetting.name==="Elements"
                            ?
                            <Elements/>
                            :
                            currentSetting.name==="Modbus"
                            ?
                            <Polling/>
                            :
                            <>
                            Something wrong
                            </>
                        }
                        
                    </div>
                </div>          
            </div>
        </div>
        </>
    );
};

export default AdminPanelSettings;