"use client";

import React, { useState } from "react";
import { useCart } from "../../components/CartContext";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { User } from "@prisma/client";

const CartPage = () => {
  const { cart, removeFromCart, addToCart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    cart.reduce((acc, item) => ({ ...acc, [item.productId]: item.quantity }), {})
  );
const [isModalOpen, setIsModalOpen] = useState(false);
const [orderDetails, setOrderDetails] = useState<any[]>([]);
const [currrentUser, setCurrentUser] = useState<User>();
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

      // console.log(response);

      if (!response.ok) {
        toast.error("Please log in to place an order.");
        router.push(`/auth/signin`);
        return;
      }

      const { isLoggedIn, user } = await response.json();
      // console.log(user);
      setCurrentUser(user);
      if (!isLoggedIn) {
        toast.error("Please log in to place an order.");
        router.push(`/auth/signin`);
        return;
      }

      // console.log(cart);

      // Proceed with order placement
      const updatedOrderDetails = cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: quantities[item.productId] || item.quantity,
        total: (quantities[item.productId] || item.quantity) * item.price,
      }));

      // console.log("Order Details:", updatedOrderDetails);
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

const handleOrderConfirm = async () => {
  try {
    // console.log(currrentUser);

    // Create order data, use the updated quantities from the state
    const orderData = {
      userId: currrentUser?.userId, // Replace with actual user ID
      orderItems: cart.map((item) => ({
        productWsCode: item.productId,
        quantity: quantities[item.productId] || item.quantity, // Use updated quantity from state
        unitPrice: item.price,
        totalPrice: (quantities[item.productId] || item.quantity) * item.price, // Total price based on updated quantity
      })),
      totalAmount: cart.reduce((sum, item) => sum + (quantities[item.productId] || item.quantity) * item.price, 0), // Calculate total based on updated quantity
      address: "123 Street, City, Country", // Replace with user's actual address
      notes: "Please deliver between 9 AM - 5 PM", // Optional
    };

    // console.log(orderData);

    const response = await fetch("/api/order/place", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success("Order placed successfully!");
      clearCart(); // Clear the cart
      setIsModalOpen(false);
      setTimeout(() => {
        router.push("/orders");
      }, 2000);
    } else {
      toast.error(data.message || "Failed to place order.");
    }
  } catch (error) {
    console.error("Error placing order:", error);
    toast.error("An error occurred. Please try again.");
  }
};


  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center mt-12">
          <div className="text-center text-lg text-gray-500">Your cart is empty</div>
          <button
            onClick={() => router.push("/viewproducts")}
            className="mt-6 text-lg px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Let's fill it...
          </button>
        </div>
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

{
  isModalOpen && (
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
  )
}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default CartPage;





// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import toast, { Toaster } from "react-hot-toast";
// import { User } from "next-auth";
// import { useCart } from "@/components/CartContext";

// const CartPage = () => {
//   const { removeFromCart, addToCart, clearCart } = useCart();
//   const [cart, setCart] = useState<any[]>([]); // State to hold the user's cart items
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [orderDetails, setOrderDetails] = useState<any[]>([]);
//   const [currrentUser, setCurrentUser] = useState<User>();
//   const router = useRouter();


//   const handleModalClose = () => setIsModalOpen(false);
//   // Fetch the cart data for the logged-in user
//   const fetchCart = async () => {
//     try {
//       const response = await fetch("/api/cart/index");
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//         setCart(data.cartItems);
//         // Initialize quantities state based on cart items
//         const initialQuantities = data.cartItems.reduce((acc: any, item: any) => {
//           acc[item.productId] = item.quantity;
//           return acc;
//         }, {});
//         setQuantities(initialQuantities);
//       } else {
//         toast.error("Failed to fetch cart items");
//       }
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//       toast.error("An error occurred while fetching your cart.");
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const handleQuantityChange = async (productId: string, newQuantity: number) => {
//     if (newQuantity < 1) {
//       await handleRemoveFromCart(productId);
//     } else {
//       const updatedItem = cart.find((item) => item.productId === productId);
//       if (updatedItem) {
//         await updateCartItem(updatedItem, newQuantity);
//       }
//     }
//   };

//   const updateCartItem = async (updatedItem: any, newQuantity: number) => {
//     try {
//       const response = await fetch("/api/cart/add", {
//         method: "POST",
//         body: JSON.stringify({
//           productId: parseInt(updatedItem.productId),
//           quantity: newQuantity,
//         }),
//       });
//       if (response.ok) {
//         toast.success("Cart updated successfully");
//         fetchCart(); // Re-fetch the cart to get updated items
//       } else {
//         toast.error("Failed to update cart");
//       }
//     } catch (error) {
//       console.error("Error updating cart item:", error);
//       toast.error("An error occurred while updating your cart.");
//     }
//   };

//   const handleRemoveFromCart = async (id: number) => {
//     const res = await fetch(`/api/auth/check`, { method: "GET" });
//     const usr = await res.json();
//     console.log(usr);
//     try {
//       const response = await fetch(`/api/cart/remove/${id}/${usr.user.userId}`, {
//         method: "DELETE",
//         body: JSON.stringify({ id: id, userId: usr.user.userId }),
//       });
//       if (response.ok) {
//         toast.success("Item removed from cart");
//         fetchCart(); // Re-fetch the cart to get updated items
//       } else {
//         toast.error("Failed to remove item from cart");
//       }
//     } catch (error) {
//       if(error instanceof Error)
//       {
//         console.log(error.stack)
//       }
//       console.error("Error removing item from cart:", error);
//       toast.error("An error occurred while removing the item from your cart.");
//     }
//   };

//   const handlePlaceOrder = async () => {
//     setIsProcessing(true);
//     try {
//       const response = await fetch("/api/auth/check", { method: "GET" });
//       if (!response.ok) {
//         toast.error("Please log in to place an order.");
//         router.push("/auth/signin");
//         return;
//       }

//       const { isLoggedIn } = await response.json();
//       if (!isLoggedIn) {
//         toast.error("Please log in to place an order.");
//         router.push("/auth/signin");
//         return;
//       }

//       const order = await (await fetch(`/api/cart/index`, { method: "GET" })).json();
//       console.log(order);
//       setIsModalOpen(true);
//       setOrderDetails(order.cartItems);
//       // Redirect to order summary page
//       // router.push("/orders");
//     } catch (error) {
//       console.error("Error during order placement:", error);
//       toast.error("An error occurred. Please try again.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleOrderConfirm = async () => {
//     try {
//       // console.log(currrentUser);

//       // Create order data, use the updated quantities from the state
//       const res = await fetch(`/api/auth/check`, { method: "GET" });
//       const usr = await res.json();
//       console.log(orderDetails)
//       const orderData = {
//         userId: usr.user.userId, // Replace with actual user ID
//         orderItems: orderDetails.map((item) => ({
//           productWsCode: item.productId,
//           quantity: item.quantity, // Use updated quantity from state
//           unitPrice: item.product.mrp,
//           totalPrice: (item.quantity) * item.product.mrp, // Total price based on updated quantity
//         })),
//         totalAmount: cart.reduce((sum, item) => sum + (item.quantity) * item.product.mrp, 0), // Calculate total based on updated quantity
//         address: "123 Street, City, Country", // Replace with user's actual address
//         notes: "Please deliver between 9 AM - 5 PM", // Optional
//       };

//       console.log(orderData);

//       const response = await fetch("/api/order/place", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         toast.success("Order placed successfully!");
//         clearCart(); // Clear the cart
//         setIsModalOpen(false);
//         setTimeout(() => {
//           router.push("/orders");
//         }, 2000);
//       } else {
//         toast.error(data.message || "Failed to place order.");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       toast.error("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h2>
//       {cart.length === 0 ? (
//         <div className="text-center mt-12">
//           <p className="text-lg text-gray-500">Your cart is empty</p>
//           <button
//             onClick={() => router.push("/viewproducts")}
//             className="mt-6 text-lg px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//           >
//             Let's fill it...
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {cart.map((item) => (
//             <div
//               key={item.productId}
//               className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md"
//             >
//               <div className="flex items-center">
//                 <img
//                   src={item.product.images[0]}
//                   alt={item.name}
//                   className="w-16 h-16 object-cover rounded-lg"
//                 />
//                 <div className="ml-4">
//                   <h3 className="text-lg font-semibold">{item.product.name}</h3>
//                   <p className="text-sm text-gray-500">${item.product.mrp}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="number"
//                   value={quantities[item.productId] || item.quantity}
//                   onChange={(e) =>
//                     handleQuantityChange(
//                       item.productId,
//                       parseInt(e.target.value, 10)
//                     )
//                   }
//                   min="1"
//                   className="w-16 p-2 border border-gray-300 rounded-lg text-center"
//                 />
//                 <button
//                   onClick={() => handleRemoveFromCart(item.productId)}
//                   className="ml-4 px-3 py-1 bg-red-500 text-white rounded-full"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {cart.length > 0 && (
//         <div className="mt-6">
//           <button
//             onClick={handlePlaceOrder}
//             disabled={isProcessing}
//             className="w-full py-3 px-6 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
//           >
//             {isProcessing ? "Processing..." : "Place Order"}
//           </button>
//         </div>
//       )}

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
//             <h3 className="text-xl font-semibold mb-4">Order Confirmation</h3>
//             <table className="min-w-full table-auto mb-6">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-2 text-left">Item</th>
//                   <th className="px-4 py-2 text-left">Quantity</th>
//                   <th className="px-4 py-2 text-left">Price</th>
//                   <th className="px-4 py-2 text-left">Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orderDetails.map((order) => (
//                   <tr key={order.productId}>
//                     <td className="px-4 py-2">{order?.product?.name}</td>
//                     <td className="px-4 py-2">{order.quantity}</td>
//                     <td className="px-4 py-2">${order.product.mrp}</td>
//                     <td className="px-4 py-2">${order.product.mrp * order.quantity}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="flex justify-between">
//               <button
//                 onClick={handleModalClose}
//                 className="px-4 py-2 bg-gray-300 text-black rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleOrderConfirm}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//               >
//                 Yes, Place Order
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Toaster position="top-center" reverseOrder={false} />
//     </div>
//   );
// };

// export default CartPage;
