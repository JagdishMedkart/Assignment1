"use client";

import React, { useEffect } from "react";
import { useCart } from "../../components/CartContext";
import Image from "next/image";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    console.log(cart); // Verify cart state
  }, [cart]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. Start adding some products!</p>
      ) : (
        <>
          <ul className="space-y-6">
            {cart.map((item) => (
              <li key={item.productId} className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p className="text-gray-600">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <h2 className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</h2>
            <button
              onClick={clearCart}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
