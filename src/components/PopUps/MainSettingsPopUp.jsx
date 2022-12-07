import { React, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSettignsAction } from '../../store/reducers/settingsReducer';
import PopUpWrapper from './PopUpWrapper';
const MainSettingsPopUp = memo(({isPopUpOpen,togglePopup}) => {
    const colorPickerImgSrc = "data:image/png;base64,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";
    const dispatch = useDispatch();    
    const user = useSelector(state=>state.user.user)
    const settings = useSelector(state=>state.settings.settings)
    const [currentSetting,setCurrentSetting] = useState({name:'Color',status:true});
    const [settingsNames,setSettingsNames] = useState([
        {name:'Color',status:true},
    ])
    const selectSetting = (index)=>{
        const newSettings = JSON.parse(JSON.stringify(settingsNames));
        newSettings.forEach((setting)=>{setting.status=false});
        newSettings[index].status = true;
        setCurrentSetting(newSettings[index]);
        setSettingsNames(newSettings);
    }
    const [currentElementStyles,updCurElemStyles] = useState(
    {
        mainBackground:settings.mainBackground,
        colorAccent:settings.colorAccent,
        textColor:settings.textColor,
    })
    const updStyle = (style,value) =>{
        if(!user.editMode){alert("Access denied");return;}
        const newStyles = JSON.parse(JSON.stringify(currentElementStyles));
        newStyles[style] = value;
        dispatch(setSettignsAction(newStyles))
        updCurElemStyles(newStyles)
    }
   
    return (
        <PopUpWrapper width={800} height = {600} isPopUpOpen={isPopUpOpen} togglePopup = {togglePopup} idName={"settingsPopUp_body"}>
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
                    <div id="currentSettingTitle">{currentSetting.name}</div>
                    {
                        currentSetting.name==="Color"
                        ?
                        (
                        <div className="currentSetting">
                            <div className="settingBlock">
                                <div className="setting">
                                    <span>Change Main Background Color</span>
                                    <div className="colorPickerBlock">
                                        <input
                                        id="mainBackgroundPicker"
                                        value={currentElementStyles.mainBackground}
                                        onChange ={(e)=>updStyle("mainBackground",e.target.value)}
                                        type="color"
                                        />
                                        <label htmlFor="mainBackgroundPicker">
                                            <img className='colorPickerMultiply' src={colorPickerImgSrc} alt="" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="settingBlock">
                                <div className="setting">
                                    <span>Change Accent Color</span>
                                    <div className="colorPickerBlock">
                                        <input
                                        id="accentColorPicker"
                                        value={currentElementStyles.colorAccent}
                                        onChange ={(e)=>updStyle("colorAccent",e.target.value)}
                                        type="color"
                                        />
                                        <label htmlFor="accentColorPicker">
                                            <img className='colorPickerMultiply' src={colorPickerImgSrc} alt="" />
                                        </label>
                                    </div>
                                </div>
                                <hr />
                                <div className="setting">
                                    <span>Change Text Color</span>
                                    <div className="colorPickerBlock">
                                        <input
                                        id="settingsTextColorPicker"
                                        value={currentElementStyles.textColor}
                                        onChange ={(e)=>updStyle("textColor",e.target.value)}
                                        type="color"
                                        />
                                        <label htmlFor="settingsTextColorPicker">
                                            <img className='colorPickerMultiply' src={colorPickerImgSrc} alt="" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                        :
                        <></>
                        }
                </div>
            </div>
        </PopUpWrapper>
    );
});

export default MainSettingsPopUp;