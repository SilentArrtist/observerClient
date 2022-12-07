import { useState,React, memo } from 'react';
import PopUpWrapper from './PopUpWrapper';
const addNewUserPopUp = memo(({isPopUpOpen,togglePopup,regFunc,role}) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("")
    const registrate = ()=>{
        regFunc(login,password,role.role)
        setLogin("");
        setPassword("");
        togglePopup();
    }
    return (
        <PopUpWrapper width={800} height = {600} isPopUpOpen={isPopUpOpen} togglePopup = {togglePopup} idName={"addNewUserPopUp_body"}>
            <div className="addUserBlock">
                <h1>Add new {role.role==="EDITOR"?"editor":"operator"}</h1>
                <div>
                <div className="inputBlock">
                    <input
                    value={login}
                    onChange={(e)=>setLogin(e.target.value)} 
                    type="text"
                    id="emailForm" 
                    placeholder='Username'
                    autoFocus required />
                </div>
                <div className="inputBlock">
                    <input
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} 
                    type = "text"
                    id="passwordForm"
                    placeholder='Password'
                    required />
                </div>
                </div>
                <div
                className="addUserBtn"
                onClick={()=>registrate()}
                >
                    Add
                </div>
            </div>
        </PopUpWrapper>
    );
});

export default addNewUserPopUp;
