"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Define Cart Item Type
interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

// Create Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((i) => i.productId === item.productId);
      let currentQuantity = 0;
      if(existingItemIndex !== -1)
      {
        currentQuantity = prevCart[existingItemIndex].quantity;
        setCart((prevCart) => prevCart.filter((item) => item.productId !== item.productId));
      }
      console.log(existingItemIndex);
      console.log(prevCart);
      
      if (existingItemIndex !== -1) {
        // If the item already exists, just update the quantity to the exact selected quantity
        const updatedCart = [...prevCart];
        console.log("qua = ", item.quantity)
        console.log("old quantity = ", updatedCart[existingItemIndex].quantity)
        updatedCart[existingItemIndex].quantity += item.quantity; // Replace with selected quantity
        console.log("new quantity = ", updatedCart[existingItemIndex].quantity)
        console.log(prevCart);
        return updatedCart;
      } else {
        // If item does not exist, add it as new
        return [...prevCart, item];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
