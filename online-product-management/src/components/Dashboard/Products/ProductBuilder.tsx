"use client";

import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

const ProductBuilder: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  // const [wsCode, setWsCode] = useState("");
  // const [salesPrice, setSalesPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [packageSize, setPackageSize] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<{ categoryId: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
    // setWsCode("");
    // setSalesPrice("");
    setMrp("");
    setPackageSize("");
    setCategoryId("");
    setTags([]);
    setImages([]);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      // console.log(data);
      if (data.success) setCategories(data.categories);
      else toast.error("Failed to load categories.");
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories.");
    }
  };

  const handleAddProduct = async () => {
    if (!name || !mrp || !packageSize || !categoryId) {
      toast.error("Please fill all required fields!");
      return;
    }

    if (images.length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }

    const base64Images = await Promise.all(
      images.map(
        (image) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(image);
          })
      )
    );

    setLoading(true);

    try {
      // console.log(categories);
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          // wsCode: parseInt(wsCode),
          // salesPrice: parseFloat(salesPrice),
          mrp: parseFloat(mrp),
          packageSize: parseFloat(packageSize),
          categoryId: parseInt(categoryId),
          tags,
          images: base64Images, // Send the Base64 strings
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unknown error occurred");
      }

      const data = await response.json();
      toast.success(data.message || "Product added successfully!");
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error: ", error.stack)
      }
      console.error("Error adding product:", error);
      toast.error(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <button
        className="flex items-center justify-center w-full p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition duration-300"
        onClick={() => {
          setIsModalOpen(true);
          fetchCategories();
        }}
      >
        <AiOutlinePlusCircle size={30} className="mr-3" />
        Add New Product
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 sm:mx-0 relative overflow-hidden">
            {/* Close Button */}
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition-transform transform hover:scale-110"
              onClick={() => setIsModalOpen(false)}
            >
              <IoCloseSharp size={24} />
            </button>

            {/* Modal Content */}
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Product</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddProduct();
                }}
                className="space-y-6"
              >
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* MRP */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">MRP</label>
                  <input
                    type="number"
                    placeholder="Enter MRP"
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Package Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Package Size</label>
                  <input
                    type="number"
                    placeholder="Enter package size"
                    value={packageSize}
                    onChange={(e) => setPackageSize(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.categoryId} value={category.categoryId}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tags</label>
                  <textarea
                    placeholder="Enter tags (comma-separated)"
                    value={tags.join(", ")}
                    onChange={(e) =>
                      setTags(e.target.value.split(",").map((tag) => tag.trim()))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Upload Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/png, image/jpeg, image/webp"
                    onChange={(e) =>
                      setImages(e.target.files ? Array.from(e.target.files) : [])
                    }
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:bg-gray-100 file:text-gray-600 hover:file:bg-gray-200"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center gap-4">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Submit"}
                  </button>
                  <button
                    type="button"
                    className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                    onClick={() => {
                      resetForm();
                      setIsModalOpen(false);
                    }}
                  >
                    Cancel
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductBuilder;
