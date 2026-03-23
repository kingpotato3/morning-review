'use client'

import { useState, useEffect } from 'react'

interface PageTurnProps {
  visible: boolean
  children: React.ReactNode
}

export default function PageTurn({ visible, children }: PageTurnProps) {
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setContentVisible(true), 600)
      return () => clearTimeout(timer)
    } else {
      setContentVisible(false)
    }
  }, [visible])

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 800ms ease-in-out',
          pointerEvents: contentVisible ? 'auto' : 'none',
        }}
      >
        {children}
      </div>
    </div>
  )
}
