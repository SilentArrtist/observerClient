import React from 'react';
import AdminPanelUsers from './Users/AdminPanelUsers';
import AdminPanelSettings from './Settings/Settings';
const AdminPanelBody = ({currentPage}) => {
    return (
        <div className="adminPanelBody">
            {
                currentPage.name==="Users"
                ?
                <AdminPanelUsers/>
                :
                currentPage.name==="Settings"
                ?
                <AdminPanelSettings/>
                :
                <></>
            }
        </div>
    );
};

export default AdminPanelBody;