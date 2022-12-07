import { React, useState, memo, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { changeDynamicValueAction, changeOutputAction, changeOutputStatusAction, changeStyleAction, connectAction, deleteElementAction } from '../../store/reducers/elementsReducer';
import { deleteDevice } from '../../http/deviceAPI';
import MySelector from '../UI/MySelector';
import PopUpWrapper from './PopUpWrapper';
const SettingsPopup = memo(({isSettingsPopupOpen,togglePopup}) => {
    const element = useSelector(state=>state.elements.selectedElement);
    const colorPickerImgSrc = "data:image/png;base64,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";
    const dispatch = useDispatch()
    const [backgroundState,setBackgroundState] = useState(element.style.backgroundState)
    const [borderState,setBorderState] = useState(element.style.borderState)
    const [currentSetting,setCurrentSetting] = useState({name:'Color',status:true});
    const [settingsNames,setSettingsNames] = useState([
        {name:'Color',status:true},
        {name:'Dynamic Colors',status:false},
        {name:'Font',status:false},
        {name:'Size',status:false},
        {name:'Output',status:false},
    ])
    const [currentStyles,setCurrentStyles] = useState([
        {
            backgroundColorValue:element.dynamicValue.backgroundValue,
            borderColorValue:element.dynamicValue.borderColorValue,
            colorValue:element.dynamicValue.colorValue,
        },
    ])
    const changeBackgroundState = ()=>{ 
        setBackgroundState(!backgroundState);
        updStyle("backgroundState",!backgroundState)
        return;
    }
    const changeBorderState = ()=>{
        borderState(!borderState);
        updStyle("borderState",!borderState)
        return;
    }
    const selectSetting = (index)=>{
        const newSettings = JSON.parse(JSON.stringify(settingsNames));
        newSettings.forEach((setting)=>{setting.status=false});
        newSettings[index].status = true;
        setCurrentSetting(newSettings[index]);
        setSettingsNames(newSettings);
    }
    const updStyle = (style,value) =>{
        const newStyles = JSON.parse(JSON.stringify(element.style));
        const key = element.key;
        newStyles[style] = value;
        dispatch(changeStyleAction({key, parameter:style, newValue:value }))
    }
    const updDynamicValue = (style,value) =>{
        const newStyles = JSON.parse(JSON.stringify(element.style));
        newStyles[style] = value;
        setCurrentStyles(newStyles);
        const key = element.key;
        dispatch(changeDynamicValueAction({key, parameter:style, newValue:value}))
    }
    const [output, setOutput] = useState(element.output)
    const updOutput = (value) =>{
        const key = element.key;
        dispatch(changeOutputAction({key, output:value}))
        dispatch(changeOutputStatusAction({key:key,newStatus:false}))
        dispatch(connectAction({key,ip:null,type:null,index:null}));
    }
    const updZIndex = (val)=>{
        updStyle("zIndex",val);
    }
    const deleteElem = async() =>{
        if(element.connected){
            try {
                const {message} = await deleteDevice(element.ip);
                alert(message);
            } catch (e) {
                alert(e.response.data.message);
            }
            
        }
        dispatch(deleteElementAction(element.key))
        togglePopup(!isSettingsPopupOpen);
    }
    useEffect(()=>{
        setBackgroundState(element.style.backgroundState);
        setBorderState(element.style.borderState);
        setOutput(element.output);
    },[element])
    return (
        <PopUpWrapper width={800} height = {600} isPopUpOpen={isSettingsPopupOpen} togglePopup = {togglePopup} idName={"settingsPopUp_body"}>
            <div className="settingsBody">
                <div className="settingsNamesList">
                    <div>
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
                    <div 
                        className='settingsNamesElement'
                        id="deleteElementBtn"
                        onClick={deleteElem}
                        >
                        Delete Element
                    </div>
                </div>
                <div onMouseDown={(e)=>e.stopPropagation()} className="settingsList">
                    <div id="currentSettingTitle">{currentSetting.name}</div>
                    {
                        currentSetting.name==="Color"
                        ?
                        (
                        <div className="currentSetting">
                            <div className="settingBlock">
                                <div className="setting">
                                    <span>Change Background Color</span>
                                    <div className="colorPickerBlock">
                                        <input
                                        id="backgroundPicker"
                                        value={element.style.background}
                                        onChange ={(e)=>updStyle("background",e.target.value)}
                                        type="color"
                                        />
                                        <label htmlFor="backgroundPicker">
                                            <img className='colorPickerMultiply' src={colorPickerImgSrc} alt="" />
                                        </label>
                                        <input checked={backgroundState} onChange={()=>(changeBackgroundState())} type="checkbox" name="" id="" />
                                    </div>
                                </div>
                                <hr />
                                <div className="setting">
                                    <span>Change Border</span>
                                    <div className="colorPickerBlock">
                                        <input
                                        id="backgroundPicker"
                                        value={element.style.border}
                                        onChange ={(e)=>updStyle("border",e.target.value)}
                                        type="color"
                                        />
                                        <label htmlFor="backgroundPicker">
                                            <img className='colorPickerMultiply' src={colorPickerImgSrc} alt="" />
                                        </label>
                                        <input checked = {borderState} onChange={()=>(changeBorderState())} type="checkbox" name="" id="" />
                                    </div>
                                </div>
                                <hr />
                                <div className="setting">
                                    <span>Change Text Color</span>
                                    <div className="colorPickerBlock">
                                        <input
                                        id="textPicker"
                                        value={element.style.color}
                                        onChange ={(e)=>updStyle("color",e.target.value)}
                                        type="color"
                                        />
                                        <label htmlFor="textPicker">
                                            <img className='colorPickerMultiply' src={colorPickerImgSrc} alt="" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                        :currentSetting.name==="Dynamic Colors"
                        ?
                        (
                        <div className="currentSetting">
                            <div className="settingBlock">
                                <div className="setting">
                                    <span>Background Color</span>
                                    <div className="colorPickerBlock">
                                        <input
                                        id="dynamicBackgroundPicker"
                                        value={element.dynamicValue.background}
                                        onChange ={(e)=>updDynamicValue("background",e.target.value)}
                                        type="color"
                                        />
                                        <label htmlFor="dynamicBackgroundPicker">
                                            <img className='colorPickerMultiply' src={colorPickerImgSrc} alt="" />
                                        </label>
                                    </div>
                                </div>
                                <hr />
                                <div className="setting">
                                    <span>Background Color Condition</span>
                                    <input
                                    value={currentStyles.backgroundColorValue}
                                    className = "dynamicValueInput"
                                    placeholder='value>.........'
                                    onChange ={(e)=>updDynamicValue("backgroundColorValue",e.target.value)}
                                    type="text"
                                    />
                                </div>
                            </div>
                            <div className="settingBlock">
                                <div className="setting">
                                    <span>Border Color</span>
                                    <div className="colorPickerBlock">
                                        <input
                                        id="dynamicBorderPicker"
                                        value={element.dynamicValue.borderColor}
                                        onChange ={(e)=>updDynamicValue("borderColor",e.target.value)}
                                        type="color"
                                        />
                                        <label htmlFor="dynamicBorderPicker">
                                            <img className='colorPickerMultiply' src={colorPickerImgSrc} alt="" />
                                        </label>
                                    </div>
                                </div>
                                <hr />
                                <div className="setting">
                                    <span>Border Color Condition</span>
                                    <input
                                    value={currentStyles.borderColorValue}
                                    className = "dynamicValueInput"
                                    placeholder='value>.........'
                                    onChange ={(e)=>updDynamicValue("borderColorValue",e.target.value)}
                                    type="text"
                                    />
                                </div>
                            </div>
                            <div className="settingBlock">
                                <div className="setting">
                                    <span>Text Color</span>
                                    <div className="colorPickerBlock">
                                        <input
                                        id="dynamicTextPicker"
                                        value={element.dynamicValue.color}
                                        onChange ={(e)=>updDynamicValue("color",e.target.value)}
                                        type="color"
                                        />
                                        <label htmlFor="dynamicTextPicker">
                                            <img className='colorPickerMultiply' src={colorPickerImgSrc} alt="" />
                                        </label>
                                    </div>
                                </div>
                                <hr />
                                <div className="setting">
                                    <span>Color Condition</span>
                                    <input
                                    value={currentStyles.colorValue}
                                    className = "dynamicValueInput"
                                    placeholder='value>.........'
                                    onChange ={(e)=>updDynamicValue("colorValue",e.target.value)}
                                    type="text"
                                    />
                                </div>
                            </div>
                        </div>
                        ):currentSetting.name==="Font"
                        ?
                        (
                        <div className="currentSetting">
                            <div className="settingBlock">
                                <div className="setting">
                                    <span>Text Weight:</span>
                                    <p></p>
                                    <input
                                    value={element.style.fontWeight}
                                    onChange ={(e)=>updStyle("fontWeight",e.target.value)}
                                    type="text"
                                    />
                                </div>
                                <hr />
                                <div className="setting">
                                    <span>Text Size:</span>
                                    <p></p>
                                    <input
                                    value={element.style.fontSize}
                                    onChange ={(e)=>updStyle("fontSize",e.target.value)}
                                    type="text"
                                    />
                                </div>
                                <hr />
                                <div className="setting">
                                    <span>Text style:</span>
                                    <p></p>
                                    <input
                                    value={element.style.fontStyle}
                                    onChange ={(e)=>updStyle("fontStyle",e.target.value)}
                                    type="text"
                                    />
                                </div>
                            </div>
                        </div>
                        )
                        :currentSetting.name==="Size"
                        ?
                        (
                        <div className="currentSetting">
                            <div className="settingBlock">
                                <div className="setting">
                                    <span>Border Radius:</span>
                                    <input
                                    value={element.style.borderRadius}
                                    onChange ={(e)=>updStyle("borderRadius",e.target.value)}
                                    type="text"
                                    />
                                </div>  
                                <hr />
                                <div className="setting">
                                    <span>Z-Index:</span>
                                    <p></p> 
                                    <div id="selectorBlock">
                                    <MySelector className="selector" 
                                    optionsArray = {[1,2,3]}
                                    value={element.style.zIndex}
                                    setValue={updZIndex}
                                    />
                                    </div>
                                </div>   
                            </div>
                        </div>
                        )
                        :
                        (
                        <div className="currentSetting">
                            <div className="settingBlock">
                                <div className="setting" id='changeOutputBlock'>
                                    <div className='changeOutput_textBlock'>
                                        <textarea
                                        value = {output}
                                        onChange={(e)=>setOutput(e.target.value)}
                                        id="outputDataBlockTextArea"
                                        name=""
                                        cols="30"
                                        rows="10"/>
                                        <button id="applyTextBtn" onClick={()=>updOutput(output)}>Apply</button>    
                                    </div>
                                </div>        
                            </div>   
                        </div>
                        )
                    }
                </div>
            </div>
        </PopUpWrapper>
    );
});

export default SettingsPopup;