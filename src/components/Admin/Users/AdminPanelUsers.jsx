import { React,useState,useEffect,useMemo} from 'react';
import { deleteUserFunction, getAllUsers, registrationFunction } from '../../../http/userAPI';
import AddNewUserPopUp from '../../PopUps/AddNewUserPopUp';
const AdminPanelUsers = () => {
    const trashSrc = "data:image/png;base64,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";
    const [addUserPopUpOpen,setAddUserPopUpOpen] = useState(false);
    const openAddUserPopUp = function(e){
        console.log(addUserPopUpOpen);
        e.preventDefault();
        setAddUserPopUpOpen(true);
    }
    const [fetcUsers,setFetchUsers] = useState([]); 
    const [roles,setRoles] = useState([
        {name:'Editors',status:true,role:"EDITOR"},
        {name:'Operators',status:false,role:"OPERATOR"},
    ])

    const [currentRole,setCurrentRole] = useState({name:'Editors',status:true,role:"EDITOR"});

    const selectRole = (index)=>{
        const newRoles = JSON.parse(JSON.stringify(roles));
        newRoles.forEach((role)=>{role.status=false});
        newRoles[index].status = true;
        setCurrentRole(newRoles[index]);
        setRoles(newRoles);
    }
    const regFunc = async(login,password,role)=>{
        try {
            const response = await registrationFunction(login,password,role)
            setFetchUsers(response.data);
        } catch (e) {
          alert(e)
        }
    }

    const deleteFunc = async(login)=>{
        if(login === "admin")return;
        try {
            const response = await deleteUserFunction(login)
            setFetchUsers(response.data);
        } catch (e) {
    
          alert(e.response.data.message)
        }
    }
    const filteredUsers = useMemo(() => {
        if(currentRole.role === "EDITOR") {
            return (fetcUsers.filter(user=>user.role==="EDITOR"));
        }
        else if(currentRole.role === "OPERATOR") {
            return (fetcUsers.filter(user=>user.role==="OPERATOR"));
        }
        else{
            return (fetcUsers);
        }
    }, [currentRole,fetcUsers])
    useEffect(()=>{
        try {
            getAllUsers().then(data=>{
                setFetchUsers(data.data);
            })
          } catch (e) {
            alert(e?.response?.data?.message)
          }
    },[])


    return (
        <>
            <div className="adminPanelHeader">
                <div className="adminPanelHeader_line">
                    <div className="rolesBlock">
                        {
                            roles.map((role,index)=>(
                                <div 
                                    key = {index} 
                                    className={`role ${role.status?'active':''}`}
                                    onClick={()=>(selectRole(index))}
                                    >
                                    <div className='roleName' >{role.name}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="adminPanelHeader_line" id='adminSecondLine'>
                    <div id='currentRole'>{currentRole.name}</div>
                    <div
                    className='addBtnBlock'
                    onClick={(e)=>openAddUserPopUp(e)}
                    >Add new</div>
                </div>
                
            </div>
            <div className="usersBody">
                <div className="usersBody_titleLine">
                <div className="userName titleElem">Name</div>
                <div className="UserRole titleElem">Role</div> 
                <div className="userOperation titleElem">Operation</div>
                </div>


                {
                filteredUsers.map((user)=>
                    <div key={user.id}>
                        <hr />
                        <div className="usersBody_titleLine">
                            <div className="userName lineElem">{user.login}</div>
                            <div className="UserRole lineElem">{user.role}</div> 
                            <div className="userOperation lineElem" onClick={()=>deleteFunc(user.login)}><img src={trashSrc} alt="" /></div>
                        </div>
                    </div>
                )
            }
            </div>
            <AddNewUserPopUp
            isPopUpOpen = {addUserPopUpOpen}
            togglePopup = {setAddUserPopUpOpen}
            regFunc = {regFunc}
            role = {currentRole}
            />
        </>
    );
};

export default AdminPanelUsers;