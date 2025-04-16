import React from 'react';
import { 
    FiBarChart2,
    FiPackage,
    FiPlusCircle, 
    FiShoppingCart,
    FiStar,
    FiTag,
    FiUser,
    FiDatabase 
} from 'react-icons/fi';
import { Link } from "react-router";


const Sidebar = () => {
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
                    <li > 
                        <Link to='#' className='flex items-center'>
                        <FiBarChart2 className='h-4 w-4'/>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li > 
                        <Link to='#' className='flex items-center'>
                        <FiPackage className='h-4 w-4'/>
                            <span>Product</span>
                        </Link>
                    </li>
                    <li > 
                        <Link to='#' className='flex items-center'>
                        <FiPlusCircle className='h-4 w-4'/>
                            <span>Add Product</span>
                        </Link>
                    </li>
                    <li > 
                        <Link to='#' className='flex items-center'>
                        <FiTag className='h-4 w-4'/>
                            <span>Categories</span>
                        </Link>
                    </li>
                    <li > 
                        <Link to='#' className='flex items-center'>
                        <FiPlusCircle className='h-4 w-4'/>
                            <span>Add Category</span>
                        </Link>
                    </li>
                    <li > 
                        <Link to='#' className='flex items-center'>
                        <FiShoppingCart className='h-4 w-4'/>
                            <span>Order</span>
                        </Link>
                    </li>
                    <li > 
                        <Link to='#' className='flex items-center'>
                        <FiStar className='h-4 w-4'/>
                            <span>Review</span>
                        </Link>
                    </li>
                    <li > 
                        <Link to='#' className='flex items-center'>
                        <FiUser className='h-4 w-4'/>
                            <span>User</span>
                        </Link>
                    </li>
                  
                    
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