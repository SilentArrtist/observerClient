import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const AdminPanelSidebar = ({setCurrentPage,logOut}) => {
    const menuIcons = useSelector(state=>state.menuIcons.icons)
    const [adminPagesList,setAdminPagesList] = useState([
        {
            name:"Users",
            active:true,
            img:'users',
        },
        {
            name:"Settings",
            active:false,
            img:'settings',
        },
    ]);
    const selectPage = (index)=>{
        const newAdminPagesList = JSON.parse(JSON.stringify(adminPagesList));
        newAdminPagesList.forEach((page)=>{page.active=false});
        newAdminPagesList[index].active = true;
        setAdminPagesList(newAdminPagesList);
        setCurrentPage(newAdminPagesList[index]);
    }
    return (
        <div className='adminPanelSidebar'>
            <div className="adminPagesList">
            {
                adminPagesList.map((page,index)=>(
                    <div
                    key={index}
                    className={`adminSidebarElement ${page.active?"active":""}`}
                    onClick={()=>(selectPage(index))}
                    >
                        <div className="sidebarImg"><img src={page.active?menuIcons[`white${page.img}`]:menuIcons[page.img]} alt=""/></div>
                    </div>
                ))
            }
            </div>
            
            <div
            onClick={()=>logOut()}
            >
                <div className="sidebarImg"><img src={menuIcons.logOut} alt=""/></div>
            </div>
        </div>
    );
};

export default AdminPanelSidebar;