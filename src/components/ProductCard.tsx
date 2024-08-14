import React from 'react';
import StarRating from './StarRating'; // Import the StarRating component

interface ProductCardProps {
  title: string;
  image: string;
  price: number;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ title, image, price, description, rating }) => {
  return (
    <div className="relative max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-colors duration-300 p-[1%]">
      <img className="w-full h-48 object-cover shadow-md" src={image} alt={title} />

      {/* Shopping Cart Icon */}
      <div className="absolute top-2 right-2">
        <button className="bg-green-500 hover:bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-all duration-300 group">
          {/* Add shopping cart icon here */}
        </button>
      </div>

      <div className="px-6 py-4">
        {/* Title with ellipsis after one line */}
        <div className="font-bold text-xl mb-2 text-gray-900 dark:text-white truncate">
          {title}
        </div>

        {/* Description with ellipsis after three lines */}
        <p className="text-gray-700 dark:text-gray-300 text-base line-clamp-3">
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-blue-500 dark:bg-blue-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
          ${price.toFixed(2)}
        </span>
        <div className="flex items-center space-x-2">
          {/* Display the star rating */}
          <StarRating rating={rating.rate} />
          <span className="text-gray-700 dark:text-gray-300">({rating.count} reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
