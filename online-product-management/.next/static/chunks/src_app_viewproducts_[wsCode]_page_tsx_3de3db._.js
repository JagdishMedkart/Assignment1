(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_viewproducts_[wsCode]_page_tsx_3de3db._.js", {

"[project]/src/app/viewproducts/[wsCode]/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
;
const ProductDetail = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const wsCode = params.wsCode;
    const { cart, addToCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const [product, setProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [quantity, setQuantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isAdding, setIsAdding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // Track adding state
    const [totalPrice, setTotalPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0); // Track total price
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Fetch product data on load
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductDetail.useEffect": ()=>{
            if (wsCode) {
                const fetchProduct = {
                    "ProductDetail.useEffect.fetchProduct": async ()=>{
                        try {
                            const response = await fetch(`/api/products/${wsCode}`);
                            const data = await response.json();
                            setProduct(data.product);
                        } catch (error) {
                            console.error("Error fetching product details:", error);
                        }
                    }
                }["ProductDetail.useEffect.fetchProduct"];
                const fetchCategories = {
                    "ProductDetail.useEffect.fetchCategories": async ()=>{
                        const response = await fetch("/api/categories");
                        const data = await response.json();
                        console.log("categories = ", data);
                        // Create a mapping of category IDs to names
                        const categoryMap = {};
                        data.categories.forEach({
                            "ProductDetail.useEffect.fetchCategories": (category)=>{
                                categoryMap[category.categoryId] = category.name;
                            }
                        }["ProductDetail.useEffect.fetchCategories"]);
                        setCategories(categoryMap);
                    }
                }["ProductDetail.useEffect.fetchCategories"];
                fetchProduct();
                fetchCategories();
            }
        }
    }["ProductDetail.useEffect"], [
        wsCode
    ]);
    // Update totalPrice when quantity or product price changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductDetail.useEffect": ()=>{
            if (product) {
                setTotalPrice(product.mrp * quantity * 0.9);
            }
        }
    }["ProductDetail.useEffect"], [
        quantity,
        product
    ]);
    const handleAddToCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ProductDetail.useCallback[handleAddToCart]": async ()=>{
            if (isAdding || !product) return; // Prevent adding if already in process
            setIsAdding(true); // Disable button while adding
            try {
                // console.log("Adding to cart: ", { ...product, quantity });
                // Add to cart using the addToCart function
                addToCart({
                    productId: product.wsCode.toString(),
                    name: product.name,
                    price: Number(product.mrp * 0.9),
                    quantity: quantity,
                    image: product.images[0] || "/default-image.jpg"
                });
                // console.log(cart);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Item added to cart!");
            } catch (error) {
                console.error("Error adding to cart", error);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Failed to add item to cart");
            } finally{
                setIsAdding(false); // Re-enable button after adding
            }
        }
    }["ProductDetail.useCallback[handleAddToCart]"], [
        isAdding,
        addToCart,
        product,
        quantity
    ]);
    if (!product) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-10",
            children: "Loading Product Details..."
        }, void 0, false, {
            fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
            lineNumber: 86,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 max-w-7xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>router.push("/viewproducts"),
                className: "flex items-center text-blue-500 mb-6 hover:text-blue-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaArrowLeft"], {
                        size: 20,
                        className: "mr-2"
                    }, void 0, false, {
                        fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    "Back to Products"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full h-80 sm:h-96 lg:h-full rounded-lg overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex space-x-4 overflow-x-auto py-4",
                            children: product.images.map((image, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-shrink-0 w-full lg:w-1/2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: image,
                                        alt: `Product Image ${index + 1}`,
                                        layout: "responsive",
                                        width: 500,
                                        height: 500,
                                        className: "object-cover rounded-lg"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
                                        lineNumber: 106,
                                        columnNumber: 17
                                    }, this)
                                }, index, false, {
                                    fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl font-bold text-gray-900",
                                children: product.name
                            }, void 0, false, {
                                fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg text-gray-700",
                                children: [
                                    "Sales Price: $",
                                    product.mrp * 0.9
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: [
                                    "Package Size: ",
                                    product.packageSize
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600",
                                children: [
                                    "Category: ",
                                    categories[product?.categoryId] || "Unknown"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: product.tags.map((tag, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full",
                                        children: tag
                                    }, index, false, {
                                        fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "quantity",
                                        className: "text-lg font-semibold",
                                        children: "Quantity"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
                                        lineNumber: 140,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        id: "quantity",
                                        value: quantity,
                                        onChange: (e)=>setQuantity(Number(e.target.value)),
                                        min: "1",
                                        className: "w-16 py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl font-bold text-gray-900",
                                children: [
                                    "Total: $",
                                    totalPrice.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleAddToCart,
                                disabled: isAdding,
                                className: `w-full py-3 px-6 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ${isAdding ? "opacity-50 cursor-not-allowed" : ""}`,
                                children: isAdding ? "Adding..." : "Add to Cart"
                            }, void 0, false, {
                                fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
                position: "top-center",
                reverseOrder: false
            }, void 0, false, {
                fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/viewproducts/[wsCode]/page.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
};
_s(ProductDetail, "S+bmXhXY56/zy7mpTtoBe3vFMgY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = ProductDetail;
const __TURBOPACK__default__export__ = ProductDetail;
var _c;
__turbopack_refresh__.register(_c, "ProductDetail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
 // "use client";
 // import React, { useEffect, useState, useCallback } from "react";
 // import { useRouter, useParams } from "next/navigation";
 // import { useCart } from "../../../components/CartContext"; // Assuming CartContext will be updated
 // import Image from "next/image";
 // import { Product } from "@prisma/client";
 // import toast, { Toaster } from "react-hot-toast";
 // import { FaArrowLeft } from "react-icons/fa";
 // const ProductDetail: React.FC = () => {
 //   const router = useRouter();
 //   const params = useParams();
 //   const wsCode = params.wsCode;
 //   const { addToCart } = useCart(); // Update to use CartContext that works with DB now
 //   const [product, setProduct] = useState<Product | null>(null);
 //   const [quantity, setQuantity] = useState(1);
 //   const [isAdding, setIsAdding] = useState(false); // Track adding state
 //   const [totalPrice, setTotalPrice] = useState(0); // Track total price
 //   const [categories, setCategories] = useState<Record<string, string>>({});
 //   // Fetch product data on load
 //   useEffect(() => {
 //     if (wsCode) {
 //       const fetchProduct = async () => {
 //         try {
 //           const response = await fetch(`/api/products/${wsCode}`);
 //           const data = await response.json();
 //           setProduct(data.product);
 //         } catch (error) {
 //           console.error("Error fetching product details:", error);
 //         }
 //       };
 //       const fetchCategories = async () => {
 //         try {
 //           const response = await fetch("/api/categories");
 //           const data = await response.json();
 //           // Create a mapping of category IDs to names
 //           const categoryMap: Record<string, string> = {};
 //           data.categories.forEach((category: { categoryId: string | number; name: string; createdAt: unknown }) => {
 //             categoryMap[category.categoryId] = category.name;
 //           });
 //           setCategories(categoryMap);
 //         } catch (error) {
 //           console.error("Error fetching categories:", error);
 //         }
 //       };
 //       fetchProduct();
 //       fetchCategories();
 //     }
 //   }, [wsCode]);
 //   // Update totalPrice when quantity or product price changes
 //   useEffect(() => {
 //     if (product) {
 //       setTotalPrice(product.mrp * quantity * 0.9); // Apply a 10% discount if needed
 //     }
 //   }, [quantity, product]);
 //   const handleAddToCart = useCallback(async () => {
 //     if (isAdding || !product) return; // Prevent adding if already in process
 //     setIsAdding(true); // Disable button while adding
 //     try {
 //       // Add to cart using the addToCart function from context (which interacts with the DB)
 //       const cartItem = {
 //         productId: product.wsCode,
 //         name: product.name,
 //         price: Number(product.mrp * 0.9), // Apply a discount if needed
 //         quantity: quantity,
 //         image: product.images[0] || "/default-image.jpg", // Fallback image
 //       };
 //       // Sending the cart item data to the API (Backend)
 //       const data = await fetch("/api/cart/add", {
 //         method: "POST",
 //         headers: {
 //           "Content-Type": "application/json",
 //         },
 //         body: JSON.stringify(cartItem),
 //       });
 //       console.log(data);
 //       // Optionally, you can update local cart context here if needed (just as a fallback)
 //       addToCart(cartItem);
 //       toast.success("Item added to cart!");
 //     } catch (error) {
 //       console.error("Error adding to cart", error);
 //       toast.error("Failed to add item to cart");
 //     } finally {
 //       setIsAdding(false); // Re-enable button after adding
 //     }
 //   }, [isAdding, addToCart, product, quantity]);
 //   if (!product) {
 //     return <div className="text-center py-10">Loading Product Details...</div>;
 //   }
 //   return (
 //     <div className="p-6 max-w-7xl mx-auto">
 //       {/* Back Button */}
 //       <button
 //         onClick={() => router.push("/viewproducts")}
 //         className="flex items-center text-blue-500 mb-6 hover:text-blue-700"
 //       >
 //         <FaArrowLeft size={20} className="mr-2" />
 //         Back to Products
 //       </button>
 //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
 //         {/* Product Image Slider */}
 //         <div className="relative w-full h-80 sm:h-96 lg:h-full rounded-lg overflow-hidden">
 //           <div className="flex space-x-4 overflow-x-auto py-4">
 //             {product.images.map((image, index) => (
 //               <div key={index} className="flex-shrink-0 w-full lg:w-1/2">
 //                 <Image
 //                   src={image}
 //                   alt={`Product Image ${index + 1}`}
 //                   layout="responsive"
 //                   width={500}
 //                   height={500}
 //                   className="object-cover rounded-lg"
 //                 />
 //               </div>
 //             ))}
 //           </div>
 //         </div>
 //         {/* Product Details */}
 //         <div className="space-y-6">
 //           <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
 //           <p className="text-lg text-gray-700">Sales Price: ${product.mrp * 0.9}</p>
 //           <p className="text-sm text-gray-500">Package Size: {product.packageSize}</p>
 //           <p className="text-sm text-gray-600">Category: {categories[product?.categoryId] || "Unknown"}</p>
 //           {/* Product Tags */}
 //           <div className="flex gap-2">
 //             {product.tags.map((tag, index) => (
 //               <span
 //                 key={index}
 //                 className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full"
 //               >
 //                 {tag}
 //               </span>
 //             ))}
 //           </div>
 //           {/* Quantity Selector */}
 //           <div className="flex items-center gap-4">
 //             <label htmlFor="quantity" className="text-lg font-semibold">
 //               Quantity
 //             </label>
 //             <input
 //               type="number"
 //               id="quantity"
 //               value={quantity}
 //               onChange={(e) => setQuantity(Number(e.target.value))}
 //               min="1"
 //               className="w-16 py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
 //             />
 //           </div>
 //           {/* Total Price */}
 //           <p className="text-xl font-bold text-gray-900">Total: ${totalPrice.toFixed(2)}</p>
 //           {/* Add to Cart Button */}
 //           <button
 //             onClick={handleAddToCart}
 //             disabled={isAdding} // Disable the button when adding
 //             className={`w-full py-3 px-6 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ${isAdding ? "opacity-50 cursor-not-allowed" : ""}`}
 //           >
 //             {isAdding ? "Adding..." : "Add to Cart"}
 //           </button>
 //         </div>
 //       </div>
 //       <Toaster position="top-center" reverseOrder={false} />
 //     </div>
 //   );
 // };
 // export default ProductDetail;
}}),
"[project]/src/app/viewproducts/[wsCode]/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_app_viewproducts_%5BwsCode%5D_page_tsx_3de3db._.js.map