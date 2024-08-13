'use client'

import useStore from '@/store/useStore'

export default function Home() {
  const { darkMode, toggleDarkMode } = useStore()

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to My Next.js App
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
          This is a responsive app with dark mode support.
        </p>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <p className="mt-4 text-black dark:text-white">
          Current mode: {darkMode ? 'Dark' : 'Light'}
        </p>
      </div>
    </main>
  )
}