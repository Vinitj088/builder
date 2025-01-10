'use client'

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ColorPicker } from "@/components/ui/color-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ComponentData, ComponentType } from './ComponentTree' // Import shared types

const fontOptions = [
  "Arial", "Helvetica", "Times New Roman", "Courier", "Verdana", "Georgia",
  "Palatino", "Garamond", "Bookman", "Comic Sans MS", "Trebuchet MS",
  "Arial Black", "Impact"
]

const fontWeightOptions = [
  "100", "200", "300", "400", "500", "600", "700", "800", "900"
]

// Helper function to find a component by ID
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

interface PropertiesPanelProps {
  components: ComponentData[]
  selectedId: string | null
  onUpdateProps: (props: Record<string, any>) => void
  onToggleVisibility: (id: string) => void
}

export function PropertiesPanel({
  components,
  selectedId,
  onUpdateProps,
  onToggleVisibility
}: PropertiesPanelProps) {
  const selectedComponent = selectedId ? findComponentById(components, selectedId) : null;

  if (!selectedComponent) {
    return (
      <div className="w-80 border-l h-full p-4 bg-muted/30">
        <p className="text-sm text-muted-foreground text-center">
          Select a component to edit its properties
        </p>
      </div>
    )
  }

  const renderCommonProperties = () => (
    <>
      <div className="flex items-center justify-between">
        <Label htmlFor="visibility">Visible</Label>
        <Switch
          id="visibility"
          checked={selectedComponent.isVisible}
          onCheckedChange={() => onToggleVisibility(selectedComponent.id)}
        />
      </div>

      {selectedComponent.type !== 'Section' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="color">Text Color</Label>
            <ColorPicker
              id="color"
              color={selectedComponent.props.color || '#000000'}
              onChange={(color) => onUpdateProps({ color })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fontFamily">Font Family</Label>
            <Select
              value={selectedComponent.props.fontFamily || 'Arial'}
              onValueChange={(value) => onUpdateProps({ fontFamily: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((font) => (
                  <SelectItem key={font} value={font}>{font}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fontSize">Font Size</Label>
            <Input
              id="fontSize"
              type="text"
              value={selectedComponent.props.fontSize || ''}
              onChange={(e) => onUpdateProps({ fontSize: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fontWeight">Font Weight</Label>
            <Select
              value={selectedComponent.props.fontWeight || '400'}
              onValueChange={(value) => onUpdateProps({ fontWeight: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontWeightOptions.map((weight) => (
                  <SelectItem key={weight} value={weight}>{weight}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </>
  )

  const renderSpecificProperties = () => {
    const type = selectedComponent.type as ComponentType;

    switch (type) {
      case 'Section':
        return (
          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Background Color</Label>
            <ColorPicker
              id="backgroundColor"
              color={selectedComponent.props?.backgroundColor || '#ffffff'}
              onChange={(color) => onUpdateProps({ backgroundColor: color })}
            />
          </div>
        );
      case 'Heading':
      case 'Paragraph':
        return (
          <div className="space-y-2">
            <Label htmlFor="text">Text</Label>
            <Input
              id="text"
              value={selectedComponent.props?.text || ''}
              onChange={(e) => onUpdateProps({ text: e.target.value })}
            />
          </div>
        );
      case 'CTAButton':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="text">Button Text</Label>
              <Input
                id="text"
                value={selectedComponent.props?.text || ''}
                onChange={(e) => onUpdateProps({ text: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link">Button Link</Label>
              <Input
                id="link"
                value={selectedComponent.props?.link || ''}
                onChange={(e) => onUpdateProps({ link: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Button Color</Label>
              <ColorPicker
                id="backgroundColor"
                color={selectedComponent.props?.backgroundColor || '#000000'}
                onChange={(color) => onUpdateProps({ backgroundColor: color })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="borderRadius">Border Radius</Label>
              <Input
                id="borderRadius"
                type="text"
                value={selectedComponent.props?.borderRadius || ''}
                onChange={(e) => onUpdateProps({ borderRadius: e.target.value })}
              />
            </div>
          </>
        );
      case 'FeatureCard':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={selectedComponent.props?.title || ''}
                onChange={(e) => onUpdateProps({ title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={selectedComponent.props?.description || ''}
                onChange={(e) => onUpdateProps({ description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Background Color</Label>
              <ColorPicker
                id="backgroundColor"
                color={selectedComponent.props?.backgroundColor || '#ffffff'}
                onChange={(color) => onUpdateProps({ backgroundColor: color })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="borderRadius">Border Radius</Label>
              <Input
                id="borderRadius"
                type="text"
                value={selectedComponent.props?.borderRadius || ''}
                onChange={(e) => onUpdateProps({ borderRadius: e.target.value })}
              />
            </div>
          </>
        );
      default:
        return <p className="text-sm text-muted-foreground">No specific properties available for this component type.</p>;
    }
  };

  return (
    <div className="w-80 border-l h-full overflow-y-auto bg-muted/30">
      <div className="p-4 space-y-4">
        <h2 className="font-semibold mb-4">Properties: {selectedComponent.type}</h2>
        {renderCommonProperties()}
        {renderSpecificProperties()}
      </div>
    </div>
  )
}