"use client";

import React, { useState, useEffect, Key } from "react";
import { format, parseISO } from "date-fns";
import { FaChevronDown, FaChevronUp, FaDollarSign, FaTruck } from "react-icons/fa"; // React Icons
import { AiOutlineCaretUp } from "react-icons/ai";

interface OrderItem {
    orderItemId: Key | null | undefined;
    product: {
        name: string;
        price: number;
        images: string[];
    };
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

interface Order {
    orderId: number;
    user: {
        name: string;
    };
    createdAt: string;
    status: "PENDING" | "SHIPPED" | "DELIVERED";
    paymentStatus: "PENDING" | "COMPLETED";
    totalAmount: number;
    orderItems: OrderItem[];
    updatedAt: string; // Include updated timestamp
}

interface DashboardStats {
    ordersToday: number;
    pendingOrders: number;
    totalSalesToday: number;
    pendingPayments: number;
    mostPurchasedProduct: { name: string; quantity: number } | null;
}

const AdminOrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedOrders, setExpandedOrders] = useState<number[]>([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const ordersPerPage = 5;

    const totalPages = Math.ceil(totalOrders / ordersPerPage);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const [ordersRes, statsRes, totalCountRes] = await Promise.all([
                    fetch(`/api/admin/orders?page=${currentPage}`),
                    fetch("/api/admin/orders/stats"),
                    fetch("/api/admin/orders/total-count"),
                ]);

                if (ordersRes.ok && statsRes.ok && totalCountRes.ok) {
                    const ordersData = await ordersRes.json();
                    const statsData = await statsRes.json();
                    const totalCountData = await totalCountRes.json();

                    setOrders(ordersData.orders);
                    setDashboardStats(statsData.stats);
                    setTotalOrders(totalCountData.totalOrders);
                } else {
                    console.error("Failed to fetch orders, stats, or total count");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [currentPage]);
    const toggleOrder = (orderId: number) => {
        setExpandedOrders((prev) =>
            prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
        );
    };

    const updateOrder = async (
        orderId: number,
        field: "status" | "paymentStatus",
        value: string
    ) => {
        try {
            const response = await fetch(`/api/admin/orders/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ [field]: value }),
            });

            if (response.ok) {
                // Reload the page to reflect updates in stats and data
                window.location.reload();
            } else {
                console.error("Failed to update order.");
            }
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Admin Orders Dashboard
            </h2>

            {dashboardStats && (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                    <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md text-center hover:bg-blue-600 transition-all flex flex-col items-center">
                        <FaTruck size={36} />
                        <h4 className="text-lg font-semibold mt-2">Orders Today</h4>
                        <p className="text-3xl">{dashboardStats.ordersToday}</p>
                    </div>
                    <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md text-center hover:bg-yellow-600 transition-all flex flex-col items-center">
                        <FaChevronDown size={36} />
                        <h4 className="text-lg font-semibold mt-2">Pending Orders</h4>
                        <p className="text-3xl">{dashboardStats.pendingOrders}</p>
                    </div>
                    <div className="bg-green-500 text-white p-6 rounded-lg shadow-md text-center hover:bg-green-600 transition-all flex flex-col items-center">
                        <FaDollarSign size={36} />
                        <h4 className="text-lg font-semibold mt-2">Total Sales Today</h4>
                        <p className="text-3xl">${dashboardStats.totalSalesToday}</p>
                    </div>
                    <div className="bg-red-500 text-white p-6 rounded-lg shadow-md text-center hover:bg-red-600 transition-all flex flex-col items-center">
                        <FaDollarSign size={36} />
                        <h4 className="text-lg font-semibold mt-2">Pending Payments</h4>
                        <p className="text-3xl">${dashboardStats.pendingPayments}</p>
                    </div>
                    {dashboardStats.mostPurchasedProduct && (
                        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md text-center hover:bg-purple-600 transition-all flex flex-col items-center">
                            <FaChevronUp size={36} />
                            <h4 className="text-lg font-semibold mt-2">Most Purchased Product</h4>
                            <p>
                                {dashboardStats.mostPurchasedProduct.name} (
                                {dashboardStats.mostPurchasedProduct.quantity})
                            </p>
                        </div>
                    )}
                </div>
            )}

            {isLoading ? (
                <p>Loading orders...</p>
            ) : (
                <div>
                    {orders.map((order) => (
                        <div
                            key={order.orderId}
                            className="bg-white rounded-lg shadow-md p-4 mb-4 border cursor-pointer hover:shadow-lg transition"
                            onClick={() => toggleOrder(order.orderId)}
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <AiOutlineCaretUp
                                        size={16}
                                        className={`transform transition-transform ${expandedOrders.includes(order.orderId) ? "rotate-180" : "rotate-0"
                                            }`}
                                    />
                                    <p className="font-semibold">Order #{order.orderId}</p>
                                </div>
                                <p>{format(new Date(order.createdAt), "PPP")}</p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <p>{order.user.name}</p>
                                <p>${order.totalAmount}</p>
                                <div className="flex gap-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateOrder(order.orderId, "status", e.target.value)}
                                        className={`border text-sm rounded px-1 py-1 ${order.status === "DELIVERED" ? "bg-green-500 text-white cursor-default" : order.status === "SHIPPED" ? "bg-yellow-500 text-white cursor-default" :
                                            "bg-red-500 text-white cursor-default"
                                            }`}
                                        disabled={order.status === "DELIVERED"}
                                    >
                                        <option value="PENDING">PENDING</option>
                                        <option value="SHIPPED">SHIPPED</option>
                                        <option value="DELIVERED">DELIVERED</option>
                                    </select>
                                    <select
                                        value={order.paymentStatus}
                                        onChange={(e) => updateOrder(order.orderId, "paymentStatus", e.target.value)}
                                        className={`border text-sm rounded px-1 py-1 ${order.paymentStatus === "COMPLETED" ? "bg-green-500 text-white cursor-default" : "bg-red-500 text-white cursor-default"
                                            }`}
                                        disabled={order.paymentStatus === "COMPLETED"}
                                    >
                                        <option value="PENDING">PENDING</option>
                                        <option value="COMPLETED">COMPLETED</option>
                                    </select>
                                </div>
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
                                    <div className="mt-4 text-center text-sm">
                                        <p>Ordered At: {format(new Date(order.createdAt), "PPP pp")}</p>
                                        {order.status === "DELIVERED" && order.paymentStatus === "COMPLETED" ? (
                                            <p>Completed At: {format(new Date(order.updatedAt), "PPP pp")}</p>
                                        ) : (
                                            <p>Completed At: Not yet completed</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {/* Pagination */}
                    <div className="flex justify-between mt-6">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50 hover:bg-gray-800 transition-all"
                        >
                            Previous
                        </button>
                        <span className="text-lg font-semibold">{currentPage}</span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50 hover:bg-gray-800 transition-all"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrdersPage;
