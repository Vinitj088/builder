// app/page.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { templates } from "@/lib/templates"

export default function Home() {
  return (
    <main className="container mx-auto py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Website Builder</h1>
        <p className="text-xl text-muted-foreground">Choose a template to get started</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {Object.values(templates).map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>
                 Lots of components included
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src="/api/placeholder/800/400"
                alt={template.name}
                className="w-full h-48 object-cover rounded-md"
              />
            </CardContent>
            <CardFooter>
              <Link href={`/builder/${template.id}`} className="w-full">
                <Button className="w-full">Use Template</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
