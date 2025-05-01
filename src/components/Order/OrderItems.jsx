import React from 'react';

const OrderItems = ({item}) => {
    return (
        
            <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{item.product.name} </td>
                <td className="px-4 py-3 text-right">{item.id}</td>
                <td className="px-4 py-3 text-right">${item.price}</td>
                <td className="px-4 py-3 text-right">{item.quantity}</td>
                <td className="px-4 py-3 text-right">${item.price * item.quantity}</td>
            </tr>
        
    );
};

export default OrderItems;