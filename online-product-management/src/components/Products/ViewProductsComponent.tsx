"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Fuse from "fuse.js";
import { FaSearch, FaSync } from "react-icons/fa";
import { useRouter, useSearchParams  } from 'next/navigation'

// Define types for product and API response
interface Product {
  deletedAt: null;
  wsCode: string;
  name: string;
  mrp: number;
  packageSize: number;
  categoryId: string;
  images: string[];
  tags: string[];
}

interface ApiResponse {
  products: Product[];
}

interface ProductIndex {
  wsCode: string;
  name: string;
}

const ProductSearch: React.FC = () => {
  const router = useRouter();
  const [searchIndex, setSearchIndex] = useState<ProductIndex[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Record<string, string>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    // Fetch the lightweight search index
    const fetchSearchIndex = async () => {
      try {
        const response = await fetch("/api/products/search");
        const data = await response.json();
        setSearchIndex(data.products);
      } catch (error) {
        console.error("Error fetching search index:", error);
      }
    };
    fetchSearchIndex();
  }, []);

  // Fetch all products from the database (for search)
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products?limit=8");
      const data = await response.json();
      setAllProducts(data.products);

      // Show 5 random products initially
      const randomSelection = getRandomProducts(data.products, 8);
      setRandomProducts(randomSelection);
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

    fetchProducts();
    fetchCategories();
  }, []);

  // Function to select random products from all products
  const getRandomProducts = (products: Product[], count: number): Product[] => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Initialize fuse.js for fuzzy searching
  const fuse = new Fuse(searchIndex, // Only use active products
    {
      keys: ["name", "wsCode"], // Search by product name and wsCode
      threshold: 0.3, // Fuzzy matching threshold
    });

  // Perform search and filter products based on query
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      setSelectedCategory(""); // Clear category filter when search is active
      const results = fuse.search(query);
      setFilteredProducts(results.map((result) => result.item));
      setShowDropdown(true);
    } else {
      setFilteredProducts([]);
      setShowDropdown(false);
    }
  };


  // Highlight matching parts in the product name
  const highlightText = (text: string, query: string): JSX.Element[] => {
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-300">{part}</span>
      ) : (
        part
      )
    );
  };

  const handleSearchClick = () => {
    // Perform search and show cards on clicking search button
    if (searchQuery.length > 0) {
      const results = fuse.search(searchQuery);
      setFilteredProducts(results.map((result) => result.item));
    }
    setShowDropdown(false);
  };

  const handleRefreshClick = () => {
    // Reset search and show random products
    router.push(`/viewproducts`);
    setSearchQuery("");
    setFilteredProducts([]);
    setShowDropdown(false);
    setSelectedProduct(null);
    setSelectedCategory("");
  };

  const handleCategoryChange = async (categoryId: string) => {
    try {
      router.push(`/viewproducts?search=${searchQuery}&category=${categoryId}`);
      setSelectedCategory(categoryId); // Update selectedCategory state
      if (!categoryId) {
        setFilteredProducts([]); // Reset to default if no category selected
        return;
      }
      const response = await fetch(`/api/products/filter/${parseInt(categoryId)}`);
      const data = await response.json();
      if (data.success) {
        setFilteredProducts(data.products); // Update filtered products
      } else {
        console.error("Failed to fetch filtered products:", data.message);
      }
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };


  const handleProductClick = (product: ProductIndex) => {
    // console.log(`${product} is clicked`)
    router.push(`/viewproducts/${product.wsCode}`);
  };

  const getRandomImage = (images: string[]): string => {
    if (images.length > 0) {
      const randomIndex = Math.floor(Math.random() * Math.min(5, images.length));
      return images[randomIndex];
    }
    return "/default-image.jpg"; // fallback image if no images are available
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mb-6">
      {/* Search Bar */}
      <div className="relative mb-6 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search for products by name or WS code..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => {
            const categoryId = e.target.value; // Get the selected category ID
            setSelectedCategory(categoryId); // Update the state
            if (categoryId) {
              handleCategoryChange(categoryId); // Fetch products for the selected category
            } else {
              // If "All Categories" is selected, reset to default products
              setFilteredProducts([]);
            }
          }}
          className="py-3 px-4 border border-gray-300 rounded-lg shadow-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {Object.entries(categories).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearchClick}
          className="text-gray-500 p-2"
        >
          <FaSearch size={24} />
        </button>
        <button
          onClick={handleRefreshClick}
          className="text-gray-500 p-2"
        >
          <FaSync size={24} />
        </button>
      </div>

      {/* Dropdown for dynamic search results */}
      {
        showDropdown && filteredProducts.length > 0 && (
          <div className="absolute z-10 bg-white w-full border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1">
            {filteredProducts.map((product) => (
              <div
                key={product.wsCode}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <p className="text-sm">
                  {highlightText(product.name, searchQuery)} - {product.wsCode}
                </p>
              </div>
            ))}
          </div>
        )
      }

      {/* Display Random Products or Search Results as Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {(
          searchQuery.length > 0 // If there's a search query, prioritize search results
            ? filteredProducts
            : selectedCategory // Otherwise, use category filter if selected
              ? filteredProducts
              : randomProducts // Fallback to random products
        )
          .filter((product) => product.deletedAt === null) // Exclude deleted products
          .map((product) => (
            <div
              key={product.wsCode}
              className="border rounded-lg overflow-hidden shadow-lg bg-white transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <div className="w-full h-64 relative">
                <Image
                  src={getRandomImage(product.images)}
                  alt={product.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-t-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onClick={() => handleProductClick(product)}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {highlightText(product.name, searchQuery)}
                </h3>
                <div className="flex items-baseline mb-2">
                  <p className="text-3xl font-bold text-green-600">
                    ${Math.ceil(0.9 * product.mrp)}
                  </p>
                  <p className="text-lg text-gray-400 line-through ml-3">
                    ${Math.ceil(product.mrp)}
                  </p>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.tags &&
                    product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs text-white bg-blue-500 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div >
  );
};

export default ProductSearch;
