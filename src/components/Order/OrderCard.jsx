import { useState } from "react";
import useAuthContext from "../../Hooks/useAuthContext";
import OrderTable from "./OrderTable";
import authApiClient from "../../services/auth-api-client";

const OrderCard = ({order, onCancel}) => {
    const [status, setStatus]= useState(order.status)
    const [loading, setLoading]= useState(false)
    
    const handleStatusChange= async(event) => {
        const newStatus= event.target.value
        try {
            const response= await authApiClient.patch(`/orders/${order.id}/update_status/`, {status: newStatus})
            console.log("response: ", response);
            if(response.status === 200) {
                setStatus(newStatus)
                alert(response.data.status)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlePayment= async() => {
        setLoading(true)
        try {
            const response= await authApiClient.post("/payment/initiate/", {
                amount: order.total_price,
                orderId: order.id,
                num_items:order.items?.length,
            })
            console.log(response);
            if (response.data.payment_url) {
                setLoading(false)
                window.location.href= response.data.payment_url
            } 
            else {
                alert("Payment Failed")
            }
        } catch (error) {
            console.log(error);
        }

    }

    const {user}= useAuthContext()
    return (
        <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
            <div className="bg-gray-100 p-6 flex flex-col md:flex-row md:items-center  md:justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold">Order #{order.id}</h2>
                    <p className="text-gray-600 text-sm">Placed on {order.created_at}</p>
                </div>
                <div className="flex gap-2">
                  { user.is_staff ? (
                    <select 
                        value={status}
                        onChange={handleStatusChange} 
                        className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                            <option value="Not Paid">Not Paid</option>
                            <option value="Ready To Ship">Ready To Ship</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Deliverd">Deliverd</option>
                            <option value="Canceled">Canceled</option>
                        </select>
                  )
                  : (
                    <span 
                    className={`px-3 py-1 text-white rounded-full text-sm font-medium ${order.status === 'Not Paid' ? "bg-red-500" : "bg-green-500"}`}>
                        {order.status}
                    </span>
                  )}
                    {order.status !== 'Deliverd' && order.status !== 'Canceled' && !user.is_staff &&(
                    <button 
                        onClick={() => onCancel(order.id)} 
                        className="text-blue-700 hover:underline"
                    >
                        Cancel
                    </button>
                    )}
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Order Items</h3>
                {/* Order Items Table */}
                <div className="p-6">
                    <OrderTable items={order.items} />
                </div>
            </div>
            <div className="border-t p-6 flex flex-col items-end">
                <div className="space-y-2 w-full max-w-[200px]">
                    <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>$500</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>$0.00</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2">
                        <span>Total:</span>
                        <span>$520</span>
                    </div>
                </div>
                {!user.is_staff && order.status === "Not Paid" && (
                <button 
                    onClick={handlePayment}
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 text-white transition-colors rounded-lg px-4 py-2 mt-4">
                   {loading ? <span className="loading loading-ball loading-sm"></span> : " Pay Now"}
                </button>
                )}
            </div>
        </div>
    )
      

  };
  
  export default OrderCard;