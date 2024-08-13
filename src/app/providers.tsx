'use client'

import { useEffect } from 'react'
import useStore from '@/store/useStore'

export function Providers({ children }: { children: React.ReactNode }) {
  const { darkMode } = useStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  return <>{children}</>
}