import axios from "axios"
import { useEffect, useState, useCallback } from "react"
import { backendUrl, currency } from "../App"
import { toast } from "react-toastify"

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // 🔥 Static Dummy Users
  const dummyUsers = ["Ashish", "Mahesh", "Pratham", "Rohit", "Amit"]

  // ✅ Fetch Orders
  const fetchOrders = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${backendUrl}/api/order/orders`)

      if (response.data.success) {
        setOrders(response.data.data)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast.error("Error fetching orders")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // ✅ Update Status
  const updateStatus = async (orderId, status) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/order/orders/update-status`,
        { orderId, status }
      )

      if (response.data.success) {
        toast.success("Status updated")
        fetchOrders()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Error updating status:", error)
      toast.error("Error updating status")
    }
  }

  // ✅ Delete Order
  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/order/orders/delete/${orderId}`
      )

      if (response.data.success) {
        toast.success("Order deleted")
        setOrders((prev) =>
          prev.filter((order) => order._id !== orderId)
        )
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Error deleting order:", error)
      toast.error("Error deleting order")
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <p className="mb-3 text-lg font-semibold">All Orders</p>

      <div className="flex flex-col gap-2">

        {/* Header */}
        <div className="hidden md:grid grid-cols-[1fr_2fr_2fr_1fr_1fr_1fr] py-2 px-2 border bg-gray-100 text-sm font-medium">
          <p>User</p>
          <p>Address</p>
          <p>Items</p>
          <p>Amount</p>
          <p>Status</p>
          <p className="text-center">Action</p>
        </div>

        {/* Orders */}
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={order._id}
              className="grid grid-cols-[1fr_2fr_2fr_1fr] md:grid-cols-[1fr_2fr_2fr_1fr_1fr_1fr] gap-2 py-3 px-2 border text-sm items-center"
            >
              {/* 👤 User (FORCED STATIC) */}
              <p className="font-medium">
                {dummyUsers[index % dummyUsers.length]}
              </p>

              {/* 📍 Address */}
              <div>
                <p>{order.address?.street}</p>
                <p className="text-gray-500 text-xs">
                  {order.address?.city}, {order.address?.state}
                </p>
              </div>

              {/* 🛍 Items + Images */}
              <div>
                <p className="text-xs text-gray-500 mb-1">
                  {order.items.length} item(s)
                </p>

                <div className="flex gap-2 flex-wrap">
                  {order.items.map((item, i) => (
                    <img
                      key={i}
                      src={item.image?.[0] || "/placeholder.svg"}
                      alt="product"
                      className="w-10 h-10 object-cover border rounded"
                    />
                  ))}
                </div>
              </div>

              {/* 💰 Amount */}
              <p className="font-medium">
                {currency}
                {order.amount}
              </p>

              {/* 📦 Status */}
              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
                className="border px-2 py-1 rounded"
              >
                <option>Order Placed</option>
                <option>Packing</option>
                <option>Shipped</option>
                <option>Out for Delivery</option>
                <option>Delivered</option>
              </select>

              {/* ❌ Delete */}
              <div className="flex justify-center">
                <button
                  onClick={() => deleteOrder(order._id)}
                  className="text-red-500 text-lg hover:scale-110 transition"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  )
}

export default Orders