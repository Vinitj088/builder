'use client'

import { useState, useEffect } from 'react'
import { templates } from '@/lib/templates'
import { ComponentTree } from '@/components/builder/component-tree'
import { PropertiesPanel } from '@/components/builder/properties-panel'
import { PreviewControls } from '@/components/builder/preview-controls'
import { PageSidebar } from '@/components/builder/page-sidebar'
import * as TemplateComponents from '@/components/builder/template-components'
import { notFound } from 'next/navigation'
import { cn } from '@/lib/utils'
import React from 'react'

export default function BuilderPage({
  params: paramsPromise
}: {
  params: Promise<{ templateId: string }>
}) {
  const params = React.use(paramsPromise)
  const template = templates[params.templateId]

  if (!template) {
    notFound()
  }

  const [currentPageId, setCurrentPageId] = useState(template.pages[0].id)
  const [isSidebarsVisible, setIsSidebarsVisible] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')

  // Keep track of components for each page
  const [pagesComponents, setPagesComponents] = useState(() => {
    return template.pages.reduce((acc, page) => ({
      ...acc,
      [page.id]: page.components
    }), {})
  })

  // Get current page's components
  const components = pagesComponents[currentPageId] || []
  const selectedComponent = components.find(c => c.id === selectedId) || null

  // Update components when page changes
  useEffect(() => {
    setSelectedId(null)
  }, [currentPageId])

  const handleToggleVisibility = (id: string) => {
    setPagesComponents(prev => ({
      ...prev,
      [currentPageId]: prev[currentPageId].map(component =>
        component.id === id
          ? { ...component, isVisible: !component.isVisible }
          : component
      )
    }))
  }

  const handleUpdateProps = (newProps: Record<string, any>) => {
    setPagesComponents(prev => ({
      ...prev,
      [currentPageId]: prev[currentPageId].map(component =>
        component.id === selectedId
          ? { ...component, props: newProps }
          : component
      )
    }))
  }

  return (
    <div className="flex h-screen">
      {isSidebarsVisible && (
        <div className="w-64 border-r flex flex-col">
          <PageSidebar
            pages={template.pages}
            currentPageId={currentPageId}
            onPageChange={setCurrentPageId}
          />
          <div className="flex-1 overflow-y-auto">
            <ComponentTree
              components={components}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onToggleVisibility={handleToggleVisibility}
            />
          </div>
        </div>
      )}

      <div className="flex-1 h-full overflow-y-auto bg-gray-50 relative">
        <PreviewControls
          onToggleSidebars={() => setIsSidebarsVisible(!isSidebarsVisible)}
          isSidebarsVisible={isSidebarsVisible}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <div
          className={cn(
            "mx-auto bg-white min-h-full transition-all duration-300",
            viewMode === 'mobile' ? 'max-w-md' : 'max-w-6xl'
          )}
        >
          {components
            .filter(component => component.isVisible)
            .map(component => {
              const Component = (TemplateComponents as any)[
                component.type.charAt(0).toUpperCase() + component.type.slice(1)
              ]
              return Component ? (
                <div
                  key={component.id}
                  className={cn(
                    "relative",
                    selectedId === component.id && "ring-2 ring-primary ring-offset-2"
                  )}
                  onClick={() => setSelectedId(component.id)}
                >
                  <Component {...component.props} />
                </div>
              ) : null
            })}
        </div>
      </div>

      {isSidebarsVisible && (
        <PropertiesPanel
          selectedComponent={selectedComponent}
          onUpdateProps={handleUpdateProps}
        />
      )}
    </div>
  )
}
