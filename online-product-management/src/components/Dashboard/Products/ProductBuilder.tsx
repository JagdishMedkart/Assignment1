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
    if (!name  || !mrp || !packageSize || !categoryId) {
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
      if (error instanceof Error){
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
          <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-md relative text-black">
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
              onClick={() => setIsModalOpen(false)}
            >
              <IoCloseSharp size={24} />
            </button>
            <h2 className="text-2xl font-bold text-center mb-6">Add New Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddProduct();
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Product Name</label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full text-black"
                />
              </div>
              {/* <div className="space-y-2">
                <label className="block text-sm font-medium text-black">WS Code</label>
                <input
                  type="number"
                  placeholder="Enter unique WS code"
                  value={wsCode}
                  onChange={(e) => setWsCode(e.target.value)}
                  className="input input-bordered w-full text-black"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Sales Price</label>
                <input
                  type="number"
                  placeholder="Enter sales price"
                  value={salesPrice}
                  onChange={(e) => setSalesPrice(e.target.value)}
                  className="input input-bordered w-full text-black"
                />
              </div> */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">MRP</label>
                <input
                  type="number"
                  placeholder="Enter MRP"
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  className="input input-bordered w-full text-black"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Package Size</label>
                <input
                  type="number"
                  placeholder="Enter package size"
                  value={packageSize}
                  onChange={(e) => setPackageSize(e.target.value)}
                  className="input input-bordered w-full text-black"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Category</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="select select-bordered w-full text-black"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.categoryId} value={category.categoryId}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Tags</label>
                <textarea
                  placeholder="Enter tags (comma-separated)"
                  value={tags.join(", ")}
                  onChange={(e) =>
                    setTags(e.target.value.split(",").map((tag) => tag.trim()))
                  }
                  className="textarea textarea-bordered w-full text-black"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Upload Images</label>
                <input
                  type="file"
                  multiple
                  accept=".png, .jpeg, .webp"
                  onChange={(e) =>
                    setImages(e.target.files ? Array.from(e.target.files) : [])
                  }
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="btn btn-error w-1/2 mr-2"
                  onClick={() => {
                    resetForm();
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary w-1/2 ml-2"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductBuilder;
