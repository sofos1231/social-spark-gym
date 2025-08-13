import React, { useEffect, useRef, useState } from "react"

interface ImmersiveBackgroundProps {
  images: string[]
  activeIndex: number
}

// Renders full-screen blurred backgrounds that crossfade and subtly parallax on slide change
export default function ImmersiveBackground({ images, activeIndex }: ImmersiveBackgroundProps) {
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null)
  const prevActiveRef = useRef(activeIndex)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(m.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    m.addEventListener('change', handler)
    return () => m.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    setOutgoingIndex(prevActiveRef.current)
    prevActiveRef.current = activeIndex
    const t = setTimeout(() => setOutgoingIndex(null), 480)
    return () => clearTimeout(t)
  }, [activeIndex])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* Background layers crossfading per slide */}
      {images.map((src, i) => {
        const isActive = i === activeIndex
        const isOutgoing = i === outgoingIndex
        // Only active and outgoing need to be visible during transition
        const isVisible = isActive || isOutgoing
        return (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[450ms] ease-out"
            style={{ opacity: isActive ? 1 : 0, pointerEvents: "none" }}
          >
            {/* Subtle parallax/zoom via transform on the image container */}
            <div
              className="absolute inset-0 transition-transform duration-[450ms] ease-out will-change-transform"
              style={{
                transform: reducedMotion
                  ? "translate3d(0,0,0) scale(1)"
                  : isActive
                  ? "translate3d(0,0,0) scale(1)"
                  : "translate3d(12px,0,0) scale(1.01)",
              }}
            >
              <img
                src={src}
                alt=""
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover blur-2xl scale-110"
              />
              {/* Brand-tinted readability overlay */}
              <div className="absolute inset-0 bg-background/70" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
