'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  id?: string
}

export function ColorPicker({ color, onChange, id }: ColorPickerProps) {
  const [currentColor, setCurrentColor] = useState(color)
  const [isOpen, setIsOpen] = useState(false)
  const colorInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setCurrentColor(color)
  }, [color])

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setCurrentColor(newColor)
    onChange(newColor)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newColor = e.target.value
    if (newColor.startsWith('#') && newColor.length <= 7) {
      setCurrentColor(newColor)
      if (newColor.length === 7) {
        onChange(newColor)
      }
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !currentColor && "text-muted-foreground"
          )}
        >
          <div className="w-4 h-4 rounded-sm mr-2 shadow-sm" style={{ backgroundColor: currentColor }} />
          {currentColor}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex flex-col space-y-2">
          <Label htmlFor={id}>Select Color</Label>
          <div className="flex space-x-2">
            <div
              className="w-8 h-8 rounded-md shadow-sm cursor-pointer"
              style={{ backgroundColor: currentColor }}
              onClick={() => colorInputRef.current?.click()}
            />
            <Input
              ref={colorInputRef}
              id={id}
              type="color"
              value={currentColor}
              onChange={handleColorChange}
              className="w-0 h-0 opacity-0 absolute"
            />
            <Input
              type="text"
              value={currentColor}
              onChange={handleInputChange}
              className="flex-grow"
              placeholder="#000000"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
