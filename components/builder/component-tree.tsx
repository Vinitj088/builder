'use client'

import { Eye, EyeOff, ChevronRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"
import { useState } from 'react'

// Shared types - should be in a separate types.ts file
export interface ComponentData {
  id: string;
  type: ComponentType;
  isVisible: boolean;
  children?: ComponentData[];
  props: {
    text?: string;
    color?: string;
    backgroundColor?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    link?: string;
    borderRadius?: string;
    title?: string;
    description?: string;
  };
}

export type ComponentType = 'Section' | 'Heading' | 'Paragraph' | 'CTAButton' | 'FeatureCard';

interface ComponentTreeProps {
  components: ComponentData[]
  selectedId: string | null
  onSelect: (id: string) => void
  onToggleVisibility: (id: string) => void
}

export function ComponentTree({
  components,
  selectedId,
  onSelect,
  onToggleVisibility
}: ComponentTreeProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleExpand = (id: string) => {
    setExpandedSections(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const renderComponent = (component: ComponentData, depth = 0) => {
    const hasChildren = component.children && component.children.length > 0
    const isExpanded = expandedSections.includes(component.id)

    return (
      <div key={component.id} style={{ marginLeft: `${depth * 16}px` }}>
        <div
          className={cn(
            "flex items-center px-2 py-1 rounded-md cursor-pointer hover:bg-muted/50",
            selectedId === component.id && "bg-muted"
          )}
          onClick={() => onSelect(component.id)}
        >
          {hasChildren && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation()
                toggleExpand(component.id)
              }}
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          )}
          <span className="flex-1 text-sm">{component.type}</span>
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
        {hasChildren && isExpanded && (
          <div>
            {component.children!.map(child => renderComponent(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-64 border-r h-full overflow-y-auto bg-muted/30">
      <div className="p-4">
        <h2 className="font-semibold mb-4">Components</h2>
        <div className="space-y-1">
          {components.map(component => renderComponent(component))}
        </div>
      </div>
    </div>
  )
}