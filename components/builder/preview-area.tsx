'use client'

import { Monitor, Smartphone, Maximize2, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function PreviewControls({
  onToggleSidebars,
  isSidebarsVisible,
}: {
  onToggleSidebars: () => void
  isSidebarsVisible: boolean
}) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')

  return (
    <div className="absolute top-4 right-4 flex items-center gap-2 bg-white rounded-lg shadow p-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setViewMode('desktop')}
        className={viewMode === 'desktop' ? 'bg-muted' : ''}
      >
        <Monitor className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setViewMode('mobile')}
        className={viewMode === 'mobile' ? 'bg-muted' : ''}
      >
        <Smartphone className="h-4 w-4" />
      </Button>
      <div className="w-px h-4 bg-border" />
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleSidebars}
      >
        {isSidebarsVisible ? (
          <Maximize2 className="h-4 w-4" />
        ) : (
          <Minimize2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}