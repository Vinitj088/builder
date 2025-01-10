'use client'

import * as TemplateComponents from '@/components/builder/template-components'
import { cn } from "@/lib/utils"

interface ComponentData {
  id: string;
  type: string;
  isVisible: boolean;
  props: Record<string, any>;
  children?: ComponentData[];
}

interface PreviewAreaProps {
  components: ComponentData[]
  selectedId: string | null
  onSelectComponent: (id: string) => void
  viewMode: 'desktop' | 'mobile'
}

export function PreviewArea({ components, selectedId, onSelectComponent, viewMode }: PreviewAreaProps) {
  const renderComponent = (component: ComponentData) => {
    if (!component.isVisible) return null;

    const Component = (TemplateComponents as any)[component.type];
    if (!Component) return null;

    const childComponents = component.children?.map(renderComponent);

    return (
      <div
        key={component.id}
        onClick={(e) => {
          e.stopPropagation();
          onSelectComponent(component.id);
        }}
        className={cn(
          "relative",
          selectedId === component.id && "outline outline-2 outline-blue-500"
        )}
      >
        <Component {...component.props}>
          {childComponents}
        </Component>
      </div>
    );
  };

  return (
    <div className={cn(
      "h-full overflow-y-auto bg-white",
      viewMode === 'mobile' ? 'max-w-md mx-auto' : ''
    )}>
      {components.map(renderComponent)}
    </div>
  );
}

