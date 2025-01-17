(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_f01838._.js", {

"[project]/src/app/cart/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
const CartPage = ()=>{
    _s();
    const { cart, removeFromCart, addToCart, clearCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [quantities, setQuantities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(cart.reduce({
        "CartPage.useState": (acc, item)=>({
                ...acc,
                [item.productId]: item.quantity
            })
    }["CartPage.useState"], {}));
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [orderDetails, setOrderDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currrentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleQuantityChange = (productId, newQuantity)=>{
        if (newQuantity < 1) {
            removeFromCart(productId);
        } else {
            setQuantities((prev)=>({
                    ...prev,
                    [productId]: newQuantity
                }));
        }
    };
    const handlePlaceOrder = async ()=>{
        setIsProcessing(true);
        try {
            const response = await fetch("/api/auth/check", {
                method: "GET"
            });
            // console.log(response);
            if (!response.ok) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Please log in to place an order.");
                router.push(`/auth/signin`);
                return;
            }
            const { isLoggedIn, user } = await response.json();
            // console.log(user);
            setCurrentUser(user);
            if (!isLoggedIn) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Please log in to place an order.");
                router.push(`/auth/signin`);
                return;
            }
            // console.log(cart);
            // Proceed with order placement
            const updatedOrderDetails = cart.map((item)=>({
                    productId: item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: quantities[item.productId] || item.quantity,
                    total: (quantities[item.productId] || item.quantity) * item.price
                }));
            // console.log("Order Details:", updatedOrderDetails);
            setOrderDetails(updatedOrderDetails);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error checking login status:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("An error occurred. Please try again.");
        } finally{
            setIsProcessing(false);
        }
    };
    const handleModalClose = ()=>setIsModalOpen(false);
    const handleOrderConfirm = async ()=>{
        try {
            // console.log(currrentUser);
            // Create order data, use the updated quantities from the state
            const orderData = {
                userId: currrentUser?.userId,
                orderItems: cart.map((item)=>({
                        productWsCode: item.productId,
                        quantity: quantities[item.productId] || item.quantity,
                        unitPrice: item.price,
                        totalPrice: (quantities[item.productId] || item.quantity) * item.price
                    })),
                totalAmount: cart.reduce((sum, item)=>sum + (quantities[item.productId] || item.quantity) * item.price, 0),
                address: "123 Street, City, Country",
                notes: "Please deliver between 9 AM - 5 PM"
            };
            // console.log(orderData);
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
                lineNumber: 124,
                columnNumber: 7
            }, this),
            cart.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mt-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center text-lg text-gray-500",
                        children: "Your cart is empty"
                    }, void 0, false, {
                        fileName: "[project]/src/app/cart/page.tsx",
                        lineNumber: 127,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push("/viewproducts"),
                        className: "mt-6 text-lg px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition",
                        children: "Let's fill it..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/cart/page.tsx",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/cart/page.tsx",
                lineNumber: 126,
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
                                        src: item.image,
                                        alt: item.name,
                                        className: "w-16 h-16 object-cover rounded-lg"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/cart/page.tsx",
                                        lineNumber: 143,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ml-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold",
                                                children: item.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/cart/page.tsx",
                                                lineNumber: 149,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: [
                                                    "$",
                                                    item.price
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/cart/page.tsx",
                                                lineNumber: 150,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/cart/page.tsx",
                                        lineNumber: 148,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/cart/page.tsx",
                                lineNumber: 142,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        value: quantities[item.productId] || item.quantity,
                                        onChange: (e)=>handleQuantityChange(item.productId, parseInt(e.target.value, 10)),
                                        min: "1",
                                        className: "w-16 p-2 border border-gray-300 rounded-lg text-center"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/cart/page.tsx",
                                        lineNumber: 154,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>removeFromCart(item.productId),
                                        className: "ml-4 px-3 py-1 bg-red-500 text-white rounded-full",
                                        children: "Remove"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/cart/page.tsx",
                                        lineNumber: 163,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/cart/page.tsx",
                                lineNumber: 153,
                                columnNumber: 15
                            }, this)
                        ]
                    }, item.productId, true, {
                        fileName: "[project]/src/app/cart/page.tsx",
                        lineNumber: 138,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/cart/page.tsx",
                lineNumber: 136,
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
                    lineNumber: 177,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/cart/page.tsx",
                lineNumber: 176,
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
                            lineNumber: 191,
                            columnNumber: 9
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
                                                lineNumber: 195,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-2 text-left",
                                                children: "Quantity"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/cart/page.tsx",
                                                lineNumber: 196,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-2 text-left",
                                                children: "Price"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/cart/page.tsx",
                                                lineNumber: 197,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-2 text-left",
                                                children: "Total"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/cart/page.tsx",
                                                lineNumber: 198,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/cart/page.tsx",
                                        lineNumber: 194,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/cart/page.tsx",
                                    lineNumber: 193,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: orderDetails.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-2",
                                                    children: order.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/cart/page.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-2",
                                                    children: order.quantity
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/cart/page.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-2",
                                                    children: [
                                                        "$",
                                                        order.price
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/cart/page.tsx",
                                                    lineNumber: 206,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-2",
                                                    children: [
                                                        "$",
                                                        order.total
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/cart/page.tsx",
                                                    lineNumber: 207,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, order.productId, true, {
                                            fileName: "[project]/src/app/cart/page.tsx",
                                            lineNumber: 203,
                                            columnNumber: 15
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/cart/page.tsx",
                                    lineNumber: 201,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/cart/page.tsx",
                            lineNumber: 192,
                            columnNumber: 9
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
                                    lineNumber: 213,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleOrderConfirm,
                                    className: "px-4 py-2 bg-blue-600 text-white rounded-lg",
                                    children: "Yes, Place Order"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/cart/page.tsx",
                                    lineNumber: 219,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/cart/page.tsx",
                            lineNumber: 212,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/cart/page.tsx",
                    lineNumber: 190,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/cart/page.tsx",
                lineNumber: 189,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
                position: "top-center",
                reverseOrder: false
            }, void 0, false, {
                fileName: "[project]/src/app/cart/page.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/cart/page.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, this);
};
_s(CartPage, "2L/Y1uWmI721/bavLK8uL+UJ10Y=", false, function() {
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
}}),
"[project]/src/app/cart/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
module.exports = __turbopack_require__("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
"[project]/node_modules/goober/dist/goober.modern.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "css": (()=>u),
    "extractCss": (()=>r),
    "glob": (()=>b),
    "keyframes": (()=>h),
    "setup": (()=>m),
    "styled": (()=>j)
});
let e = {
    data: ""
}, t = (t)=>"object" == typeof window ? ((t ? t.querySelector("#_goober") : window._goober) || Object.assign((t || document.head).appendChild(document.createElement("style")), {
        innerHTML: " ",
        id: "_goober"
    })).firstChild : t || e, r = (e)=>{
    let r = t(e), l = r.data;
    return r.data = "", l;
}, l = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g, a = /\/\*[^]*?\*\/|  +/g, n = /\n+/g, o = (e, t)=>{
    let r = "", l = "", a = "";
    for(let n in e){
        let c = e[n];
        "@" == n[0] ? "i" == n[1] ? r = n + " " + c + ";" : l += "f" == n[1] ? o(c, n) : n + "{" + o(c, "k" == n[1] ? "" : t) + "}" : "object" == typeof c ? l += o(c, t ? t.replace(/([^,])+/g, (e)=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, (t)=>/&/.test(t) ? t.replace(/&/g, e) : e ? e + " " + t : t)) : n) : null != c && (n = /^--/.test(n) ? n : n.replace(/[A-Z]/g, "-$&").toLowerCase(), a += o.p ? o.p(n, c) : n + ":" + c + ";");
    }
    return r + (t && a ? t + "{" + a + "}" : a) + l;
}, c = {}, s = (e)=>{
    if ("object" == typeof e) {
        let t = "";
        for(let r in e)t += r + s(e[r]);
        return t;
    }
    return e;
}, i = (e, t, r, i, p)=>{
    let u = s(e), d = c[u] || (c[u] = ((e)=>{
        let t = 0, r = 11;
        for(; t < e.length;)r = 101 * r + e.charCodeAt(t++) >>> 0;
        return "go" + r;
    })(u));
    if (!c[d]) {
        let t = u !== e ? e : ((e)=>{
            let t, r, o = [
                {}
            ];
            for(; t = l.exec(e.replace(a, ""));)t[4] ? o.shift() : t[3] ? (r = t[3].replace(n, " ").trim(), o.unshift(o[0][r] = o[0][r] || {})) : o[0][t[1]] = t[2].replace(n, " ").trim();
            return o[0];
        })(e);
        c[d] = o(p ? {
            ["@keyframes " + d]: t
        } : t, r ? "" : "." + d);
    }
    let f = r && c.g ? c.g : null;
    return r && (c.g = c[d]), ((e, t, r, l)=>{
        l ? t.data = t.data.replace(l, e) : -1 === t.data.indexOf(e) && (t.data = r ? e + t.data : t.data + e);
    })(c[d], t, i, f), d;
}, p = (e, t, r)=>e.reduce((e, l, a)=>{
        let n = t[a];
        if (n && n.call) {
            let e = n(r), t = e && e.props && e.props.className || /^go/.test(e) && e;
            n = t ? "." + t : e && "object" == typeof e ? e.props ? "" : o(e, "") : !1 === e ? "" : e;
        }
        return e + l + (null == n ? "" : n);
    }, "");
function u(e) {
    let r = this || {}, l = e.call ? e(r.p) : e;
    return i(l.unshift ? l.raw ? p(l, [].slice.call(arguments, 1), r.p) : l.reduce((e, t)=>Object.assign(e, t && t.call ? t(r.p) : t), {}) : l, t(r.target), r.g, r.o, r.k);
}
let d, f, g, b = u.bind({
    g: 1
}), h = u.bind({
    k: 1
});
function m(e, t, r, l) {
    o.p = t, d = e, f = r, g = l;
}
function j(e, t) {
    let r = this || {};
    return function() {
        let l = arguments;
        function a(n, o) {
            let c = Object.assign({}, n), s = c.className || a.className;
            r.p = Object.assign({
                theme: f && f()
            }, c), r.o = / *go\d+/.test(s), c.className = u.apply(r, l) + (s ? " " + s : ""), t && (c.ref = o);
            let i = e;
            return e[0] && (i = c.as || e, delete c.as), g && i[0] && g(c), d(i, c);
        }
        return t ? t(a) : a;
    };
}
;
}}),
"[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "CheckmarkIcon": (()=>_),
    "ErrorIcon": (()=>k),
    "LoaderIcon": (()=>V),
    "ToastBar": (()=>C),
    "ToastIcon": (()=>M),
    "Toaster": (()=>De),
    "default": (()=>kt),
    "resolveValue": (()=>f),
    "toast": (()=>c),
    "useToaster": (()=>O),
    "useToasterStore": (()=>D)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/goober/dist/goober.modern.js [app-client] (ecmascript)");
"use client";
var W = (e)=>typeof e == "function", f = (e, t)=>W(e) ? e(t) : e;
var F = (()=>{
    let e = 0;
    return ()=>(++e).toString();
})(), S = (()=>{
    let e;
    return ()=>{
        if (e === void 0 && typeof window < "u") {
            let t = matchMedia("(prefers-reduced-motion: reduce)");
            e = !t || t.matches;
        }
        return e;
    };
})();
;
var J = 20;
var U = (e, t)=>{
    switch(t.type){
        case 0:
            return {
                ...e,
                toasts: [
                    t.toast,
                    ...e.toasts
                ].slice(0, J)
            };
        case 1:
            return {
                ...e,
                toasts: e.toasts.map((r)=>r.id === t.toast.id ? {
                        ...r,
                        ...t.toast
                    } : r)
            };
        case 2:
            let { toast: o } = t;
            return U(e, {
                type: e.toasts.find((r)=>r.id === o.id) ? 1 : 0,
                toast: o
            });
        case 3:
            let { toastId: a } = t;
            return {
                ...e,
                toasts: e.toasts.map((r)=>r.id === a || a === void 0 ? {
                        ...r,
                        dismissed: !0,
                        visible: !1
                    } : r)
            };
        case 4:
            return t.toastId === void 0 ? {
                ...e,
                toasts: []
            } : {
                ...e,
                toasts: e.toasts.filter((r)=>r.id !== t.toastId)
            };
        case 5:
            return {
                ...e,
                pausedAt: t.time
            };
        case 6:
            let s = t.time - (e.pausedAt || 0);
            return {
                ...e,
                pausedAt: void 0,
                toasts: e.toasts.map((r)=>({
                        ...r,
                        pauseDuration: r.pauseDuration + s
                    }))
            };
    }
}, A = [], P = {
    toasts: [],
    pausedAt: void 0
}, u = (e)=>{
    P = U(P, e), A.forEach((t)=>{
        t(P);
    });
}, Q = {
    blank: 4e3,
    error: 4e3,
    success: 2e3,
    loading: 1 / 0,
    custom: 4e3
}, D = (e = {})=>{
    let [t, o] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(P);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>(A.push(o), ()=>{
            let s = A.indexOf(o);
            s > -1 && A.splice(s, 1);
        }), [
        t
    ]);
    let a = t.toasts.map((s)=>{
        var r, n, i;
        return {
            ...e,
            ...e[s.type],
            ...s,
            removeDelay: s.removeDelay || ((r = e[s.type]) == null ? void 0 : r.removeDelay) || (e == null ? void 0 : e.removeDelay),
            duration: s.duration || ((n = e[s.type]) == null ? void 0 : n.duration) || (e == null ? void 0 : e.duration) || Q[s.type],
            style: {
                ...e.style,
                ...(i = e[s.type]) == null ? void 0 : i.style,
                ...s.style
            }
        };
    });
    return {
        ...t,
        toasts: a
    };
};
var Y = (e, t = "blank", o)=>({
        createdAt: Date.now(),
        visible: !0,
        dismissed: !1,
        type: t,
        ariaProps: {
            role: "status",
            "aria-live": "polite"
        },
        message: e,
        pauseDuration: 0,
        ...o,
        id: (o == null ? void 0 : o.id) || F()
    }), h = (e)=>(t, o)=>{
        let a = Y(t, e, o);
        return u({
            type: 2,
            toast: a
        }), a.id;
    }, c = (e, t)=>h("blank")(e, t);
c.error = h("error");
c.success = h("success");
c.loading = h("loading");
c.custom = h("custom");
c.dismiss = (e)=>{
    u({
        type: 3,
        toastId: e
    });
};
c.remove = (e)=>u({
        type: 4,
        toastId: e
    });
c.promise = (e, t, o)=>{
    let a = c.loading(t.loading, {
        ...o,
        ...o == null ? void 0 : o.loading
    });
    return typeof e == "function" && (e = e()), e.then((s)=>{
        let r = t.success ? f(t.success, s) : void 0;
        return r ? c.success(r, {
            id: a,
            ...o,
            ...o == null ? void 0 : o.success
        }) : c.dismiss(a), s;
    }).catch((s)=>{
        let r = t.error ? f(t.error, s) : void 0;
        r ? c.error(r, {
            id: a,
            ...o,
            ...o == null ? void 0 : o.error
        }) : c.dismiss(a);
    }), e;
};
;
var q = (e, t)=>{
    u({
        type: 1,
        toast: {
            id: e,
            height: t
        }
    });
}, G = ()=>{
    u({
        type: 5,
        time: Date.now()
    });
}, x = new Map, K = 1e3, Z = (e, t = K)=>{
    if (x.has(e)) return;
    let o = setTimeout(()=>{
        x.delete(e), u({
            type: 4,
            toastId: e
        });
    }, t);
    x.set(e, o);
}, O = (e)=>{
    let { toasts: t, pausedAt: o } = D(e);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (o) return;
        let r = Date.now(), n = t.map((i)=>{
            if (i.duration === 1 / 0) return;
            let d = (i.duration || 0) + i.pauseDuration - (r - i.createdAt);
            if (d < 0) {
                i.visible && c.dismiss(i.id);
                return;
            }
            return setTimeout(()=>c.dismiss(i.id), d);
        });
        return ()=>{
            n.forEach((i)=>i && clearTimeout(i));
        };
    }, [
        t,
        o
    ]);
    let a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        o && u({
            type: 6,
            time: Date.now()
        });
    }, [
        o
    ]), s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])((r, n)=>{
        let { reverseOrder: i = !1, gutter: d = 8, defaultPosition: p } = n || {}, g = t.filter((m)=>(m.position || p) === (r.position || p) && m.height), E = g.findIndex((m)=>m.id === r.id), b = g.filter((m, R)=>R < E && m.visible).length;
        return g.filter((m)=>m.visible).slice(...i ? [
            b + 1
        ] : [
            0,
            b
        ]).reduce((m, R)=>m + (R.height || 0) + d, 0);
    }, [
        t
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        t.forEach((r)=>{
            if (r.dismissed) Z(r.id, r.removeDelay);
            else {
                let n = x.get(r.id);
                n && (clearTimeout(n), x.delete(r.id));
            }
        });
    }, [
        t
    ]), {
        toasts: t,
        handlers: {
            updateHeight: q,
            startPause: G,
            endPause: a,
            calculateOffset: s
        }
    };
};
;
;
;
;
;
var te = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`, oe = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`, re = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`, k = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e)=>e.primary || "#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${te} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${oe} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${(e)=>e.secondary || "#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${re} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`;
;
var ie = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`, V = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${(e)=>e.secondary || "#e0e0e0"};
  border-right-color: ${(e)=>e.primary || "#616161"};
  animation: ${ie} 1s linear infinite;
`;
;
var ce = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`, pe = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`, _ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e)=>e.primary || "#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ce} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${pe} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${(e)=>e.secondary || "#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`;
var me = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])("div")`
  position: absolute;
`, ue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`, le = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`, fe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${le} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`, M = ({ toast: e })=>{
    let { icon: t, type: o, iconTheme: a } = e;
    return t !== void 0 ? typeof t == "string" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(fe, null, t) : t : o === "blank" ? null : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(ue, null, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(V, {
        ...a
    }), o !== "loading" && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(me, null, o === "error" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(k, {
        ...a
    }) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(_, {
        ...a
    })));
};
var Te = (e)=>`
0% {transform: translate3d(0,${e * -200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`, ye = (e)=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e * -150}%,-1px) scale(.6); opacity:0;}
`, ge = "0%{opacity:0;} 100%{opacity:1;}", he = "0%{opacity:1;} 100%{opacity:0;}", xe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`, be = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`, Se = (e, t)=>{
    let a = e.includes("top") ? 1 : -1, [s, r] = S() ? [
        ge,
        he
    ] : [
        Te(a),
        ye(a)
    ];
    return {
        animation: t ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"])(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards` : `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"])(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`
    };
}, C = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.memo(({ toast: e, position: t, style: o, children: a })=>{
    let s = e.height ? Se(e.position || t || "top-center", e.visible) : {
        opacity: 0
    }, r = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(M, {
        toast: e
    }), n = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(be, {
        ...e.ariaProps
    }, f(e.message, e));
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(xe, {
        className: e.className,
        style: {
            ...s,
            ...o,
            ...e.style
        }
    }, typeof a == "function" ? a({
        icon: r,
        message: n
    }) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Fragment, null, r, n));
});
;
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setup"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement);
var ve = ({ id: e, className: t, style: o, onHeightUpdate: a, children: s })=>{
    let r = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useCallback({
        "ve.useCallback[r]": (n)=>{
            if (n) {
                let i = {
                    "ve.useCallback[r].i": ()=>{
                        let d = n.getBoundingClientRect().height;
                        a(e, d);
                    }
                }["ve.useCallback[r].i"];
                i(), new MutationObserver(i).observe(n, {
                    subtree: !0,
                    childList: !0,
                    characterData: !0
                });
            }
        }
    }["ve.useCallback[r]"], [
        e,
        a
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement("div", {
        ref: r,
        className: t,
        style: o
    }, s);
}, Ee = (e, t)=>{
    let o = e.includes("top"), a = o ? {
        top: 0
    } : {
        bottom: 0
    }, s = e.includes("center") ? {
        justifyContent: "center"
    } : e.includes("right") ? {
        justifyContent: "flex-end"
    } : {};
    return {
        left: 0,
        right: 0,
        display: "flex",
        position: "absolute",
        transition: S() ? void 0 : "all 230ms cubic-bezier(.21,1.02,.73,1)",
        transform: `translateY(${t * (o ? 1 : -1)}px)`,
        ...a,
        ...s
    };
}, Re = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"]`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`, v = 16, De = ({ reverseOrder: e, position: t = "top-center", toastOptions: o, gutter: a, children: s, containerStyle: r, containerClassName: n })=>{
    let { toasts: i, handlers: d } = O(o);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement("div", {
        id: "_rht_toaster",
        style: {
            position: "fixed",
            zIndex: 9999,
            top: v,
            left: v,
            right: v,
            bottom: v,
            pointerEvents: "none",
            ...r
        },
        className: n,
        onMouseEnter: d.startPause,
        onMouseLeave: d.endPause
    }, i.map((p)=>{
        let g = p.position || t, E = d.calculateOffset(p, {
            reverseOrder: e,
            gutter: a,
            defaultPosition: t
        }), b = Ee(g, E);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(ve, {
            id: p.id,
            key: p.id,
            onHeightUpdate: d.updateHeight,
            className: p.visible ? Re : "",
            style: b
        }, p.type === "custom" ? f(p.message, p) : s ? s(p) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(C, {
            toast: p,
            position: g
        }));
    }));
};
var kt = c;
;
 //# sourceMappingURL=index.mjs.map
}}),
}]);

//# sourceMappingURL=_f01838._.js.map