import React from 'react';
import useStore from '@/store/useStore';
import { XMarkIcon } from '@heroicons/react/24/outline'; // Close icon

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, addToCart } = useStore();

  if (!isOpen) return null; // Don't render the cart if it's not open

  return (
    <div className="fixed top-0 right-0 w-80 md:w-96 h-full bg-white dark:bg-gray-800 shadow-lg z-50 transition-transform transform translate-x-0">
      <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
        <XMarkIcon className="h-6 w-6 text-gray-900 dark:text-white cursor-pointer" onClick={onClose} />
      </div>
      <div className="p-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4">
              {/* Image */}
              <div className="flex-shrink-0 w-20 h-20">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded" />
              </div>
              
              {/* Title and Quantity */}
              <div className="flex flex-col flex-grow ml-4">
                {/* Title */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-900 dark:text-white flex-1">
                    {item.title}
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    onClick={() => removeFromCart(item.id)}
                  >
                    -
                  </button>
                  <span className="text-lg text-gray-900 dark:text-white">{item.quantity}</span>
                  <button
                    className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Total Price */}
              <div className="mr-2 text-sm text-gray-900 dark:text-white">
                ${item.price * item.quantity}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-300 mt-16">Your cart is empty</div>
        )}
      </div>

      {/* Checkout Button */}
      <div className="p-4 border-t border-gray-300 dark:border-gray-700">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-lg font-semibold">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
