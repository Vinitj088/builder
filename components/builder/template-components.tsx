import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Section({ children, backgroundColor }: {
  children: React.ReactNode
  backgroundColor?: string
}) {
  return (
    <section className="py-16" style={{ backgroundColor }}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  )
}

export function Heading({ text, color, fontSize, fontWeight }: {
  text: string
  color?: string
  fontSize?: string
  fontWeight?: string
}) {
  return (
    <h2 style={{ color, fontSize, fontWeight }} className="mb-4">{text}</h2>
  )
}

export function Paragraph({ text, color, fontSize, fontWeight }: {
  text: string
  color?: string
  fontSize?: string
  fontWeight?: string
}) {
  return (
    <p style={{ color, fontSize, fontWeight }} className="mb-4">{text}</p>
  )
}

export function CTAButton({ text, link, backgroundColor, color, borderRadius }: {
  text: string
  link: string
  backgroundColor?: string
  color?: string
  borderRadius?: string
}) {
  return (
    <Button asChild style={{ backgroundColor, color, borderRadius }}>
      <a href={link}>{text}</a>
    </Button>
  )
}

export function Hero({ title, subtitle, backgroundColor, color }: {
  title: string
  subtitle: string
  backgroundColor?: string
  color?: string
}) {
  return (
    <section className="py-24" style={{ backgroundColor, color }}>
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl">{subtitle}</p>
      </div>
    </section>
  )
}

export function FeatureCard({ title, description, backgroundColor, color, borderRadius }: {
  title: string
  description: string
  backgroundColor?: string
  color?: string
  borderRadius?: string
}) {
  return (
    <Card style={{ backgroundColor, color, borderRadius }} className="mt-3.5 mb-3.5">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export function CTASection({ title, buttonText, buttonLink, backgroundColor, color }: {
  title: string
  buttonText: string
  buttonLink: string
  backgroundColor?: string
  color?: string
}) {
  return (
    <section className="py-16" style={{ backgroundColor, color }}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
        <Button asChild>
          <a href={buttonLink}>{buttonText}</a>
        </Button>
      </div>
    </section>
  )
}

export function TestimonialCard({ quote, author, backgroundColor, color }: {
  quote: string
  author: string
  backgroundColor?: string
  color?: string
}) {
  return (
    <Card style={{ backgroundColor, color }}>
      <CardContent className="pt-6">
        <blockquote className="text-lg mb-4">"{quote}"</blockquote>
        <p className="font-semibold">- {author}</p>
      </CardContent>
    </Card>
  )
}

export function ContactForm({ backgroundColor, color }: {
  backgroundColor?: string
  color?: string
}) {
  return (
    <Card style={{ backgroundColor, color }}>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>Fill out the form below to get in touch.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Your email" />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              className="w-full min-h-[100px] px-3 py-2 rounded-md border"
              placeholder="Your message"
            ></textarea>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button>Send Message</Button>
      </CardFooter>
    </Card>
  )
}

export function PricingCard({ plan, price, features, backgroundColor, color }: {
  plan: string
  price: string
  features: string[]
  backgroundColor?: string
  color?: string
}) {
  return (
    <Card style={{ backgroundColor, color }}>
      <CardHeader>
        <CardTitle>{plan}</CardTitle>
        <CardDescription>{price}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Choose Plan</Button>
      </CardFooter>
    </Card>
  )
}

