import React, { useState } from 'react';
import useStore from '@/store/useStore';
import { MoonIcon, SunIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import Cart from '@/components/cart';

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode, cartCount } = useStore();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md py-[1%] px-[1%] transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Next.js App</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            {darkMode ? (
              <>
                <SunIcon className="h-5 w-5" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <MoonIcon className="h-5 w-5" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
          <div className="relative">
            <ShoppingBagIcon
              className="h-6 w-6 text-gray-900 dark:text-white cursor-pointer"
              onClick={toggleCart}
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2 py-1">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
      <Cart isOpen={isCartOpen} onClose={toggleCart} />
    </header>
  );
};

export default Header;
