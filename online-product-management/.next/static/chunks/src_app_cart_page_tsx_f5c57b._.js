(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_cart_page_tsx_f5c57b._.js", {

"[project]/src/app/cart/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// "use client";
// import React, { useState } from "react";
// import { useCart } from "../../components/CartContext";
// import { useRouter } from "next/navigation";
// import toast, { Toaster } from "react-hot-toast";
// import { User } from "@prisma/client";
// const CartPage = () => {
//   const { cart, removeFromCart, addToCart, clearCart } = useCart();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [quantities, setQuantities] = useState<{ [key: string]: number }>(
//     cart.reduce((acc, item) => ({ ...acc, [item.productId]: item.quantity }), {})
//   );
// const [isModalOpen, setIsModalOpen] = useState(false);
// const [orderDetails, setOrderDetails] = useState<any[]>([]);
// const [currrentUser, setCurrentUser] = useState<User>();
// const router = useRouter();
//   const handleQuantityChange = (productId: string, newQuantity: number) => {
//     if (newQuantity < 1) {
//       removeFromCart(productId);
//     } else {
//       setQuantities((prev) => ({
//         ...prev,
//         [productId]: newQuantity,
//       }));
//     }
//   };
//   const handlePlaceOrder = async () => {
//     setIsProcessing(true);
//     try {
//       const response = await fetch("/api/auth/check", { method: "GET" });
//       // console.log(response);
//       if (!response.ok) {
//         toast.error("Please log in to place an order.");
//         router.push(`/auth/signin`);
//         return;
//       }
//       const { isLoggedIn, user } = await response.json();
//       // console.log(user);
//       setCurrentUser(user);
//       if (!isLoggedIn) {
//         toast.error("Please log in to place an order.");
//         router.push(`/auth/signin`);
//         return;
//       }
//       // console.log(cart);
//       // Proceed with order placement
//       const updatedOrderDetails = cart.map((item) => ({
//         productId: item.productId,
//         name: item.name,
//         price: item.price,
//         quantity: quantities[item.productId] || item.quantity,
//         total: (quantities[item.productId] || item.quantity) * item.price,
//       }));
//       // console.log("Order Details:", updatedOrderDetails);
//       setOrderDetails(updatedOrderDetails);
//       setIsModalOpen(true);
//     } catch (error) {
//       console.error("Error checking login status:", error);
//       toast.error("An error occurred. Please try again.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };
// const handleModalClose = () => setIsModalOpen(false);
// const handleOrderConfirm = async () => {
//   try {
//     // console.log(currrentUser);
//     // Create order data, use the updated quantities from the state
//     const orderData = {
//       userId: currrentUser?.userId, // Replace with actual user ID
//       orderItems: cart.map((item) => ({
//         productWsCode: item.productId,
//         quantity: quantities[item.productId] || item.quantity, // Use updated quantity from state
//         unitPrice: item.price,
//         totalPrice: (quantities[item.productId] || item.quantity) * item.price, // Total price based on updated quantity
//       })),
//       totalAmount: cart.reduce((sum, item) => sum + (quantities[item.productId] || item.quantity) * item.price, 0), // Calculate total based on updated quantity
//       address: "123 Street, City, Country", // Replace with user's actual address
//       notes: "Please deliver between 9 AM - 5 PM", // Optional
//     };
//     // console.log(orderData);
//     const response = await fetch("/api/order/place", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(orderData),
//     });
//     const data = await response.json();
//     if (response.ok) {
//       toast.success("Order placed successfully!");
//       clearCart(); // Clear the cart
//       setIsModalOpen(false);
//       setTimeout(() => {
//         router.push("/orders");
//       }, 2000);
//     } else {
//       toast.error(data.message || "Failed to place order.");
//     }
//   } catch (error) {
//     console.error("Error placing order:", error);
//     toast.error("An error occurred. Please try again.");
//   }
// };
//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h2>
//       {cart.length === 0 ? (
//         <div className="text-center mt-12">
//           <div className="text-center text-lg text-gray-500">Your cart is empty</div>
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
//                   src={item.image}
//                   alt={item.name}
//                   className="w-16 h-16 object-cover rounded-lg"
//                 />
//                 <div className="ml-4">
//                   <h3 className="text-lg font-semibold">{item.name}</h3>
//                   <p className="text-sm text-gray-500">${item.price}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="number"
//                   value={quantities[item.productId] || item.quantity}
//                   onChange={(e) =>
//                     handleQuantityChange(item.productId, parseInt(e.target.value, 10))
//                   }
//                   min="1"
//                   className="w-16 p-2 border border-gray-300 rounded-lg text-center"
//                 />
//                 <button
//                   onClick={() => removeFromCart(item.productId)}
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
// {
//   isModalOpen && (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
//         <h3 className="text-xl font-semibold mb-4">Order Confirmation</h3>
//         <table className="min-w-full table-auto mb-6">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 text-left">Item</th>
//               <th className="px-4 py-2 text-left">Quantity</th>
//               <th className="px-4 py-2 text-left">Price</th>
//               <th className="px-4 py-2 text-left">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orderDetails.map((order) => (
//               <tr key={order.productId}>
//                 <td className="px-4 py-2">{order.name}</td>
//                 <td className="px-4 py-2">{order.quantity}</td>
//                 <td className="px-4 py-2">${order.price}</td>
//                 <td className="px-4 py-2">${order.total}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="flex justify-between">
//           <button
//             onClick={handleModalClose}
//             className="px-4 py-2 bg-gray-300 text-black rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleOrderConfirm}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//           >
//             Yes, Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
//       <Toaster position="top-center" reverseOrder={false} />
//     </div>
//   );
// };
// export default CartPage;
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/zod/lib/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
const CartPage = ()=>{
    _s();
    const { removeFromCart, addToCart, clearCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]); // State to hold the user's cart items
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [quantities, setQuantities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [orderDetails, setOrderDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currrentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleModalClose = ()=>setIsModalOpen(false);
    // Fetch the cart data for the logged-in user
    const fetchCart = async ()=>{
        try {
            const response = await fetch("/api/cart/index");
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setCart(data.cartItems);
                // Initialize quantities state based on cart items
                const initialQuantities = data.cartItems.reduce((acc, item)=>{
                    acc[item.productId] = item.quantity;
                    return acc;
                }, {});
                setQuantities(initialQuantities);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Failed to fetch cart items");
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("An error occurred while fetching your cart.");
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartPage.useEffect": ()=>{
            fetchCart();
        }
    }["CartPage.useEffect"], []);
    const handleQuantityChange = async (productId, newQuantity)=>{
        if (newQuantity < 1) {
            // Remove item if quantity is less than 1
            await handleRemoveFromCart((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"])(productId));
        } else {
            // Optimistically update the quantity in the UI
            setQuantities((prevQuantities)=>({
                    ...prevQuantities,
                    [productId]: newQuantity
                }));
            // Update the cart on the server
            const updatedItem = cart.find((item)=>item.productId === productId);
            if (updatedItem) {
                try {
                    const response = await fetch("/api/cart/add", {
                        method: "POST",
                        body: JSON.stringify({
                            productId: parseInt(updatedItem.productId),
                            quantity: newQuantity
                        })
                    });
                    if (!response.ok) {
                        throw new Error("Failed to update cart");
                    }
                } catch (error) {
                    console.error("Error updating cart item:", error);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("An error occurred while updating your cart.");
                }
            }
        }
    };
    const handleRemoveFromCart = async (id)=>{
        const res = await fetch(`/api/auth/check`, {
            method: "GET"
        });
        const usr = await res.json();
        console.log(usr);
        try {
            const response = await fetch(`/api/cart/remove/${id}/${usr.user.userId}`, {
                method: "DELETE",
                body: JSON.stringify({
                    id: id,
                    userId: usr.user.userId
                })
            });
            if (response.ok) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Item removed from cart");
                fetchCart(); // Re-fetch the cart to get updated items
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Failed to remove item from cart");
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.stack);
            }
            console.error("Error removing item from cart:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("An error occurred while removing the item from your cart.");
        }
    };
    const handlePlaceOrder = async ()=>{
        setIsProcessing(true);
        try {
            const response = await fetch("/api/auth/check", {
                method: "GET"
            });
            if (!response.ok) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Please log in to place an order.");
                router.push("/auth/signin");
                return;
            }
            const { isLoggedIn } = await response.json();
            if (!isLoggedIn) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Please log in to place an order.");
                router.push("/auth/signin");
                return;
            }
            const order = await (await fetch(`/api/cart/index`, {
                method: "GET"
            })).json();
            console.log(order);
            setIsModalOpen(true);
            setOrderDetails(order.cartItems);
        // Redirect to order summary page
        // router.push("/orders");
        } catch (error) {
            console.error("Error during order placement:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("An error occurred. Please try again.");
        } finally{
            setIsProcessing(false);
        }
    };
    const handleOrderConfirm = async ()=>{
        try {
            // console.log(currrentUser);
            // Create order data, use the updated quantities from the state
            const res = await fetch(`/api/auth/check`, {
                method: "GET"
            });
            const usr = await res.json();
            console.log(orderDetails);
            const orderData = {
                userId: usr.user.userId,
                orderItems: orderDetails.map((item)=>({
                        productWsCode: item.productId,
                        quantity: item.quantity,
                        unitPrice: item.product.mrp,
                        totalPrice: item.quantity * item.product.mrp
                    })),
                totalAmount: cart.reduce((sum, item)=>sum + item.quantity * item.product.mrp, 0),
                address: "123 Street, City, Country",
                notes: "Please deliver between 9 AM - 5 PM"
            };
            console.log(orderData);
            const response = await fetch("/api/order/place", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            });
            const data = await response.json();
            if (response.ok) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Order placed successfully!");
                clearCart(); // Clear the cart
                setIsModalOpen(false);
                setTimeout(()=>{
                    router.push("/orders");
                }, 2000);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(data.message || "Failed to place order.");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("An error occurred. Please try again.");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-3xl font-bold text-gray-900 mb-6",
                children: "Your Cart"
            }, void 0, false, {
                fileName: "[project]/src/app/cart/page.tsx",
                lineNumber: 426,
                columnNumber: 7
            }, this),
            cart.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mt-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg text-gray-500",
                        children: "Your cart is empty"
                    }, void 0, false, {
                        fileName: "[project]/src/app/cart/page.tsx",
                        lineNumber: 429,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push("/viewproducts"),
                        className: "mt-6 text-lg px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition",
                        children: "Let's fill it..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/cart/page.tsx",
                        lineNumber: 430,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/cart/page.tsx",
                lineNumber: 428,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: cart.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: item.product.images[0],
                                        alt: item.name,
                                        className: "w-16 h-16 object-cover rounded-lg"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/cart/page.tsx",
                                        lineNumber: 445,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ml-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold",
                                                children: item.product.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/cart/page.tsx",
                                                lineNumber: 451,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: [
                                                    "$",
                                                    item.product.mrp
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/cart/page.tsx",
                                                lineNumber: 452,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/cart/page.tsx",
                                        lineNumber: 450,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/cart/page.tsx",
                                lineNumber: 444,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleQuantityChange(item.productId, quantities[item.productId] - 1),
                                        className: "px-3 py-1 bg-gray-300 text-black rounded-lg",
                                        disabled: quantities[item.productId] <= 1,
                                        children: "-"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/cart/page.tsx",
                                        lineNumber: 456,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        value: quantities[item.productId] || item.quantity,
                                        onChange: (e)=>handleQuantityChange(item.productId, parseInt(e.target.value, 10)),
                                        min: "1",
                                        className: "w-16 p-2 border border-gray-300 rounded-lg text-center"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/cart/page.tsx",
                                        lineNumber: 465,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleQuantityChange(item.productId, quantities[item.productId] + 1),
                                        className: "px-3 py-1 bg-gray-300 text-black rounded-lg",
                                        children: "+"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/cart/page.tsx",
                                        lineNumber: 477,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleRemoveFromCart(item.productId),
                                        className: "ml-4 px-3 py-1 bg-red-500 text-white rounded-full",
                                        children: "Remove"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/cart/page.tsx",
                                        lineNumber: 485,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/cart/page.tsx",
                                lineNumber: 455,
                                columnNumber: 15
                            }, this)
                        ]
                    }, item.productId, true, {
                        fileName: "[project]/src/app/cart/page.tsx",
                        lineNumber: 440,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/cart/page.tsx",
                lineNumber: 438,
                columnNumber: 9
            }, this),
            cart.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handlePlaceOrder,
                    disabled: isProcessing,
                    className: "w-full py-3 px-6 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300",
                    children: isProcessing ? "Processing..." : "Place Order"
                }, void 0, false, {
                    fileName: "[project]/src/app/cart/page.tsx",
                    lineNumber: 499,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/cart/page.tsx",
                lineNumber: 498,
                columnNumber: 9
            }, this),
            isModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-6 rounded-lg shadow-lg max-w-lg w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-semibold mb-4",
                            children: "Order Confirmation"
                        }, void 0, false, {
                            fileName: "[project]/src/app/cart/page.tsx",
                            lineNumber: 512,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "min-w-full table-auto mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-2 text-left",
                                                children: "Item"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/cart/page.tsx",
                                                lineNumber: 516,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-2 text-left",
                                                children: "Quantity"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/cart/page.tsx",
                                                lineNumber: 517,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-2 text-left",
                                                children: "Price"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/cart/page.tsx",
                                                lineNumber: 518,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-2 text-left",
                                                children: "Total"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/cart/page.tsx",
                                                lineNumber: 519,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/cart/page.tsx",
                                        lineNumber: 515,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/cart/page.tsx",
                                    lineNumber: 514,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: orderDetails.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-2",
                                                    children: order?.product?.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/cart/page.tsx",
                                                    lineNumber: 525,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-2",
                                                    children: order.quantity
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/cart/page.tsx",
                                                    lineNumber: 526,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-2",
                                                    children: [
                                                        "$",
                                                        order.product.mrp
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/cart/page.tsx",
                                                    lineNumber: 527,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-2",
                                                    children: [
                                                        "$",
                                                        order.product.mrp * order.quantity
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/cart/page.tsx",
                                                    lineNumber: 528,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, order.productId, true, {
                                            fileName: "[project]/src/app/cart/page.tsx",
                                            lineNumber: 524,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/cart/page.tsx",
                                    lineNumber: 522,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/cart/page.tsx",
                            lineNumber: 513,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleModalClose,
                                    className: "px-4 py-2 bg-gray-300 text-black rounded-lg",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/cart/page.tsx",
                                    lineNumber: 534,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleOrderConfirm,
                                    className: "px-4 py-2 bg-blue-600 text-white rounded-lg",
                                    children: "Yes, Place Order"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/cart/page.tsx",
                                    lineNumber: 540,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/cart/page.tsx",
                            lineNumber: 533,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/cart/page.tsx",
                    lineNumber: 511,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/cart/page.tsx",
                lineNumber: 510,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
                position: "top-center",
                reverseOrder: false
            }, void 0, false, {
                fileName: "[project]/src/app/cart/page.tsx",
                lineNumber: 551,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/cart/page.tsx",
        lineNumber: 425,
        columnNumber: 5
    }, this);
};
_s(CartPage, "CKHs/mleNqya1mtLNR08R/BWWhA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CartPage;
const __TURBOPACK__default__export__ = CartPage;
var _c;
__turbopack_refresh__.register(_c, "CartPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/cart/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_app_cart_page_tsx_f5c57b._.js.map