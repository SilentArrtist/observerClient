import { useDispatch, useSelector } from 'react-redux';
import { changeSelectedElement } from '../../store/reducers/elementsReducer';
import Element from '../MainElements/Element';
import Image from '../MainElements/Image';
import SettingsPopup from '../PopUps/SettingsPopup';
import ConnectionPopUp from '../PopUps/ConnectionPopUp';
import DevicesPopUp from '../PopUps/DevicesPopUp';
import MainSettingsPopUp from '../PopUps/MainSettingsPopUp';
import ImagesPopUp from '../PopUps/ImagesPopUp';
import '../../styles/Main.css'
import Pagination from './Pagination';
import { useState } from 'react';
import { useEffect } from 'react';
const Main = ({mainRef,popups,currentPage,setCurrentPage}) => {
    const dispatch = useDispatch();
    const openElementPopUp = (e,type,element) =>{
        e.preventDefault();
        dispatch(changeSelectedElement(element))
        if(type ==='settings'){
            popups.setPopupsStates.setSettingsPopupState(true);
        }
        else if(type ==='connection'){
            popups.setPopupsStates.setConnectPopupState(true);
        }
    }
    const elements = useSelector(state=>state.elements.elements)
    const images = useSelector(state=>state.elements.images)
    const [elementsOnPage,setElementsOnPage] = useState([]);
    const [imagesOnPage,setImagesOnPage] = useState([]);
    useEffect(()=>{
        const newElements = elements.filter(element=>element.page===currentPage);
        setElementsOnPage(newElements);
        const newImages = images.filter(image=>image.page===currentPage);
        setImagesOnPage(newImages);
    },[elements,images,currentPage])
    return (
        <div
        className='main'
        ref={mainRef}
        >
            {
                imagesOnPage.map((img)=>
                    <Image imgElem ={img} key={img.key}/>
                )
            }
            {
                elementsOnPage.map((element)=>
                    <Element openPopUp = {openElementPopUp} element ={element} key={element.key}/>
                )
            }
            <Pagination currentPage = {currentPage} setCurrentPage={setCurrentPage}/>
            <ImagesPopUp
            isPopUpOpen = {popups.popupsStates.imagesPopUpState}
            togglePopup = {popups.setPopupsStates.setImagesPopUpState}
            currentPage = {currentPage}
            />
            <MainSettingsPopUp
            isPopUpOpen = {popups.popupsStates.mainSettingsPopUpState}
            togglePopup = {popups.setPopupsStates.setMainSettingsPopUpState}
            />
            <DevicesPopUp
             isPopUpOpen = {popups.popupsStates.devicesPopUpState}
             togglePopup = {popups.setPopupsStates.setDevicesPopUpState}
             />
            <SettingsPopup
            isSettingsPopupOpen = {popups.popupsStates.settingsPopupState}
            togglePopup = {popups.setPopupsStates.setSettingsPopupState}
            />
            <ConnectionPopUp
            isConnectionPopUpOpen = {popups.popupsStates.connectPopupState}
            togglePopup = {popups.setPopupsStates.setConnectPopupState}
            />
        </div>
    );
};

export default Main;