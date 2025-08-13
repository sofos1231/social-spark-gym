import React from "react"
import { useEffect, useMemo, useState } from "react"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import eyeIllustration from "@/assets/eye-contact-illustration.jpg"
import groupIllustration from "@/assets/group-conversation-illustration.jpg"
import speakingIllustration from "@/assets/public-speaking-illustration.jpg"

type Slide = {
  id: string
  title: string
  subtitle: string
  image: string
  alt: string
}

const slidesData: Slide[] = [
  {
    id: "skill",
    title: "Train to succeed socially",
    subtitle: "Practice real conversations and build confidence where it matters.",
    image: eyeIllustration,
    alt: "Illustration of confident character improving eye contact on a skill tree",
  },
  {
    id: "ai",
    title: "AI coach at your side",
    subtitle: "Personalized drills and feedback that adapt to your style.",
    image: speakingIllustration,
    alt: "Illustration of chat bubbles with an AI coach avatar guiding practice",
  },
  {
    id: "community",
    title: "Join a trusted community",
    subtitle: "Thousands leveling up with streaks, XP, and supportive challenges.",
    image: groupIllustration,
    alt: "Illustration of a friendly group celebrating progress and badges",
  },
]

type Props = { onIndexChange?: (i: number) => void }
export default function OnboardingHeroCarousel({ onIndexChange }: Props) {
  const [api, setApi] = useState<CarouselApi | null>(null)
  
  const [pausedUntil, setPausedUntil] = useState<number | null>(null)
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Sync carousel selection with parent
  useEffect(() => {
    if (!api) return
    const onSelect = () => {
      const i = api.selectedScrollSnap()
      onIndexChange?.(i)
    }
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api, onIndexChange])

  // Autoplay that pauses forever after first interaction
  useEffect(() => {
    if (!api || prefersReducedMotion) return
    const id = setInterval(() => {
      if (pausedUntil && Date.now() < pausedUntil) return
      if (api.canScrollNext()) api.scrollNext()
      else api.scrollTo(0)
    }, 4500)
    return () => clearInterval(id)
  }, [api, pausedUntil, prefersReducedMotion])

  const handleUserInteraction = () => setPausedUntil(Date.now() + 6000)

  const slides = useMemo(() => slidesData, [])

  return (
    <section
      className="mt-5 select-none"
      aria-label="SocialGym highlights"
      onMouseEnter={handleUserInteraction}
      onTouchStart={handleUserInteraction}
      onPointerDown={handleUserInteraction}
    >
      <Carousel
        opts={{ align: "start", loop: true }}
        setApi={setApi}
        className="mx-auto w-full max-w-[560px]"
      >
        <CarouselContent>
          {slides.map((s) => (
            <CarouselItem key={s.id} className="px-2">
              <article className="rounded-2xl bg-background/5 p-5 text-center animate-fade-in">
                <div className="relative mx-auto aspect-[16/9] w-full overflow-hidden rounded-xl">
                  <img
                    src={s.image}
                    alt={s.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-3 text-base sm:text-lg font-semibold text-[hsl(var(--text-primary))]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-[hsl(var(--text-muted))]">
                  {s.subtitle}
                </p>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

      </Carousel>
    </section>
  )
}
