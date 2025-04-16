import React, { useState } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import Navbar from '../components/Dashboard/Navbar';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen]= useState(false)

    const toggleSidebar= () =>{
        setSidebarOpen(!sidebarOpen)
        console.log(toggleSidebar);
    }

    return (
        <div className='drawer lg:drawer-open'>
            {/* Mobile Drawer Checkbox  */}
            <input 
                id='drawer-toggle'
                type="checkbox" 
                className='drawer-toggle'
                checked={sidebarOpen}
                onChange={toggleSidebar}
            />
            {/* Page Content  */}
            <div className='drawer-content flex flex-col'>

                <Navbar sidebarOpen={sidebarOpen}/>
               
                
                <main className='p-6'>
                    <Outlet />
                </main>
            </div>
            {/* sidebar */}
            <Sidebar />
        </div>
        
    );
};

export default DashboardLayout;