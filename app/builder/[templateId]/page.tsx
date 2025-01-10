'use client'

import React, { useState, useEffect } from 'react'
import { templates } from '@/lib/templates'
import { ComponentTree } from '@/components/builder/component-tree'
import { PropertiesPanel } from '@/components/builder/properties-panel'
import { PreviewControls } from '@/components/builder/preview-controls'
import { PreviewArea } from '@/components/builder/preview-area'
import { PageSidebar } from '@/components/builder/page-sidebar'
import { notFound } from 'next/navigation'

type ComponentData = {
  id: string;
  type: string;
  isVisible: boolean;
  children?: ComponentData[];
  props: Record<string, any>;
}

// Helper function to find a component by ID in the nested structure
const findComponentById = (components: ComponentData[], id: string): ComponentData | null => {
  for (const component of components) {
    if (component.id === id) {
      return component;
    }
    if (component.children) {
      const found = findComponentById(component.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

export default function BuilderPage({
  params
}: {
  params: Promise<{ templateId: string }>
}) {
  const resolvedParams = React.use(params)
  const template = templates[resolvedParams.templateId]

  if (!template) {
    notFound()
  }

  const [currentPageId, setCurrentPageId] = useState(template.pages[0].id)
  const [isSidebarsVisible, setIsSidebarsVisible] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [components, setComponents] = useState(template.pages[0].components)

  useEffect(() => {
    const currentPage = template.pages.find(page => page.id === currentPageId)
    if (currentPage) {
      setComponents(currentPage.components)
      setSelectedId(null)
    }
  }, [currentPageId, template.pages])

  const handlePageChange = (newPageId: string) => {
    setCurrentPageId(newPageId)
  }

  const handleToggleVisibility = (id: string) => {
    setComponents(prevComponents => toggleComponentVisibility(prevComponents, id))
  }

  const toggleComponentVisibility = (components: ComponentData[], id: string): ComponentData[] => {
    return components.map(component => {
      if (component.id === id) {
        return { ...component, isVisible: !component.isVisible }
      }
      if (component.children) {
        return { ...component, children: toggleComponentVisibility(component.children, id) }
      }
      return component
    })
  }

  const handleUpdateProps = (newProps: Record<string, any>) => {
    if (!selectedId) return;

    setComponents(prevComponents => {
      const updateProps = (components: ComponentData[]): ComponentData[] => {
        return components.map(component => {
          if (component.id === selectedId) {
            return {
              ...component,
              props: { ...component.props, ...newProps }
            };
          }
          if (component.children) {
            return {
              ...component,
              children: updateProps(component.children)
            };
          }
          return component;
        });
      };

      return updateProps(prevComponents);
    });
  }

  const handleSelectComponent = (id: string) => {
    setSelectedId(id);
  }

  return (
    <div className="flex h-screen">
      {isSidebarsVisible && (
        <div className="w-64 border-r flex flex-col">
          <PageSidebar
            pages={template.pages}
            currentPageId={currentPageId}
            onPageChange={handlePageChange}
          />
          <div className="flex-1 overflow-y-auto">
            <ComponentTree
              components={components}
              selectedId={selectedId}
              onSelect={handleSelectComponent}
              onToggleVisibility={handleToggleVisibility}
            />
          </div>
        </div>
      )}

      <div className="flex-1 h-full relative">
        <PreviewControls
          onToggleSidebars={() => setIsSidebarsVisible(!isSidebarsVisible)}
          isSidebarsVisible={isSidebarsVisible}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <PreviewArea
          components={components}
          selectedId={selectedId}
          onSelectComponent={handleSelectComponent}
          viewMode={viewMode}
        />
      </div>

      {isSidebarsVisible && selectedId && (
        <PropertiesPanel
          components={components}
          selectedId={selectedId}
          onUpdateProps={handleUpdateProps}
          onToggleVisibility={handleToggleVisibility}
        />
      )}
    </div>
  )
}