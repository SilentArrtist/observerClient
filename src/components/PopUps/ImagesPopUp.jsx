import { useRef } from 'react';
import { React, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addImage, deleteImage } from '../../http/fileAPI';
import { addImageAction, setImagesNamesAction } from '../../store/reducers/elementsReducer';
import MiniIMG from './Common/MiniIMG';
import PopUpWrapper from './PopUpWrapper';
const ImagesPopUp = memo(({isPopUpOpen,togglePopup,currentPage}) => {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user.user)
    const imagesList = useSelector(state=>state.elements.imagesNames);
    const imgRef = useRef();
    const addNewIMG = async (src)=>{
        if(!user.editMode){alert("Access denied");return;}
        const newIcon =
        {
            key:(Math.random()*100+3)*17,
            x:150,
            y:150,
            width:100,
            height:100,
            src:"null",
            page:currentPage,
        }
        newIcon.src = src;
        dispatch(addImageAction(newIcon))
        togglePopup(!isPopUpOpen)
    }
    const uploadNewIMG = async (element)=>{
        
        const file = element.target.files[0];
        try {
            const data = await addImage(file);
            const loadedImages = data.data;
            const imagesNamesArray = [];
            loadedImages.forEach(image => {
                imagesNamesArray.push(image.name)
            });
            dispatch(setImagesNamesAction(imagesNamesArray))
        } catch (error) {
            console.log(error);
        }
    }
    const deleteImg = async (name)=>{
        try {
            const data = await deleteImage(name);
            const loadedImages = data.data;
            const imagesNamesArray = [];
            loadedImages.forEach(image => {
                imagesNamesArray.push(image.name)
            });
            dispatch(setImagesNamesAction(imagesNamesArray))
        } catch (error) { }
    }

    return (
        <PopUpWrapper width={600} height = {500} isPopUpOpen={isPopUpOpen} togglePopup = {togglePopup} idName={"imagesPopUp_body"}>
            <div className="images_popup_wrapper">
                <div className="imagesList">
                    {
                        imagesList.map((image)=>(
                            <MiniIMG key={image} addImg = {addNewIMG} deleteImg = {deleteImg} imgSrc = {image}/>
                        ))
                    }
                </div>
                <div className="add_device_block">
                    <label className='icon' htmlFor="icon_load">
                        <span className='addImgBtn'>Add new Image</span>
                        <input
                        className="img_load"
                        id = 'icon_load'
                        type="file"
                        ref={imgRef}
                        onChange={(e)=>uploadNewIMG(e)}
                        />
                    </label>
                </div>
            </div>
        </PopUpWrapper>
    );
});

export default ImagesPopUp;