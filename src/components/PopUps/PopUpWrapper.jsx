import { useState } from 'react';
import { React, memo } from 'react';
import { Rnd } from "react-rnd";
import '../../styles/PopUp.css'
const PopUpWrapper = memo((props) => {
    const [states,setStates] = useState({
        width: props.width,
        height: props.height,
        x: 100,
        y: 50,
    })
    const {isPopUpOpen,togglePopup,idName} = props;
    const togglePopUpFunction = function(e){
        e.preventDefault();
        togglePopup(!isPopUpOpen)
    }
    return (
        <div id = 'pop_up' className={!isPopUpOpen?"pop_up":"pop_up active"}>
            <Rnd
            size={{ width: states.width, height: states.height }}
            position={{ x: states.x, y: states.y }}
            onDragStop={(e, d) => {
                setStates({ 
                width: states.width,
                height: states.height,
                x: d.x,
                y: d.y,
                });

            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                setStates({
                    width: ref.style.width,
                    height: ref.style.height,
                    ...position
                });
            }}
            >
                <div className="pop_up_body">
                    <div className="pop_up_header">
                        <div className="pop_up_close" onClick={(e)=>togglePopUpFunction(e)}><p>X</p></div>
                    </div>
                    <div className="pop_up_container" id={idName}>
                        {props.children}
                    </div>
                </div>
            </Rnd>
        </div>
    );
});

export default PopUpWrapper