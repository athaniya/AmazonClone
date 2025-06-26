import { useEffect, useState } from "react";
import { fetchOrders, updateStatus } from "../service/OrderService";
import { FiRefreshCcw } from "react-icons/fi";

const STATUS_OPTIONS = ["Pending", "Out for Delivery", "Delivered"];

export default function Order() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrder = async () => {
    setLoading(true);
    try {
      const response = await fetchOrders();
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, []);

  const handleUpdateStatus = async (orderId, event) => {
    const newStatus = event.target.value;
    try {
      const response = await updateStatus(orderId, newStatus);
      console.log(orderId,newStatus);
      
      if (response.status === 200) {
        await loadOrder();
      }
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">All Orders</h2>
        <button
          onClick={loadOrder}
          title="Refresh Orders"
          className="text-gray-600 hover:text-gray-900 transition"
        >
          <FiRefreshCcw className={`w-6 h-6 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="space-y-6">
        {data.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-sm border rounded-lg p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Order #{order.id}
              </h3>

              <div className="flex items-center gap-2">
                <select
                  value={order.orderStatus}
                  onChange={(e) => handleUpdateStatus(order.id, e)}
                  className="text-sm border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-700">
              <strong>Items:</strong>
              <ul className="ml-4 list-disc mt-1">
                {order.orderItems.map((item, index) => (
                  <li key={index}>
                    {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-gray-700 mt-2">
              <strong>Total:</strong> ${order.amount.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
