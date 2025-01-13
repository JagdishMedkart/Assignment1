"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "@/components/Layout/Spinner";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

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
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<number>(-1);

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
              className="btn btn-sm bg-red-600 text-white hover:text-black"
            >
              Yes
            </button>
            <button
              onClick={onCancel}
              className="btn btn-sm bg-gray-500 text-white hover:text-black"
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
      salesPrice: product?.salesPrice || "",
      mrp: product?.mrp || "",
      packageSize: product?.packageSize || "",
      categoryId: product?.categoryId || "",
      tags: product?.tags.join(", ") || "",
      images: [],
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, images: files }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      console.log(formData);

      const { name, salesPrice, mrp, packageSize, categoryId, tags, images } = formData;

      if (!name || !salesPrice || !mrp || !packageSize || !categoryId) {
        toast.error("Please fill all required fields!");
        return;
      }

      if (images.length > 5) {
        toast.error("You can upload a maximum of 5 images.");
        return;
      }

      try {
        setLoading(true);

        // Convert images to Base64
        const base64Images = await Promise.all(
          images.map(
            (image: Blob) =>
              new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(image);
              })
          )
        );

        const response = await fetch(`/api/products/${product.wsCode}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            salesPrice: parseFloat(salesPrice),
            mrp: parseFloat(mrp),
            packageSize: parseFloat(packageSize),
            categoryId: parseInt(categoryId),
            tags: tags.split(",").map((tag) => tag.trim()),
            images: base64Images,
          }),
        });

        const result = await response.json();

        if (result.success) {
          toast.success(result.message || "Product updated successfully!");
          setProducts((prev) =>
            prev.map((p) =>
              p.wsCode === product.wsCode ? { ...p, ...formData } : p
            )
          );
          setIsEditModalOpen(false);
        } else {
          toast.error(result.message || "Failed to update product.");
        }
      } catch (error) {
        console.error("Error updating product:", error);
        toast.error("An error occurred while updating the product.");
      } finally {
        setLoading(false);
      }
    };

    return isOpen ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-1/3">
          <h2 className="text-xl mb-4">Edit Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Sales Price</label>
              <input
                type="number"
                name="salesPrice"
                value={formData.salesPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">MRP</label>
              <input
                type="number"
                name="mrp"
                value={formData.mrp}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Package Size</label>
              <input
                type="number"
                name="packageSize"
                value={formData.packageSize}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Images</label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    ) : null;
  };

  const handleEditClick = (product: Product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setProductToEdit(null);
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

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
      const response = await fetch(`/api/products?page=${page}&limit=5`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
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

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    fetchProducts(page);
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
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">WS Code</th>
              <th className="border border-gray-300 px-4 py-2">Sales Price</th>
              <th className="border border-gray-300 px-4 py-2">MRP</th>
              <th className="border border-gray-300 px-4 py-2">Package Size</th>
              <th className="border border-gray-300 px-4 py-2">Tags</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Images</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.wsCode} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.wsCode}</td>
                  <td className="border border-gray-300 px-4 py-2">${product.salesPrice}</td>
                  <td className="border border-gray-300 px-4 py-2">${product.mrp}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.packageSize}</td>
                  <td className="border border-gray-300 px-4 py-2">
                  {(Array.isArray(product.tags) ? product.tags : [product.tags]).join(", ")}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{product.categoryId}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex justify-center items-center gap-2">
                      {product.images.map((image, index) => (
                        <div key={index} className="relative w-16 h-16">
                          <Image
                            src={image}
                            alt={`Product ${index + 1}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm bg-red-500 text-white hover:text-black mr-2"
                      onClick={() => handleDeleteClick(product.wsCode)}
                    >
                      <FaTrash size={25} style={{fill: "black", background: "white"}}/>
                    </button>
                    <button
                      className="btn btn-sm bg-blue-500 text-white hover:text-black"
                      onClick={() => handleEditClick(product)}
                    >
                      <MdEdit size={25}  style={{fill: "black", background: "white"}}/>
                    </button>
                  </td>
                </tr>
              ))
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
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
