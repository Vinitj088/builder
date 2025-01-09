import {ReactNode} from "react";

interface Page {
  id: string
  name: string
  path: string
  components: ComponentData[]
}

interface Template {
    components: ReactNode;
  id: string
  name: string
  pages: Page[]
}