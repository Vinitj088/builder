import { v4 as uuidv4 } from 'uuid'

export const templates = {
  landing: {
    id: 'landing',
    name: 'Landing Page',
    pages: [
      {
        id: 'home',
        name: 'Home',
        components: [
          {
            id: uuidv4(),
            type: 'Section',
            isVisible: true,
            props: {
              backgroundColor: '#f0f0f0',
            },
            children: [
              {
                id: uuidv4(),
                type: 'Heading',
                isVisible: true,
                props: {
                  text: 'Welcome to Our Platform',
                  color: '#333333',
                  fontSize: '48px',
                  fontWeight: '700',
                }
              },
              {
                id: uuidv4(),
                type: 'Paragraph',
                isVisible: true,
                props: {
                  text: 'The best solution for your needs',
                  color: '#666666',
                  fontSize: '18px',
                  fontWeight: '400',
                }
              },
              {
                id: uuidv4(),
                type: 'CTAButton',
                isVisible: true,
                props: {
                  text: 'Get Started',
                  link: '#',
                  backgroundColor: '#4a90e2',
                  color: '#ffffff',
                  borderRadius: '4px',
                }
              }
            ]
          },
          {
            id: uuidv4(),
            type: 'Section',
            isVisible: true,
            props: {
              backgroundColor: '#ffffff',
            },
            children: [
              {
                id: uuidv4(),
                type: 'FeatureCard',
                isVisible: true,
                props: {
                  title: 'Amazing Feature',
                  description: 'This feature will revolutionize your workflow',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  borderRadius: '8px',
                }
              },
              {
                id: uuidv4(),
                type: 'FeatureCard',
                isVisible: true,
                props: {
                  title: 'Another Great Feature',
                  description: 'Boost your productivity with this feature',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  borderRadius: '8px',
                }
              }
            ]
          }
        ]
      },
      {
        id: 'project',
        name: 'P',
        components: [
          {
            id: uuidv4(),
            type: 'Section',
            isVisible: true,
            props: {
              backgroundColor: '#f0f0f0',
            },
            children: [
              {
                id: uuidv4(),
                type: 'Heading',
                isVisible: true,
                props: {
                  text: 'Welcome to Our Platform',
                  color: '#333333',
                  fontSize: '48px',
                  fontWeight: '700',
                }
              },
              {
                id: uuidv4(),
                type: 'Paragraph',
                isVisible: true,
                props: {
                  text: 'The best solution for your needs',
                  color: '#666666',
                  fontSize: '18px',
                  fontWeight: '400',
                }
              },
              {
                id: uuidv4(),
                type: 'CTAButton',
                isVisible: true,
                props: {
                  text: 'Get Started',
                  link: '#',
                  backgroundColor: '#4a90e2',
                  color: '#ffffff',
                  borderRadius: '4px',
                }
              }
            ]
          },
          {
            id: uuidv4(),
            type: 'Section',
            isVisible: true,
            props: {
              backgroundColor: '#ffffff',
            },
            children: [
              {
                id: uuidv4(),
                type: 'FeatureCard',
                isVisible: true,
                props: {
                  title: 'Amazing Feature',
                  description: 'This feature will revolutionize your workflow',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  borderRadius: '8px',
                }
              
              }
            ]
          }
        ]
      }
    ]
  }
  // Add more templates here
}

