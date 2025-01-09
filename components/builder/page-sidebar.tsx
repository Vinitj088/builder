// components/builder/page-sidebar.tsx
'use client'

import { File, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PageSidebar({
  pages,
  currentPageId,
  onPageChange
}: {
  pages: Page[]
  currentPageId: string
  onPageChange: (pageId: string) => void
}) {
  return (
    <div className="border-b p-4">
      <h2 className="font-semibold mb-2 flex items-center">
        <ChevronDown className="h-4 w-4 mr-1" />
        Pages
      </h2>
      <div className="space-y-1">
        {pages.map(page => (
          <div
            key={page.id}
            className={cn(
              "flex items-center px-2 py-1.5 text-sm rounded-md cursor-pointer hover:bg-muted/50",
              currentPageId === page.id && "bg-muted"
            )}
            onClick={() => onPageChange(page.id)}
          >
            <File className="h-4 w-4 mr-2" />
            {page.name}
          </div>
        ))}
      </div>
    </div>
  )
}
