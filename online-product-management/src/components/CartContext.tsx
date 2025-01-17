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
            if (existingItemIndex !== -1) {
                currentQuantity = prevCart[existingItemIndex].quantity;
                setCart((prevCart) => prevCart.filter((item) => item.productId !== item.productId));
            }
            // console.log(existingItemIndex);
            // console.log(prevCart);

            if (existingItemIndex !== -1) {
                // If the item already exists, just update the quantity to the exact selected quantity
                const updatedCart = [...prevCart];
                // console.log("qua = ", item.quantity)
                // console.log("old quantity = ", updatedCart[existingItemIndex].quantity)
                updatedCart[existingItemIndex].quantity += item.quantity;
                if (updatedCart[existingItemIndex].quantity <= 0) {
                    updatedCart.splice(existingItemIndex, 1); // Remove if quantity is 0 or less
                } // Replace with selected quantity
                // console.log("new quantity = ", updatedCart[existingItemIndex].quantity)
                // console.log(prevCart);
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


// "use client";

// import React, { createContext, useContext, useState, useEffect } from "react";

// // Define Cart Item Type
// interface CartItem {
//     productId: string;
//     name: string;
//     price: number;
//     quantity: number;
//     image: string;
// }

// interface CartContextType {
//     cart: CartItem[];
//     addToCart: (item: CartItem) => Promise<void>;
//     removeFromCart: (productId: string) => Promise<void>;
//     clearCart: () => Promise<void>;
//     fetchCart: () => Promise<void>;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCart = (): CartContextType => {
//     const context = useContext(CartContext);
//     if (!context) {
//         throw new Error("useCart must be used within a CartProvider");
//     }
//     return context;
// };

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
//     children,
// }) => {
//     const [cart, setCart] = useState<CartItem[]>([]);

//     // Fetch the cart from the database
//     const fetchCart = async () => {
//         try {
//             const response = await fetch("/api/cart/index");
//             if (!response.ok) throw new Error("Failed to fetch cart.");
//             const data = await response.json();
//             setCart(data.cart || []);
//         } catch (error) {
//             console.error("Error fetching cart:", error);
//         }
//     };

//     // Add item to the cart
//     const addToCart = async (item: CartItem) => {
//         try {
//             const response = await fetch("/api/cart/add", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(item),
//             });
//             console.log(response);
//             if (!response.ok) throw new Error("Failed to add item to cart.");
//             await fetchCart(); // Refresh cart
//         } catch (error) {
//             if (error instanceof Error) {
//                 console.log(error.stack);
//             }
//             console.error("Error adding item to cart:", error);
//         }
//     };

//     // Remove item from the cart
//     const removeFromCart = async (id: string, userId: string) => {
//         try {
//             const response = await fetch(`/api/cart/remove/${id}/${userId}`, {
//                 method: "DELETE",
//             });
//             if (!response.ok) throw new Error("Failed to remove item from cart.");
//             await fetchCart(); // Refresh cart
//         } catch (error) {
//             console.error("Error removing item from cart:", error);
//         }
//     };

//     // Clear the cart
//     const clearCart = async () => {
//         try {
//             const response = await fetch("/api/cart/clear", { method: "DELETE" });
//             if (!response.ok) throw new Error("Failed to clear cart.");
//             setCart([]); // Clear local state
//         } catch (error) {
//             console.error("Error clearing cart:", error);
//         }
//     };

//     useEffect(() => {
//         fetchCart(); // Fetch cart on initialization
//     }, []);

//     return (
//         <CartContext.Provider
//             value={{ cart, addToCart, removeFromCart, clearCart, fetchCart }}
//         >
//             {children}
//         </CartContext.Provider>
//     );
// };
