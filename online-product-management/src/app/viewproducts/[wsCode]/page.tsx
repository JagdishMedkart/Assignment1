"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCart } from "../../../components/CartContext";
import Image from "next/image";
import { Product } from "@prisma/client";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const wsCode = params.wsCode;
  const { cart, addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false); // Track adding state
  const [totalPrice, setTotalPrice] = useState(0); // Track total price
  const [categories, setCategories] = useState<Record<string, string>>({});

  // Fetch product data on load
  useEffect(() => {
    if (wsCode) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/products/${wsCode}`);
          const data = await response.json();
          setProduct(data.product);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };
      const fetchCategories = async () => {
        const response = await fetch("/api/categories");
        const data = await response.json();
        console.log("categories = ", data);

        // Create a mapping of category IDs to names
        const categoryMap: Record<string, string> = {};
        data.categories.forEach((category: { categoryId: string | number; name: string; createdAt: unknown }) => {
          categoryMap[category.categoryId] = category.name;
        });
        setCategories(categoryMap);
      };
      fetchProduct();
      fetchCategories();
    }
  }, [wsCode]);

  // Update totalPrice when quantity or product price changes
  useEffect(() => {
    if (product) {
      setTotalPrice(product.mrp * quantity * 0.9);
    }
  }, [quantity, product]);

  const handleAddToCart = useCallback(async () => {
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
        image: product.images[0] || "/default-image.jpg",
      });

      // console.log(cart);

      toast.success("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart", error);
      toast.error("Failed to add item to cart");
    } finally {
      setIsAdding(false); // Re-enable button after adding
    }
  }, [isAdding, addToCart, product, quantity]);

  if (!product) {
    return <div className="text-center py-10">Loading Product Details...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.push("/viewproducts")}
        className="flex items-center text-blue-500 mb-6 hover:text-blue-700"
      >
        <FaArrowLeft size={20} className="mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image Slider */}
        <div className="relative w-full h-80 sm:h-96 lg:h-full rounded-lg overflow-hidden">
          <div className="flex space-x-4 overflow-x-auto py-4">
            {product.images.map((image, index) => (
              <div key={index} className="flex-shrink-0 w-full lg:w-1/2">
                <Image
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  layout="responsive"
                  width={500}
                  height={500}
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-lg text-gray-700">Sales Price: ${product.mrp * 0.9}</p>
          <p className="text-sm text-gray-500">Package Size: {product.packageSize}</p>
          <p className="text-sm text-gray-600">Category: {categories[product?.categoryId] || "Unknown"}</p>

          {/* Product Tags */}
          <div className="flex gap-2">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <label htmlFor="quantity" className="text-lg font-semibold">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              className="w-16 py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Total Price */}
          <p className="text-xl font-bold text-gray-900">Total: ${totalPrice.toFixed(2)}</p>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding} // Disable the button when adding
            className={`w-full py-3 px-6 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ${isAdding ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default ProductDetail;




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
