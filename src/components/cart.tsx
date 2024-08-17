import React, { useState } from 'react';
import useStore from '@/store/useStore';
import { XMarkIcon, TagIcon } from '@heroicons/react/24/outline'; // Import the TagIcon

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, addToCart } = useStore();
  const [discountCode, setDiscountCode] = useState(''); // State to manage discount code
  const [isInputActive, setIsInputActive] = useState(false); // State to manage input focus

  if (!isOpen) return null; // Don't render the cart if it's not open

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Calculate taxes
  const packagingTax = totalPrice * 0.1; // 10% of total price
  const deliveryTax = totalPrice * 0.1; // 10% of total price

  // Calculate final price
  const finalPrice = totalPrice + packagingTax + deliveryTax;

  return (
    <div className="fixed top-0 right-0 w-80 md:w-96 h-full bg-white dark:bg-gray-800 shadow-lg z-50 transition-transform transform translate-x-0">
      <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
        <XMarkIcon className="h-6 w-6 text-gray-900 dark:text-white cursor-pointer" onClick={onClose} />
      </div>
      <div className="p-4">
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
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
                
                {/* Total Price for Item */}
                <div className="mr-2 text-sm text-gray-900 dark:text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            {/* Discount Code Pills */}
            <div className="flex justify-center flex-wrap gap-2 mb-4">
              {['dscntcode1', 'dscntcode2', 'dscntcode3', 'code9', 'code8'].map((code) => (
                <button
                  key={code}
                  className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded-full text-xs uppercase"
                >
                  {code}
                </button>
              ))}
            </div>

            {/* Discount Code Input Box */}
            <div className="relative flex items-center mb-4">
              <TagIcon className="absolute left-2 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Discount code"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                onFocus={() => setIsInputActive(true)}
                onBlur={() => setIsInputActive(false)}
              />
              {(isInputActive || discountCode) && (
                <button className="absolute right-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded">
                  Apply
                </button>
              )}
            </div>

            {/* Summary Section */}
            <div className="border-t border-gray-300 dark:border-gray-700 pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-900 dark:text-white">Total Price</span>
                <span className="text-sm text-gray-900 dark:text-white">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-900 dark:text-white">Product & Packaging Tax (10%)</span>
                <span className="text-sm text-gray-900 dark:text-white">${packagingTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-900 dark:text-white">Delivery Tax (10%)</span>
                <span className="text-sm text-gray-900 dark:text-white">${deliveryTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                <span>Final Price</span>
                <span>${finalPrice.toFixed(2)}</span>
              </div>
            </div>
          </>
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
