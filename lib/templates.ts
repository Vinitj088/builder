export const templates: Record<string, Template> = {
  portfolio: {
    id: 'portfolio',
    name: 'Portfolio Template',
    pages: [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        components: [
          {
            id: 'hero-1',
            type: 'hero',
            label: 'Hero Section',
            isVisible: true,
            props: {
              title: "Hi, I'm John Doe",
              subtitle: 'Frontend Developer & Designer',
              ctaText: 'View My Work',
              alignment: 'left',
              animation: {
                type: 'fadeIn',
                duration: 1,
                delay: 0
              }
            }
          }
        ]
      },
      {
        id: 'projects',
        name: 'Projects',
        path: '/projects',
        components: [
          {
            id: 'projects-grid',
            type: 'features',
            label: 'Projects Grid',
            isVisible: true,
            props: {
              title: 'My Projects',
              features: [
                { title: 'Project 1', description: 'Description 1' },
                { title: 'Project 2', description: 'Description 2' }
              ],
              columns: 2,
              animation: {
                type: 'staggered',
                duration: 0.5,
                delay: 0.2
              }
            }
          }
        ]
      }
    ]
  }
}