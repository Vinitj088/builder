// components/check-screen-size.tsx
'use client'

import { useEffect, useState } from 'react'

export function CheckScreenSize() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Please use a desktop browser</h2>
          <p>For the best website building experience, please use a device with a larger screen (minimum width: 768px)</p>
        </div>
      </div>
    )
  }

  return null
}