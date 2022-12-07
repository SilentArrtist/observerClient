import Sidebar from './Sidebar';
import Main from './Main';
import { useState } from 'react';
const Wrapper = ({mainRef,logOut}) => {
    const [currentPage,setCurrentPage] = useState(1);
    const [settingsPopupState,setSettingsPopupState] = useState(false);
    const [connectPopupState,setConnectPopupState] = useState(false);
    const [devicesPopUpState,setDevicesPopUpState] = useState(false);
    const [mainSettingsPopUpState,setMainSettingsPopUpState] = useState(false);
    const [imagesPopUpState,setImagesPopUpState] = useState(false);
    const openPopUp = (e,type) =>{
        e.preventDefault();
        if(type ==='images'){
            setImagesPopUpState(true);
        }
        else if(type ==='devices'){
            setDevicesPopUpState(true);
        }
        else if(type ==='mainSettings'){
            setMainSettingsPopUpState(true);
        }
    }
  const popupsStates = {settingsPopupState,mainSettingsPopUpState,imagesPopUpState,devicesPopUpState,connectPopupState}
  const setPopupsStates = {setSettingsPopupState,setConnectPopupState,setImagesPopUpState,setDevicesPopUpState,setMainSettingsPopUpState}
  const popups = {popupsStates,setPopupsStates};
    return (
       <>
        <Sidebar currentPage = {currentPage} openPopUp ={openPopUp} logOut = {logOut}/>
        <Main currentPage ={currentPage} setCurrentPage = {setCurrentPage} popups={popups} mainRef = {mainRef}/>
       </>
    );
};

export default Wrapper;