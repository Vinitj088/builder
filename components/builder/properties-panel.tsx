'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function PropertiesPanel({
  selectedComponent,
  onUpdateProps
}: {
  selectedComponent: ComponentData | null
  onUpdateProps: (props: Record<string, any>) => void
}) {
  if (!selectedComponent) {
    return (
      <div className="w-80 border-l h-full p-4 bg-muted/30">
        <p className="text-sm text-muted-foreground text-center">
          Select a component to edit its properties
        </p>
      </div>
    )
  }

  return (
    <div className="w-80 border-l h-full overflow-y-auto bg-muted/30">
      <div className="p-4">
        <h2 className="font-semibold mb-4">Properties</h2>
        <Tabs defaultValue="style">
          <TabsList className="mb-4">
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="style">
            {selectedComponent.type === 'hero' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Alignment</Label>
                  <RadioGroup
                    value={selectedComponent.props.alignment}
                    onValueChange={(value) =>
                      onUpdateProps({ ...selectedComponent.props, alignment: value })
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="left" id="left" />
                      <Label htmlFor="left">Left</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="center" id="center" />
                      <Label htmlFor="center">Center</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="right" id="right" />
                      <Label htmlFor="right">Right</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {selectedComponent.type === 'features' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Columns</Label>
                  <RadioGroup
                    value={selectedComponent.props.columns.toString()}
                    onValueChange={(value) =>
                      onUpdateProps({ ...selectedComponent.props, columns: parseInt(value) })
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="2-cols" />
                      <Label htmlFor="2-cols">2 Columns</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="3-cols" />
                      <Label htmlFor="3-cols">3 Columns</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id="4-cols" />
                      <Label htmlFor="4-cols">4 Columns</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="content">
            <div className="space-y-4">
              {Object.entries(selectedComponent.props)
                .filter(([key]) => typeof selectedComponent.props[key] === 'string')
                .map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Label>
                    <Input
                      id={key}
                      value={value as string}
                      onChange={(e) =>
                        onUpdateProps({
                          ...selectedComponent.props,
                          [key]: e.target.value,
                        })
                      }
                    />
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
