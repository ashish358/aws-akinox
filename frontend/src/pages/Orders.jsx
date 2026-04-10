import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../component/Title";
import axios from "axios";
import { FaBox, FaTruck, FaShippingFast, FaCheckCircle } from "react-icons/fa";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState("");
  const [trackingSteps, setTrackingSteps] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.data.success || !response.data.data.length) {
        console.error("No orders found");
        return;
      }

      const formattedOrders = response.data.data.map((order) => {
        const firstItem = order.items?.length ? order.items[0] : {};

        return {
          orderId: order._id,
          status: order.status,
          payment: order.payment,
          paymentMethod: order.paymentMethod,
          date: new Date(order.date).toLocaleDateString(),
          name: firstItem.name || "Item Not Available",
          image: firstItem.image ? firstItem.image[0] : "fallback-image-url",
          price: firstItem.price || order.amount,
          quantity: firstItem._doc?.quantity ?? "N/A",
          colour: firstItem.colour || "Not Available",
        };
      });

      setOrderData(formattedOrders.reverse());
    } catch (error) {
      console.error("❌ Error fetching user orders:", error);
    }
  };

  const trackOrder = async (orderId) => {
    try {
      setTrackingOrder(orderId);
  
      // Fetch order status
      const response = await axios.get(`${backendUrl}/api/order/orders/status/${orderId}`);
  
      if (response.data.success) {
        const latestStatus = response.data.data.status;
        setOrderStatus(latestStatus); // Update order status only
      } else {
        setOrderStatus("Unable to fetch status");
        setTrackingSteps([]);
      }
    } catch (error) {
      console.error("Error fetching order status:", error);
      setOrderStatus("Error fetching status");
      setTrackingSteps([]);
    }
  };
  
  

  useEffect(() => {
    loadOrderData();
  }, [token]);


  useEffect(() => {
    if (!orderStatus) return; // Prevent running on initial render
  
    const trackingData = [
      { status: "Ordered", date: "Mar 10", icon: <FaBox />, completed: true },
      { status: "Shipped", date: "Mar 12", icon: <FaTruck />, completed: orderStatus !== "Order at Warehouse" },
      { status: "In Transit", date: "Mar 15", icon: <FaShippingFast />, completed: orderStatus === "Order in Transit" || orderStatus === "Order Received" },
      { status: "Delivered", date: "Mar 16", icon: <FaCheckCircle />, completed: orderStatus === "Order Received" }
    ];
  
    console.log()
    setTrackingSteps(trackingData);
  }, [orderStatus]); // Run only when `orderStatus` updates

  
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.length > 0 ? (
          orderData.slice(0, 3).map((item, index) => (
            <div key={index} className="py-4 border-t to-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-6 text-sm">
                <img className="w-16 sm:w-20" src={item.image || "fallback-image-url"} alt="" />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">{currency}{item.price}</p>
                    <p className="sm:text-base font-medium">Quantity: {item.quantity}</p>
                    <p className="sm:text-base font-medium">Colour: {item.colour}</p>
                  </div>
                  <p className="mt-2">Date: <span className="text-gray-400">{item.date}</span></p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className={`min-w-2 h-2 rounded-full ${item.status === "Delivered" ? "bg-green-500" : "bg-yellow-500"}`}></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  className="border px-4 py-2 text-sm font-medium rounded-sm bg-white-600 text-black transition group hover:bg-black hover:text-white"
                  onClick={() => trackOrder(item.orderId)}
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>

      {/* Order Tracking Modal */}
      {trackingOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Order Tracking</h2>

              {/* Tracking Progress */}
              <div className="flex justify-between items-center mt-6 relative">
                {trackingSteps.map((step, index) => (
                  <div key={index} className="relative flex flex-col items-center text-center w-full">
                    {/* Connecting Line */}
                    {index !== 0 && (
                      <div className={`absolute -left-[50%] top-1/2 h-[4px] w-[100%] 
                        ${step.completed ? "bg-green-500" : "bg-gray-300"}`}
                        style={{ zIndex: -1 }}
                      ></div>
                    )}

                    {/* Step Circle */}
                    <div className={`w-12 h-12 flex items-center justify-center rounded-full border-4 text-lg 
                      ${step.completed ? "bg-green-500 border-green-500 text-white" : "bg-gray-200 border-gray-400 text-gray-500"}`}
                    >
                      {step.icon}
                    </div>

                    {/* Step Label */}
                    <p className={`text-sm font-semibold mt-2 ${step.completed ? "text-green-700" : "text-gray-600"}`}>
                      {step.status}
                    </p>
                  </div>
                ))}
              </div>


            {/* Close Button */}
            <button
              className="border mt-6 w-full bg-black text-white px-4 py-2 rounded transition group hover:bg-white hover:text-black "
              onClick={() => setTrackingOrder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
