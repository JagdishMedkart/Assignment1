"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Fuse from "fuse.js";
import { FaSearch, FaSync } from "react-icons/fa";
import { useRouter } from "next/navigation";

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
    const [categories, setCategories] = useState<Record<string, string>>({});
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    useEffect(() => {
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

    // Fetch all products and categories
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products?limit=8");
                const data = await response.json();
                setAllProducts(data.products);

                const randomSelection = getRandomProducts(data.products, 8);
                setRandomProducts(randomSelection);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories");
                const data = await response.json();

                const categoryMap: Record<string, string> = {};
                data.categories.forEach((category: { categoryId: string; name: string }) => {
                    categoryMap[category.categoryId] = category.name;
                });
                setCategories(categoryMap);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchProducts();
        fetchCategories();
    }, []);

    const getRandomProducts = (products: Product[], count: number): Product[] => {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const fuse = new Fuse(searchIndex, {
        keys: ["name", "wsCode"],
        threshold: 0.3,
    });

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            const results = fuse.search(query);
            setFilteredProducts(results.map((result) => result.item));
            setShowDropdown(true);
        } else {
            setFilteredProducts([]);
            setShowDropdown(false);
        }
    };

    const handleCategoryChange = async (categoryId: string) => {
        try {
            const response = await fetch(`/api/products/filter/${parseInt(categoryId)}`);
            const data = await response.json();
            if (data.success) {
                setFilteredProducts(data.products);
            } else {
                console.error("Failed to fetch filtered products:", data.message);
            }
        } catch (error) {
            console.error("Error fetching filtered products:", error);
        }
    };

    const handleProductClick = (product: ProductIndex) => {
        router.push(`/viewproducts/${product.wsCode}`);
    };

    const getRandomImage = (images: string[]): string => {
        if (images.length > 0) {
            const randomIndex = Math.floor(Math.random() * images.length);
            return images[randomIndex];
        }
        return "/default-image.jpg";
    };

    return (
        <div className="max-w-7xl mx-auto p-6 mb-6">
            <div className="relative mb-6 flex items-center space-x-4">
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
                <button className="text-gray-500 p-2">
                    <FaSearch size={24} />
                </button>
                <button
                    onClick={() => {
                        setSearchQuery("");
                        setFilteredProducts([]);
                        setSelectedCategory("");
                    }}
                    className="text-gray-500 p-2"
                >
                    <FaSync size={24} />
                </button>
            </div>

            {/* Product Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {(filteredProducts.length > 0 ? filteredProducts : randomProducts)
                    .filter((product) => product.deletedAt === null)
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
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                <div className="flex items-baseline">
                                    <p className="text-3xl font-bold text-green-600">${0.9 * product.mrp}</p>
                                    <p className="text-lg text-gray-400 line-through ml-2">${product.mrp}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div >
    );
};

export default ProductSearch;
