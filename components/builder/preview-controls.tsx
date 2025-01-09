// components/builder/preview-controls.tsx
'use client'

import { Monitor, Smartphone, Maximize2, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PreviewControls({
  onToggleSidebars,
  isSidebarsVisible,
  viewMode,
  onViewModeChange
}: {
  onToggleSidebars: () => void
  isSidebarsVisible: boolean
  viewMode: 'desktop' | 'mobile'
  onViewModeChange: (mode: 'desktop' | 'mobile') => void
}) {
  return (
    <div className="absolute top-4 right-4 flex items-center gap-2 bg-white rounded-lg shadow p-2 z-10">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onViewModeChange('desktop')}
        className={viewMode === 'desktop' ? 'bg-muted' : ''}
      >
        <Monitor className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onViewModeChange('mobile')}
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