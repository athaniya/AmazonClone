import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../context/StoreContext"
import { fetchOrders } from "../service/OrderService";
import { FiRefreshCcw } from "react-icons/fi";


export default function Order() {

  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (token) {
      loadOrder();
    }
  }, [token])

  const loadOrder = async () => {
      try {
        const response = await fetchOrders(token);
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      <div className="space-y-6">
        {data.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-sm border rounded-lg p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Order #{order.id}</h3>

              <div className="flex items-center gap-2">
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    order.orderStatus === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.orderStatus === "Out for Delivery"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.orderStatus}
                </span>

                {/* Refresh Button */}
                <button
                  title="Refresh Orders"
                  className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
                  onClick={loadOrder}
                >
                  <FiRefreshCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-600 mt-2">
              <strong>Items:</strong>
              <ul className="ml-4 list-disc mt-1">
                {order.orderItems.map((item, index) => (
                  <li key={index}>
                    {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-gray-600 mt-2">
              <strong>Total:</strong> ${order.amount.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
