// app/builder/[templateId]/not-found.tsx
import Link from "next/link";
import {Button} from '@/components/ui/button'
export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Template Not Found</h2>
        <p className="text-muted-foreground mb-8">The template you're looking for doesn't exist.</p>
        <Link href="/">
          <Button>Back to Templates</Button>
        </Link>
      </div>
    </div>
  )
}