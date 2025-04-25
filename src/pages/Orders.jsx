import { useEffect, useState } from "react";
import OrderCard from "../components/Order/OrderCard";
import authApiClient from "../services/auth-api-client";

const Orders = () => {

    // const orders= [
    //     {
    //       "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       "user": 1,
    //       "status": "Not Paid",
    //       "created_at": "2025-04-21T16:09:15.886Z",
    //       "items": [
    //         {
    //           "id": 1,
    //           "product": {
    //             "id": 2,
    //             "name": "Laptop",
    //             "price": 60
    //           },
    //           "quantity": 2,
    //           "price": 120
    //         },
    //         {
    //           "id": 3,
    //           "product": {
    //             "id": 4,
    //             "name": "Desktop",
    //             "price": 250
    //           },
    //           "quantity": 4,
    //           "price": 1000
    //         }
    //       ],
    //       "total_price": 0
    //     },
    //     {
    //       "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       "user": 1,
    //       "status": "Not Paid",
    //       "created_at": "2025-04-21T16:09:15.886Z",
    //       "items": [
    //         {
    //           "id": 1,
    //           "product": {
    //             "id": 2,
    //             "name": "Laptop",
    //             "price": 60
    //           },
    //           "quantity": 2,
    //           "price": 120
    //         },
    //         {
    //           "id": 3,
    //           "product": {
    //             "id": 4,
    //             "name": "Desktop",
    //             "price": 250
    //           },
    //           "quantity": 4,
    //           "price": 1000
    //         }
    //       ],
    //       "total_price": 0
    //     },
        
    //   ]
    const [orders, setOrder]= useState([])

    useEffect(() => {
        authApiClient.get("/orders/")
        .then(res => setOrder(res.data))
    }, [])

    const handleCancelOrder= async(orderId) => {
        try {
            const response= await authApiClient.post(`/orders/${orderId}/cancel/`)
            console.log(response);
            if (response.status === 200) {
                setOrder(previousOrder => previousOrder.map(order => order.id === orderId ? {
                    ...order, status: "Canceled"} 
                    : order
                ))
            }
            alert("Canceled Successfully")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='container mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold mb-6'>Order Details</h1>
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} onCancel= {handleCancelOrder} />
            ))}

          
        </div>
    );
};

export default Orders;