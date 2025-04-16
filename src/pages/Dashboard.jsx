import React, { useState } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import Navbar from '../components/Dashboard/Navbar';
import StatCard from '../components/Dashboard/StatCard';
import Order from '../components/Dashboard/Order';
import 
{ 
    FiPackage, 
    FiShoppingCart, 
    FiStar, 
    FiUsers 
} from 'react-icons/fi';

export default function Dashboard() {
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
                    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
                        <StatCard icon={FiPackage} title="Total Products" value="245" />
                        <StatCard icon={FiShoppingCart} title="Total Orders" value="128" />
                        <StatCard icon={FiUsers} title="Total Users" value="573" />
                        <StatCard icon={FiStar} title="Average Ratings" value={4.8} />
                    
                    </div>
                    <Order />
                </main>
            </div>
            {/* sidebar */}
            <Sidebar />
        </div>
        
    );
};

