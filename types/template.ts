// types/template.ts
type ComponentType = 'hero' | 'features' | 'testimonials' | 'pricing' | 'cta' | 'footer'

interface ComponentData {
  id: string
  type: ComponentType
  label: string
  props: Record<string, any>
  isVisible: boolean
}

interface Page {
  id: string
  name: string
  path: string
  components: ComponentData[]
}

interface Template {
  id: string
  name: string
  pages: Page[]
}