import { React, useEffect, useRef } from 'react';

const CustomBlock = (props) => {
    const element = props?.element;
    const customBlockContainer = useRef()
    useEffect(()=>{
        customBlockContainer.current.style.top = element.y;
            customBlockContainer.current.style.left = element.x;
            if(element?.dynamicValue?.colorValue!==""&&element?.dynamicValue?.colorValue!==undefined){
                try {
                    const statement = element?.dynamicValue?.colorValue.replace('value','element.output');
                    if(eval(statement))
                    {
                        customBlockContainer.current.style.color = element.dynamicValue.color;
                    }
                    else{
                        customBlockContainer.current.style.color = element.style.color;
                    }
                } catch (e) {customBlockContainer.current.style.color = element.style.color;}
                
            }
            else{
                customBlockContainer.current.style.color = element.style.color;
            }
            if(element?.dynamicValue?.backgroundValue!==""&&element?.dynamicValue?.backgroundValue!==undefined){
                try {
                    const statement = element?.dynamicValue?.backgroundValue.replace('value','element.output');
                    if(eval(statement))
                    {
                        customBlockContainer.current.style.background = element.dynamicValue.background;
                    }
                    else{
                        if(!element.style.backgroundState){
                            customBlockContainer.current.style.background = "none";
                        }
                        else{
                            customBlockContainer.current.style.background = element.style.background;
                        }
                    }
                } catch (e) {
                    if(!element.style.backgroundState){
                        customBlockContainer.current.style.background = "none";
                    }
                    else{
                        customBlockContainer.current.style.background = element.style.background;
                    }
                }
            }
            else{
                if(!element.style.backgroundState){
                    customBlockContainer.current.style.background = "none";
                }
                else{
                    customBlockContainer.current.style.background = element.style.background;
                }
            }
            if(element?.dynamicValue?.borderColorValue!==""&&element?.dynamicValue?.borderColorValue!==undefined){
                try {
                    const statement = element?.dynamicValue?.borderColorValue.replace('value','element.output');
                    if(eval(statement))
                    {
                        customBlockContainer.current.style.borderColor = element.dynamicValue.borderColor;
                    }
                    else{
                        customBlockContainer.current.style.borderColor = element.style.color;
                    }
                } catch (e) {customBlockContainer.current.style.borderColor = element.style.borderColor;}
            }
            else{
                customBlockContainer.current.style.borderColor = element.style.borderColor;
            }
            customBlockContainer.current.style.border = element.style.border;
            customBlockContainer.current.style.fontWeight = element.style.fontWeight;
            customBlockContainer.current.style.fontSize = element.style.fontSize;
            customBlockContainer.current.style.fontStyle = element.style.fontStyle;
            customBlockContainer.current.style.borderRadius = element.style.borderRadius
            customBlockContainer.current.style.zIndex = element.style.zIndex;
    })

    return (
        <>
            <div
            ref={customBlockContainer}
            className='elementContainer'
            onDoubleClick = {(e)=>{props.openPopUp(e,"connection",element)}}
            onContextMenu = {(e)=>{props.openPopUp(e,"settings",element)}}
            >
                {props.children}
            </div>
           
        </>
    );
};

export default CustomBlock;