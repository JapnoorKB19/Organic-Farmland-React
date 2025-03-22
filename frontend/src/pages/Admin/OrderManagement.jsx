import { useEffect, useState } from 'react';

function OrderManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from backend
    setOrders([
      { id: 1, buyer: "John Doe", product: "Organic Mangoes", status: "Pending" },
      { id: 2, buyer: "Aditi Verma", product: "Fresh Tomatoes", status: "Shipped" },
    ]);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Order Management</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id} className="border p-2 mb-2 rounded">
            {order.buyer} ordered {order.product} - Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderManagement;
