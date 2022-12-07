import { React, useState } from 'react';
import AdminPanelSidebar from './AdminPanelSidebar';
import AdminPanelBody from './AdminPanelBody';
import '../../styles/AdminPanel.css'
const AdminPanel = ({logOut}) => {
    const [currentPage,setCurrentPage] = useState({name:"Users",active:true})

    return (
        <div className="adminPanelWrapper">
            <AdminPanelSidebar logOut = {logOut} setCurrentPage = {setCurrentPage}/>
            <AdminPanelBody currentPage = {currentPage}/>
        </div>
        
    );
};

export default AdminPanel;