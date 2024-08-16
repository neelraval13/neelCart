'use client'

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // Import the magnifying glass icon
import StarRating from '@/components/StarRating'; // Reuse StarRating component

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: Rating;
}

export default function ViewAllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number>(0); // Rating filter state
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAlpha, setSortAlpha] = useState(false); // State for sorting alphabetically
  const [sortPrice, setSortPrice] = useState(false); // State for sorting by price
  const productsPerPage = 6;

  useEffect(() => {
    // Fetch products
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));

    // Fetch categories
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setSelectedCategories(data); // By default, all categories are selected
      });
  }, []);

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    setCurrentPage(1); // Reset to the first page when filters change
  };

  // Handle rating selection
  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  // Handle sorting logic
  const handleSortAlpha = () => {
    setSortAlpha(true);
    setSortPrice(false);
  };

  const handleSortPrice = () => {
    setSortPrice(true);
    setSortAlpha(false);
  };

  // Apply sorting based on user selection
  const sortedProducts = [...products].sort((a, b) => {
    if (sortAlpha && sortPrice) {
      // Sort alphabetically first, then by price
      return a.title.localeCompare(b.title) || a.price - b.price;
    } else if (sortAlpha) {
      return a.title.localeCompare(b.title);
    } else if (sortPrice) {
      return a.price - b.price;
    } else {
      return a.id - b.id; // Default sorting by ID
    }
  });

  // Filter products based on selected categories and rating
  const filteredProducts = sortedProducts.filter(
    (product) =>
      selectedCategories.includes(product.category) &&
      product.rating.rate >= selectedRating
  );

  // Calculate the products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">All Products</h2>
          <div className="relative flex items-center justify-between w-full max-w-lg">
            <div className="relative flex-grow">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search products..."
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <div className="flex space-x-4 ml-4 whitespace-nowrap">
              <button
                onClick={handleSortAlpha}
                className={`text-gray-500 ${sortAlpha ? 'text-blue-500 underline' : ''}`}
              >
                A - Z
              </button>
              <button
                onClick={handleSortPrice}
                className={`text-gray-500 ${sortPrice ? 'text-blue-500 underline' : ''}`}
              >
                Price: low to high
              </button>
            </div>
          </div>
        </div>
        
        {/* Grid layout for filters and products */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Filters Section - 3 Columns */}
          <aside className="col-span-12 md:col-span-3">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Filters</h3>

              {/* Categories Filter */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Categories</h4>
                {categories.map((category) => (
                  <div key={category} className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">{category}</span>
                    </label>
                  </div>
                ))}
              </div>

              {/* Rating Filter */}
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Rating</h4>
                {[1, 2, 3, 4].map((rating) => (
                  <div key={rating} className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={selectedRating === rating}
                        onChange={() => handleRatingChange(rating)}
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                      <div className="flex items-center ml-2">
                        <StarRating rating={rating} /> {/* Reuse the StarRating component */}
                        <span className="ml-2 text-gray-700 dark:text-gray-300"> & up</span> {/* Add "& up" text */}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Section - 9 Columns */}
          <section className="col-span-12 md:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id} // Unique key for each product
                  id={product.id}  // Pass the id prop to ProductCard
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  description={product.description}
                  rating={product.rating}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-gray-900 dark:text-white">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
