"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { FaDollarSign, FaTruck, FaShoppingCart, FaCalendarAlt } from "react-icons/fa";
import { AiOutlineCaretUp } from "react-icons/ai";

interface OrderItem {
  orderItemId: number;
  product: {
    name: string;
    wsCode: number;
  };
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Order {
  orderId: number;
  createdAt: string;
  status: string;
  paymentStatus: string;
  orderItems: OrderItem[];
}

interface Stats {
  mostBoughtProduct: string;
  mostBoughtQuantity: number;
  totalSpent: number;
  firstOrderDate: string;
  lastOrderDate: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);
  const [totalOrders, setTotalOrders] = useState<Number>();
  const [totalPages, setTotalPages] = useState<Number>();
  const ordersPerPage = 5;

  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders?page=${currentPage}`, { method: "GET" });
        if (!response.ok) {
          router.push("/auth/signin");
          return;
        }
        console.log(response);
        const { orders, totalOrders, totalPages, stats } = await response.json();
        setOrders(orders);
        setTotalOrders(Number(totalOrders));
        setTotalPages(totalPages);
        setStats(stats);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [router, currentPage]);

  const toggleOrder = (orderId: number) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  // const startIndex = (currentPage - 1) * ordersPerPage;
  // const paginatedOrders = orders.slice(startIndex, startIndex + ordersPerPage);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h2>

      {isLoading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold text-gray-700">
            You haven’t placed any orders yet.
          </h3>
          <p className="text-gray-500 mt-4">Start shopping to place your first order!</p>
          <button
            onClick={() => router.push("/viewproducts")}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Go to Shop
          </button>
        </div>
      ) : (
        <>
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
                <FaShoppingCart size={24} className="mb-2" />
                <h4 className="text-lg font-semibold">Most Bought Product</h4>
                <p className="text-center">
                  {stats.mostBoughtProduct} ({stats.mostBoughtQuantity})
                </p>
              </div>
              <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
                <FaCalendarAlt size={24} className="mb-2" />
                <h4 className="text-lg font-semibold">First Order</h4>
                <p>{format(new Date(stats.firstOrderDate), "PPP")}</p>
              </div>
              <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
                <FaTruck size={24} className="mb-2" />
                <h4 className="text-lg font-semibold">Last Order</h4>
                <p>{format(new Date(stats.lastOrderDate), "PPP")}</p>
              </div>
              <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
                <FaDollarSign size={24} className="mb-2" />
                <h4 className="text-lg font-semibold">Total Orders Cost</h4>
                <p>${stats.totalSpent.toFixed(2)}</p>
              </div>
            </div>
          )}

          {orders.map((order, index) => {
            // Calculate dynamic order number
            const orderNumber =
              Number(totalOrders) - (currentPage - 1) * ordersPerPage - index;

            return (
              <div
                key={order.orderId}
                className="bg-white rounded-lg shadow-md p-4 mb-4 border cursor-pointer hover:shadow-lg transition"
                onClick={() => toggleOrder(order.orderId)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <AiOutlineCaretUp
                      size={16}
                      className={`transform transition-transform ${expandedOrders.includes(order.orderId)
                          ? "rotate-180"
                          : "rotate-0"
                        }`}
                    />
                    {/* Display dynamic order number */}
                    <p className="font-semibold">Order #{orderNumber}</p>
                  </div>
                  <p>{format(new Date(order.createdAt), "PPP")}</p>
                </div>
                {expandedOrders.includes(order.orderId) && (
                  <div className="mt-4">
                    <table className="w-full text-center">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="py-2">Product</th>
                          <th className="py-2">Quantity</th>
                          <th className="py-2">Unit Price</th>
                          <th className="py-2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.orderItems.map((item) => (
                          <tr key={item.orderItemId}>
                            <td>{item.product.name}</td>
                            <td>{item.quantity}</td>
                            <td>${item.unitPrice}</td>
                            <td>${item.totalPrice}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-4 flex gap-4 justify-center items-center">
                      <div
                        className={`flex items-center gap-2 px-4 py-2 rounded ${order.status === "DELIVERED"
                            ? "bg-green-500 text-white"
                            : order.status === "PENDING"
                              ? "bg-red-500 text-white"
                              : "bg-yellow-500 text-black"
                          }`}
                      >
                        <FaTruck size={18} />
                        {order.status}
                      </div>
                      <div
                        className={`flex items-center gap-2 px-4 py-2 rounded ${order.paymentStatus === "COMPLETED"
                            ? "bg-green-500 text-white"
                            : order.paymentStatus === "PENDING"
                              ? "bg-red-500 text-white"
                              : "bg-yellow-500 text-black"
                          }`}
                      >
                        <FaDollarSign size={18} />
                        {order.paymentStatus}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex justify-center items-center mt-4 gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 bg-black text-white rounded disabled:opacity-50 hover:bg-gray-800 transition-all"
            >
              Previous
            </button>
            <span className="font-semibold">{currentPage}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 bg-black text-white rounded disabled:opacity-50 hover:bg-gray-800 transition-all"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default OrdersPage;
