"use client";

import React, { useState } from "react";
import { useCart } from "../../components/CartContext";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const CartPage = () => {
  const { cart, removeFromCart, addToCart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    cart.reduce((acc, item) => ({ ...acc, [item.productId]: item.quantity }), {})
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any[]>([]);
  const router = useRouter();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      setQuantities((prev) => ({
        ...prev,
        [productId]: newQuantity,
      }));
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
  
    try {
      const response = await fetch("/api/auth/check", { method: "GET" });

      console.log(response);
  
      if (!response.ok) {
        toast.error("Please log in to place an order.");
        router.push(`/auth/signin`);
        return;
      }
  
      const { isLoggedIn } = await response.json();
      if (!isLoggedIn) {
        toast.error("Please log in to place an order.");
        router.push(`/auth/signin`);
        return;
      }
  
      // Proceed with order placement
      const updatedOrderDetails = cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: quantities[item.productId] || item.quantity,
        total: (quantities[item.productId] || item.quantity) * item.price,
      }));
  
      console.log("Order Details:", updatedOrderDetails);
      setOrderDetails(updatedOrderDetails);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error checking login status:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleModalClose = () => setIsModalOpen(false);

  const handleOrderConfirm = () => {
    toast.success("Order placed successfully!");
    setIsModalOpen(false);
    clearCart();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center text-lg text-gray-500">Your cart is empty</div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={quantities[item.productId] || item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.productId, parseInt(e.target.value, 10))
                  }
                  min="1"
                  className="w-16 p-2 border border-gray-300 rounded-lg text-center"
                />
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded-full"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-6">
          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="w-full py-3 px-6 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {isProcessing ? "Processing..." : "Place Order"}
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Order Confirmation</h3>
            <table className="min-w-full table-auto mb-6">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Item</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((order) => (
                  <tr key={order.productId}>
                    <td className="px-4 py-2">{order.name}</td>
                    <td className="px-4 py-2">{order.quantity}</td>
                    <td className="px-4 py-2">${order.price}</td>
                    <td className="px-4 py-2">${order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleOrderConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Yes, Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default CartPage;
