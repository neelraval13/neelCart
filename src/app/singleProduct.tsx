'use client'

import React from 'react';

export default function SingleProduct() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Single Product</h2>
        {/* Placeholder for single product details */}
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Detailed view of a single product will be displayed here.
        </p>
      </div>
    </main>
  );
}
