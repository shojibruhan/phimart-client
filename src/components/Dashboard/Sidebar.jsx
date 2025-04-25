import React from 'react';
import useAuthContext from "../../Hooks/useAuthContext.js"

import { 
    FiBarChart2,
    FiPackage,
    FiPlusCircle, 
    FiShoppingCart,
    FiStar,
    FiTag,
    FiUser,
    FiCommand,
    FiDatabase,
     
} from 'react-icons/fi';
import { Link } from "react-router";


const Sidebar = () => {
    const {user}= useAuthContext()
    

    const CustomerMenus= [
        {to: '/dashboard', icon: FiBarChart2, label:"Dashboard"},
        {to: '/dashboard/orders', icon: FiCommand, label:"Orders"},
        {to: '/dashboard/carts', icon: FiShoppingCart, label:"Carts"},
        {to: '/reviews', icon: FiStar, label:"Reviews"},
    ];

    const adminMenu= [
        {to: '/dashboard', icon: FiBarChart2, label:"Dashboard"},
        {to: '/products', icon: FiPackage, label:"Product"},
        {to: '/products/add', icon: FiPlusCircle, label:"Add Product"},
        {to: '/categories', icon: FiTag, label:"Categories"},
        {to: '/categories/add', icon: FiPlusCircle, label:"Add Category"},
        {to: '/dashboard/orders', icon: FiCommand, label:"Orders"},
        {to: '/dashboard/carts', icon: FiShoppingCart, label:"Carts"},
        {to: '/reviews', icon: FiStar, label:"Reviews"},
        {to: '/users', icon: FiUser, label:"Users"},
    ];

    const menuItems= user.is_staff ? adminMenu : CustomerMenus
    return (
        <div className='drawer-side z-10'>
            <label 
                htmlFor="drawer-toggle"
                aria-label='close sidebar'
                className='drawer-overlay'
                ></label>
            <aside className='menu bg-base-200 min-h-full w-64 p-4 text-base-content'>
                {/* Sidebar Header  */}
                <div>
                <Link to="/" className='flex items-center gap-2 mb-6 px-2'>
                    <FiShoppingCart className='h-6 w-6' /> 
                    <h1 className='text-xl font-bold'>PhiMart</h1>
                    </Link>
                </div>

                {/* Sidebar Menu  */}
                <ul className='menu menu-md gap-2'>
                    {menuItems.map((item, index) =>(
                        <li key={index}> 
                        <Link to={item.to} className='flex items-center'>
                        <item.icon className='h-4 w-4'/>
                            <span> {item.label} </span>
                        </Link>
                    </li>
                    ))}
                </ul>

                {/* Sidebar Footer */}
                <div className='mt-auto pt-6 text-xs text-base-content/70'>
                © 2025 PhiMart Admin
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;