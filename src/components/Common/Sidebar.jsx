import { useDispatch, useSelector } from 'react-redux';
import { setSave } from '../../http/deviceAPI';
import { addElementAction } from '../../store/reducers/elementsReducer';
import SidebarElement from './SidebarElement';
import '../../styles/Sidebar.css'
const TopMenu = ({openPopUp,topRef,logOut,currentPage}) => {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user.user)
    const elementsToSave = useSelector(state=>state.elements)
    const settingsToSave = useSelector(state=>state.settings)
    const icons = useSelector(state=>state.menuIcons.icons)
    const addNewElement =(e,page)=>{
        e.preventDefault();
        if(!user.editMode){alert("Access denied");return;}
        const newElement =
        {
            key:Math.random()*1000,
            x:150,
            y:150,
            type:null,
            index:null,
            output:"VALUE",
            isOutputChange:false,
            page:page,
            style:{
                color:"#000000",
                background:"",
                backgroundState:false,
                border:"none",
                borderState:false,
                fontWeight:"400",
                fontSize:"15",
                fontStyle:"normal",
                width:120,
                height:100,
                borderRadius:"0%",
                zIndex:"2",
                },
            dynamicValue:{
                backgroundValue:"none",
                background:"#ffffff",
                colorValue:"none",
                color:"#ffffff",
                borderColorValue:"none",
                borderColor:"#ffffff",
            }
        }
        dispatch(addElementAction(newElement))
    }
    const saveFunction = async(e)=>{
        if(!user.editMode){alert("Access denied");return;}
        try {
            const data = await setSave(JSON.stringify(elementsToSave),JSON.stringify(settingsToSave));
            alert(data.message);
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    }

    return (
        <div className='sidebarNav' ref={topRef}>
            <ul>
                <li className={'listElem'}>
                    <SidebarElement src={icons.newObject} alt="Add Object" title="Add Object" callback={addNewElement} argums = {currentPage} />
                </li>
                <li className={'listElem'}> 
                    <SidebarElement src={icons.newImage} alt="Add Image" title="Add Image" callback={openPopUp} argums = {"images"}/>
                </li>
                <li className={'listElem'}>
                    <SidebarElement src={icons.devices} alt="Devices" title="Devices" callback={openPopUp} argums = {"devices"}/>
                </li>
                <li className={'listElem'}>
                    <SidebarElement src={icons.save} alt="Save" title="Save" callback={saveFunction}/>
                </li>
                <li className={'listElem'}>
                    <SidebarElement src={icons.settings} alt="Settings" title="Settings" callback={openPopUp} argums = {"mainSettings"}/>
                </li>
                <li className={'listElem'}>
                    <SidebarElement src={icons.logOut} alt="Log Out" title="Log Out" callback={logOut}/>
                </li>
            </ul>
            <div className="logo">
                <img src={icons.logo} alt="logo" title='logo'/>
            </div>
        </div>

        
        
    );
};
export default (TopMenu);