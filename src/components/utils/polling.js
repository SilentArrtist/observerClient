/////// Api functions
import { getDevices, getPollingSettings, getSave } from "../../http/deviceAPI";
import { getImages } from "../../http/fileAPI";
import { checkFunction } from "../../http/userAPI";
import { setDeivcesAction } from "../../store/reducers/deviceReducer";
/////// Store functions
import { setElementsAction, setImagesAction, setImagesNamesAction } from "../../store/reducers/elementsReducer";
import { setPollingSettingsAction, setSettignsAction } from "../../store/reducers/settingsReducer";
import { setUserAction } from "../../store/reducers/userReducer";
///////
function startPolling(dispatch,polling_frequency){
  setInterval(() => {
    try {
      getDevices().then(data=>{
        const devicesArr = data.data;
        devicesArr.forEach(device => {
          const holdRegs = JSON.parse(device.holdingRegisters);
          device.holdingRegisters = holdRegs;
          const inpRegs = JSON.parse(device.inputRegisters);
          device.inputRegisters = inpRegs;
          const coils = JSON.parse(device.coils);
          device.coils = coils;
        });
        dispatch(setDeivcesAction(devicesArr))
      })
    } catch (e) {
      console.log(e?.response?.data?.message)
    }
  }, polling_frequency);
} 
////////
export const getBackendData = (dispatch,setIsAuth,endLoadingCallback)=>{
    try {
        checkFunction().then(data=>{
          const newUser = {login:data.login,role:data.role,editMode:data.role==="EDITOR"?true:false};
          dispatch(setUserAction(newUser));
          setIsAuth(true);
        })
      } catch (e) {
        alert(e?.response?.data?.message)
      }
      try {
        getImages().then(data=>{
          const loadedImages = data.data;
          const imagesNamesArray = [];
          loadedImages.forEach(image => {
            imagesNamesArray.push(image.name)
          });
          dispatch(setImagesNamesAction(imagesNamesArray))
        })
      } catch (e) {
        alert(e?.response?.data?.message)
      }
      try {
        getPollingSettings().then(data=>{
            const settings = JSON.parse(data.data[0].settings);
            dispatch(setPollingSettingsAction(settings))
            startPolling(dispatch,settings.polling_frequency)
        })
      } catch (e) {
        alert(e?.response?.data?.message)
      }
      try {
        getSave().then(data=>{
            const loadedElements = JSON.parse(data.data.data.elements[0].elements);
            const loadedSettings = JSON.parse(data.data.data.settings[0].settings);
            dispatch(setElementsAction(loadedElements.elements))
            dispatch(setImagesAction(loadedElements.images))
            dispatch(setSettignsAction(loadedSettings.settings))
        }).finally(()=>{endLoadingCallback(false);});
      } catch (e) {
        alert(e?.response?.data?.message)
      }

}