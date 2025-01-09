'use client'

import { ChevronDown, ChevronRight, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {cn} from "@/lib/utils";

export function ComponentTree({
  components,
  selectedId,
  onSelect,
  onToggleVisibility
}: {
  components: ComponentData[]
  selectedId: string | null
  onSelect: (id: string) => void
  onToggleVisibility: (id: string) => void
}) {
  return (
    <div className="w-64 border-r h-full overflow-y-auto bg-muted/30">
      <div className="p-4">
        <h2 className="font-semibold mb-4">Layers</h2>
        <div className="space-y-1">
          {components.map((component) => (
            <div
              key={component.id}
              className={cn(
                "flex items-center px-2 py-1 rounded-md cursor-pointer hover:bg-muted/50",
                selectedId === component.id && "bg-muted"
              )}
              onClick={() => onSelect(component.id)}
            >
              <ChevronRight className="h-4 w-4 shrink-0 mr-1" />
              <span className="flex-1 text-sm">{component.label}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleVisibility(component.id)
                }}
              >
                {component.isVisible ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}