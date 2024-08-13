import React from 'react';
import useStore from '@/store/useStore';

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useStore();

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md py-[1%] px-[1%] transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Next.js App</h1>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>
    </header>
  );
};

export default Header;
