'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function BuilderSidebar() {
  return (
    <div className="w-80 border-r h-full overflow-y-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Customize</h2>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Components</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="hero">Hero Section</Label>
              <Switch id="hero" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="features">Features</Label>
              <Switch id="features" defaultChecked />
            </div>
            {/* Add more component toggles */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}