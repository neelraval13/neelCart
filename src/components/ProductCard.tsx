import React from 'react';

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
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-colors duration-300 p-[1%]">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{title}</div>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-blue-500 dark:bg-blue-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
          ${price.toFixed(2)}
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500">★ {rating.rate}</span>
          <span className="text-gray-700 dark:text-gray-300">({rating.count} reviews)</span>
        </div>
        <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
