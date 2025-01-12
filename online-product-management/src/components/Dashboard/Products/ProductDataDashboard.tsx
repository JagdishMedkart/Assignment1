"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "@/components/Layout/Spinner";
import toast from "react-hot-toast";

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
                    {product.tags.join(", ")}
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
                            className="object-cover rounded"
                          />
                        </div>
                      ))}
                    </div>
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
