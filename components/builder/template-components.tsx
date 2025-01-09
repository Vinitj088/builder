// components/builder/template-components.tsx
'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import {cn} from "@/lib/utils";
import {Button} from '@/components/ui/button'
function useGsapAnimation(ref: any, animation: any) {
  useEffect(() => {
    if (!ref.current) return

    const { type, duration, delay } = animation

    if (type === 'fadeIn') {
      gsap.from(ref.current, {
        opacity: 0,
        y: 30,
        duration,
        delay
      })
    } else if (type === 'staggered') {
      gsap.from(ref.current.children, {
        opacity: 0,
        y: 30,
        duration,
        stagger: delay
      })
    }
  }, [animation])
}

export function Hero({ title, subtitle, ctaText, alignment = 'center', animation }: any) {
  const ref = useRef(null)
  useGsapAnimation(ref, animation)

  return (
    <div
      ref={ref}
      className={cn(
        "py-24 px-8",
        {
          "text-center": alignment === 'center',
          "text-left": alignment === 'left',
          "text-right": alignment === 'right'
        }
      )}
    >
      <h1 className="text-5xl font-bold mb-6">{title}</h1>
      <p className="text-xl text-muted-foreground mb-8">{subtitle}</p>
      <Button size="lg">{ctaText}</Button>
    </div>
  )
}
