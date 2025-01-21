"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "@/components/Layout/Spinner";
import toast from "react-hot-toast";
import { FaEye, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IoInformationCircle } from "react-icons/io5";
import { number } from "zod";

// Type for the Product
interface Product {
    productId: number;
    name: string;
    wsCode: number;
    salesPrice: number;
    mrp: number;
    packageSize: number;
    tags: string[];
    images: string[];
    categoryId: number;
    categoryName?: string; // Added to map category name
}

interface Category {
    categoryId: number;
    name: string;
    createdAt: unknown
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
    const [productToDelete, setProductToDelete] = useState<number>(-1);
    const [categories, setCategories] = useState<Category[]>([]);
    const [detailedViewProduct, setDetailedViewProduct] = useState<Product | null>(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const productsPerPage = 5;
    const [totalPages, setTotalPages] = useState(1);
    const [pendingOrders, setPendingOrders] = useState<number>(0);


    const fetchCategories = async () => {
        try {
            const response = await fetch("/api/categories");
            const data = await response.json();
            // console.log("Categories Response:", data); // Debug response
            if (data.success) {
                setCategories(data.categories);
            } else {
                toast.error(data.message || "Failed to fetch categories");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("An error occurred while fetching categories.");
        }
    };

    const mapCategoriesToProducts = (products: Product[], categories: Category[]) => {
        // console.log("Mapping Categories:", categories);
        return products.map((product) => ({
            ...product,
            categoryName:
                categories.find((cat) => Number(cat.categoryId) === Number(product.categoryId))?.name || "Unknown",
        }));
    };

    // Fetch categories first, then fetch products after categories are set
    useEffect(() => {
        const fetchData = async () => {
            await fetchCategories(); // Fetch categories first
        };
        fetchData();
    }, []); // Empty dependency array ensures it runs only once on moun


    // Delete Modal
    const DeleteModal = ({ isOpen, onConfirm, onCancel }) => {
        if (!isOpen) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                    <h3 className="text-xl mb-4">Are you sure you want to delete this product?</h3>
                    <div className="flex justify-between">
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                        >
                            Yes
                        </button>
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const EditModal = ({ isOpen, product, onCancel }) => {
        const [formData, setFormData] = useState({
            name: product?.name || "",
            mrp: product?.mrp || "",
            packageSize: product?.packageSize || "",
            categoryId: product?.categoryId || "",
            tags: product?.tags.join(", ") || "",
            existingImages: product?.images || [], // Load existing images
            newImages: [],
        });


        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        };

        const handleImageChange = (e) => {
            const files = Array.from(e.target.files);
            if (formData.existingImages.length + formData.newImages.length + files.length > 5) {
                toast.error("Maximum of 5 images allowed.");
                return;
            }
            setFormData((prev) => ({ ...prev, newImages: [...prev.newImages, ...files] }));
        };

        const removeImage = (type, index) => {
            if (type === "existing") {
                setFormData((prev) => ({
                    ...prev,
                    existingImages: prev.existingImages.filter((_: any, i: any) => i !== index),
                }));
            } else if (type === "new") {
                setFormData((prev) => ({
                    ...prev,
                    newImages: prev.newImages.filter((_, i) => i !== index),
                }));
            }
        };


        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            const { name, mrp, packageSize, categoryId, tags, existingImages, newImages } = formData;

            if (!name || !mrp || !packageSize || !categoryId) {
                toast.error("Please fill all required fields!");
                return;
            }

            if(parseFloat(mrp) <= 0) {
                toast.error("MRP is invalid!");
                return;
            }

            if(packageSize < 0) {
                toast.error("Package size is invalid!");
                return;
            }

            try {
                // Fetch and convert existing images to Base64
                const base64ExistingImages = await Promise.all(
                    existingImages.map(async (imagePath) => {
                        try {
                            const response = await fetch(imagePath);
                            const blob = await response.blob();
                            return await new Promise((resolve, reject) => {
                                const reader = new FileReader();
                                reader.onload = () => resolve(reader.result);
                                reader.onerror = reject;
                                reader.readAsDataURL(blob);
                            });
                        } catch (err) {
                            console.error(`Failed to fetch existing image at ${imagePath}:`, err);
                            return null; // Return null if fetching fails
                        }
                    })
                );

                console.log(base64ExistingImages)

                // Remove nulls from the array if any fetch failed
                const validBase64ExistingImages = base64ExistingImages.filter(Boolean);

                // Convert new images to Base64
                const base64NewImages = await Promise.all(
                    newImages.map(
                        (image) =>
                            new Promise((resolve, reject) => {
                                const reader = new FileReader();
                                reader.onload = () => resolve(reader.result);
                                reader.onerror = reject;
                                reader.readAsDataURL(image);
                            })
                    )
                );

                console.log(base64NewImages)
                // Combine all images
                const allImages = [...validBase64ExistingImages, ...base64NewImages];

                console.log(allImages);

                // Validate image count
                if (allImages.length > 5) {
                    toast.error("Maximum of 5 images allowed.");
                    return;
                }

                // Send the combined images to the server
                const response = await fetch(`/api/products/${product.wsCode}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        mrp: parseFloat(mrp),
                        packageSize: parseFloat(packageSize),
                        categoryId: parseInt(categoryId),
                        tags: tags.split(",").map((tag) => tag.trim()),
                        images: allImages,
                    }),
                });

                const result = await response.json();

                if (result.success) {
                    toast.success(result.message || "Product updated successfully!");
                    onCancel(); // Close modal
                } else {
                    toast.error(result.message || "Failed to update product.");
                }
            } catch (error) {
                console.error("Error updating product:", error);
                toast.error("An error occurred while updating the product.");
            }
        };


        return isOpen ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg w-full max-w-3xl shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Product</h2>
                    <div className="overflow-y-scroll max-h-[70vh] pr-4"> {/* Scrollable content wrapper */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Product Name */}
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter product name"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* MRP */}
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">MRP</label>
                                <input
                                    type="number"
                                    name="mrp"
                                    value={formData.mrp}
                                    onChange={handleChange}
                                    placeholder="Enter product price"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Package Size */}
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">Package Size</label>
                                <input
                                    type="number"
                                    name="packageSize"
                                    value={formData.packageSize}
                                    onChange={handleChange}
                                    placeholder="Enter product size"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">Tags</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    placeholder="Enter product tags"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Image Upload Section */}
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">Images</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {/* Existing Images */}
                                    {formData.existingImages.map((image, index) => (
                                        <div
                                            key={index}
                                            className="relative rounded-lg shadow-md border border-gray-200 p-2 bg-gray-50"
                                        >
                                            <img
                                                src={image}
                                                alt="Product"
                                                className="w-full h-24 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage("existing", index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md hover:bg-red-600"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                    {/* New Images */}
                                    {formData.newImages.map((image, index) => (
                                        <div
                                            key={index}
                                            className="relative rounded-lg shadow-md border border-gray-200 p-2 bg-gray-50"
                                        >
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt="New Upload"
                                                className="w-full h-24 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage("new", index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md hover:bg-red-600"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-4">
                                <button
                                    type="submit"
                                    className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        ) : null;
    }

    const handleEditClick = (product: Product) => {
        setProductToEdit(product);
        setIsEditModalOpen(true);
    };

    const handleCancelEdit = () => {
        setIsEditModalOpen(false);
        setProductToEdit(null);
    };

    // useEffect(() => {
    //   const fetchData = async () => {
    //     await fetchCategories(); // Fetch categories first
    //     fetchProducts(1); // Then fetch products
    //   };

    //   fetchData();
    // }, []); // Empty 

    // Delete Product API
    async function deleteProduct(wsCode: number) {
        try {
            const response = await fetch(`/api/products/${wsCode}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete product");
            }
            setProducts((prev) => prev.filter((product) => product.wsCode !== wsCode));
            toast.success("Product deleted successfully!");
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while deleting the product.");
        }
    }

    const handleDeleteClick = (wsCode: number) => {
        setProductToDelete(wsCode);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (productToDelete) {
            try {
                await deleteProduct(productToDelete);
                setIsDeleteModalOpen(false);
                setProductToDelete(-1);
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setProductToDelete(-1);
    };

    const fetchProducts = async (page: number) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/admin/products?page=${page}`);
            const data = await response.json();
            console.log("data = ", data);
            if (response.ok) {
                const mappedProducts = mapCategoriesToProducts(data.products, categories);
                setProducts(mappedProducts);
                setTotalPages(data.totalPages);
                setCurrentPage(data.page);
            } else {
                toast.error(data.message || "Failed to fetch products");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("An error occurred while fetching products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(1);
    }, []);


    useEffect(() => {
        if (categories.length > 0) {
            const fetchProducts = async () => {
                setLoading(true);
                try {
                    const ordersRes = await fetch(`/api/admin/products?page=${currentPage}`);
                    // fetch("/api/admin/products/total-count")

                    console.log(ordersRes);
                    // console.log(totalCountRes);
                    // const response = await fetch(`/api/admin/products?page=${currentPage}`);
                    // const data = await response.json();
                    if (ordersRes.ok) {
                        const ordersData = await ordersRes.json();
                        console.log("ordersData = ", ordersData);
                        const mappedProducts = mapCategoriesToProducts(ordersData.products, categories);
                        setProducts(mappedProducts);
                        setTotalPages(ordersData.totalPages);

                        // setCurrentPage(data.currentPage);
                    } else {
                        toast.error("Failed to fetch Products");
                    }
                } catch (error) {
                    console.error("Error fetching products:", error);
                    toast.error("An error occurred while fetching products.");
                } finally {
                    setLoading(false);
                }
            };
            fetchProducts(); // Fetch products only after categories are fetched
        }
    }, [categories, currentPage]);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        fetchProducts(page);
    };

    const handleViewDetails = async (product: Product) => {
        const count = (await fetch(`/api/admin/pending-orders?wsCode=${product.wsCode}`, { method: "GET" }));
        const res = await count.json();
        console.log(res);
        if (res.success) {
            setPendingOrders(res?.pendingOrders);
        }
        const data = await fetch(`/api/products/${product.wsCode}`, { method: "GET" });
        const res2 = await data.json();
        console.log(res2);
        // fetchProducts(currentPage);
        setDetailedViewProduct(res2.product);
    };

    const handleCloseDetails = () => {
        setDetailedViewProduct(null);
        setCurrentSlideIndex(0);
        // fetchProducts(currentPage);
    };

    return (
        <div className="max-w-5xl mx-auto my-8">
            <h2 className="text-2xl font-bold mb-6">Product List</h2>

            {loading ? (
                <Spinner />
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-lg font-semibold">WS Code</th>
                            <th className="border border-gray-300 px-4 py-2 text-lg font-semibold">Product Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-lg font-semibold">Sales Price</th>
                            <th className="border border-gray-300 px-4 py-2 text-lg font-semibold">MRP</th>
                            <th className="border border-gray-300 px-4 py-2 text-lg font-semibold">Package Size</th>
                            <th className="border border-gray-300 px-4 py-2 text-lg font-semibold">Tags</th>
                            <th className="border border-gray-300 px-4 py-2 text-lg font-semibold">Category</th>
                            <th className="border border-gray-300 px-4 py-2 text-lg font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => {
                                const isDeleted = product.deletedAt !== null; // Check if the product is soft-deleted
                                return (
                                    <tr
                                        key={product.wsCode}
                                        className={`text-center ${isDeleted ? "bg-gray-200 text-gray-500" : ""}`}
                                    >
                                        <td className="border border-gray-300 px-4 py-4">{product.wsCode}</td>
                                        <td className="border border-gray-300 px-4 py-4">{product.name}</td>
                                        <td className="border border-gray-300 px-4 py-4">
                                            ${isDeleted ? "N/A" : (Math.ceil(0.9 * product.mrp)).toFixed(2)}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-4">
                                            ${isDeleted ? "N/A" : product.mrp}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-4">
                                            {isDeleted ? "N/A" : product.packageSize}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-4">
                                            {(Array.isArray(product.tags) ? product.tags : [product.tags]).join(", ")}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-4">
                                            {product.categoryName}
                                        </td>
                                        <td className="border border-gray-300 px-6 py-8 flex justify-center gap-2">
                                            <button
                                                className={`btn btn-sm bg-blue-500 text-white mr-2`}
                                                onClick={() => handleViewDetails(product)}
                                            // disabled={isDeleted}
                                            >
                                                <IoInformationCircle size={25} style={{ fill: "black", background: "white" }} />
                                            </button>
                                            <button
                                                className={`btn btn-sm bg-red-500 text-white hover:text-black mr-2 ${isDeleted ? "opacity-50 cursor-not-allowed" : ""
                                                    }`}
                                                onClick={() => !isDeleted && handleDeleteClick(product.wsCode)}
                                                disabled={isDeleted}
                                            >
                                                <FaTrash size={25} style={{ fill: "black", background: "white" }} />
                                            </button>
                                            <button
                                                className={`btn btn-sm bg-blue-500 text-white hover:text-black ${isDeleted ? "opacity-50 cursor-not-allowed" : ""
                                                    }`}
                                                onClick={() => !isDeleted && handleEditClick(product)}
                                                disabled={isDeleted}
                                            >
                                                <MdEdit size={25} style={{ fill: "black", background: "white" }} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                                >
                                    No products available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            )}

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />

            <EditModal
                isOpen={isEditModalOpen}
                product={productToEdit}
                onCancel={handleCancelEdit}
            />

            {/* Pagination */}
            {products.length > 0 && (
                <div className="flex justify-between mt-6">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        className="px-4 py-2 bg-black text-white rounded disabled:opacity-50 hover:bg-gray-800 transition-all"
                    >
                        Previous
                    </button>
                    <span className="text-lg font-semibold">{currentPage} of {totalPages}</span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className="px-4 py-2 bg-black text-white rounded disabled:opacity-50 hover:bg-gray-800 transition-all"
                    >
                        Next
                    </button>
                </div>
            )}

            {detailedViewProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-4xl p-8 relative">
                        {/* Close Button */}
                        <button
                            onClick={handleCloseDetails}
                            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600"
                        >
                            Close
                        </button>

                        {/* Main Content */}
                        <div className="flex">
                            {/* Left Section - Sliding Images */}
                            <div className="w-1/2 flex items-center">
                                <div className="relative w-full">
                                    <div className="slider flex overflow-hidden rounded-lg border border-gray-300">
                                        {detailedViewProduct.images.map((image, index) => (
                                            <div
                                                key={index}
                                                className="w-full flex-shrink-0"
                                                style={{
                                                    transform: `translateX(-${currentSlideIndex * 100}%)`,
                                                    transition: "transform 0.5s ease-in-out",
                                                }}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Image ${index + 1}`}
                                                    width={400}
                                                    height={400}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    {/* Dots for slider */}
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                                        {detailedViewProduct.images.map((_, index) => (
                                            <button
                                                key={index}
                                                className={`w-3 h-3 rounded-full ${currentSlideIndex === index
                                                    ? "bg-blue-600"
                                                    : "bg-gray-300"
                                                    }`}
                                                onClick={() => setCurrentSlideIndex(index)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Section - Product Details */}
                            <div className="w-1/2 pl-8">
                                {/* Product Name */}
                                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                    {detailedViewProduct.name}
                                </h1>
                                {/* WS Code */}
                                <p className="text-sm text-gray-500 mb-4">
                                    <strong>WS Code:</strong> {detailedViewProduct.wsCode}
                                </p>

                                {/* Pricing */}
                                <div className="flex items-baseline mb-4">
                                    <p className="text-3xl font-bold text-green-600">
                                        ${Math.ceil(0.9 * detailedViewProduct.mrp).toFixed(2)}
                                    </p>
                                    <p className="text-lg text-gray-400 line-through ml-3">
                                        ${Math.ceil(detailedViewProduct.mrp)}
                                    </p>
                                </div>

                                {/* Additional Details */}
                                <div className="text-gray-700 space-y-3 mb-6">
                                    <p>
                                        <strong>Package Size:</strong> {detailedViewProduct.packageSize}
                                    </p>
                                    <p>
                                        <strong>Tags:</strong> {detailedViewProduct.tags.join(", ")}
                                    </p>
                                </div>

                                {/* Pending Orders - Highlighted Section */}
                                <div className="bg-blue-100 border border-blue-300 p-4 rounded-lg shadow-md mb-6">
                                    <h2 className="text-xl font-bold text-blue-600 mb-2">
                                        Pending Order Quantities
                                    </h2>
                                    <p className="text-2xl font-semibold text-blue-800">
                                        {pendingOrders || 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
