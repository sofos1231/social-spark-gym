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
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [interacted, setInteracted] = useState(false)

  // Sync dots with carousel selection
  useEffect(() => {
    if (!api) return
    const onSelect = () => {
      const i = api.selectedScrollSnap()
      setSelectedIndex(i)
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
    if (!api || interacted) return
    const id = setInterval(() => {
      if (!api) return
      if (api.canScrollNext()) api.scrollNext()
      else api.scrollTo(0)
    }, 4500)
    return () => clearInterval(id)
  }, [api, interacted])

  const handleUserInteraction = () => setInteracted(true)

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
              <article className="rounded-2xl border border-border/40 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 shadow-lg/30 shadow-[var(--shadow-elegant)] p-4 sm:p-5 text-center animate-fade-in">
                <div className="relative mx-auto aspect-[16/9] w-full overflow-hidden rounded-xl">
                  <img
                    src={s.image}
                    alt={s.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <span aria-hidden className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/5" />
                </div>
                <h3 className="mt-4 text-base sm:text-lg font-semibold text-[hsl(var(--text-primary))]">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-[hsl(var(--text-muted))]">
                  {s.subtitle}
                </p>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Dots */}
        <div className="mt-3 flex justify-center gap-2" role="tablist" aria-label="Carousel pagination">
          {slides.map((_, i) => {
            const active = i === selectedIndex
            return (
              <button
                key={i}
                role="tab"
                aria-selected={active}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => {
                  handleUserInteraction()
                  api?.scrollTo(i)
                }}
                className={
                  "h-2.5 w-2.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
                  (active ? "bg-primary/90 scale-110" : "bg-muted hover:bg-muted/80")
                }
                style={{ minHeight: 10, minWidth: 10 }}
              />
            )
          })}
        </div>
      </Carousel>
    </section>
  )
}
