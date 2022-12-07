import { useState,React, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeOutputStatusAction, connectAction } from '../../store/reducers/elementsReducer';
import PopUpWrapper from './PopUpWrapper';
const ConnectionPopUp = memo(({isConnectionPopUpOpen,togglePopup,element}) => {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user.user)
    const typesArr = ["holdingRegisters","inputRegisters","coils"];
    const indexArr = [0,1,2,3,4,5,6,7,8,9];
    const [type,setType] = useState("");
    const [index,setIndex] = useState("");
    const selectType=(e)=>{
        if(!user.editMode){alert("Access denied");return;}
        setType(e.target.value);
    }
    const selectIndex=(e)=>{
        if(!user.editMode){alert("Access denied");return;}
        setIndex(e.target.value);
        dispatch(connectAction({key:element.key,type:type,index:e.target.value}));
        dispatch(changeOutputStatusAction({key:element.key,newStatus:true}))
    }
    return (
        <PopUpWrapper width={400} height = {250} isPopUpOpen={isConnectionPopUpOpen} togglePopup = {togglePopup} idName={"connectionPopUp_body"}>
            <div onMouseDown={(e)=>e.stopPropagation()} className="connectionBlock">
                <h1>Select device</h1>
                <div className="paramBlock">
                    <span>Type:</span>
                    <p></p>
                    <select value = {type} onChange={(e)=>selectType(e)} className="custom_selector">
                        <option id="defValue">Select</option>
                        {
                            typesArr.map((option)=>
                            <option
                            className="selector_option"
                            value={option}
                            key = {Math.random()*13}
                            >{option}</option>)
                        }
                    </select>
                </div>      
                <div className="paramBlock">
                    <span>Index:</span>
                    <p></p>
                    <select value = {index} onChange={(e)=>selectIndex(e)} className="custom_selector">
                        <option id="defValue">Select</option>
                        {
                            indexArr.map((option)=>
                            <option
                            className="selector_option"
                            value={option}
                            key = {Math.random()*13}
                            >{option}</option>)
                        }
                    </select>
                </div>      
            </div>
        </PopUpWrapper>
    );
});

export default ConnectionPopUp;
