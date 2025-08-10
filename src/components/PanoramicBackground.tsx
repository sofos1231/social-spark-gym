import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

// Panoramic background spanning multiple screens. It translates based on route
// to create the illusion of one giant background shared across the app.
const PanoramicBackground: React.FC = () => {
  const location = useLocation();

  // Define the ordered segments and map routes to a segment index.
  // 12 segments total to cover all current routes with unique-but-related looks.
  const segments = 12;

  const segmentIndex = useMemo(() => {
    const p = location.pathname;
    if (p === "/" || p === "/practice") return 0; // Practice hub
    if (p.startsWith("/practice-road")) return 1;     // Practice road
    if (p.startsWith("/quick-drill")) return 1;       // Quick drill (clustered with practice road)
    if (p.startsWith("/shadow-practice")) return 2;   // Shadow practice
    if (p.startsWith("/stats")) return 3;             // Stats
    if (p.startsWith("/shop")) return 4;              // Shop
    if (p.startsWith("/profile")) return 5;           // Profile
    if (p.startsWith("/badges")) return 6;            // Badges
    if (p.startsWith("/level-milestones")) return 7;  // Milestones
    if (p.startsWith("/upgrade")) return 8;           // Upgrade
    if (p.startsWith("/onboarding")) return 9;        // Onboarding
    if (p.startsWith("/auth")) return 10;             // Auth (login/signup)
    if (p.startsWith("/dev-bypass")) return 11;       // Dev
    return 11;                                         // Fallback
  }, [location.pathname]);

  const containerStyle: React.CSSProperties = {
    width: `${segments * 100}vw`,
    height: "100vh",
    transform: `translateX(-${segmentIndex * 100}vw)`,
    transition: "transform 450ms var(--animation-smooth)",
  };

  const buildSegmentStyle = (i: number): React.CSSProperties => ({
    // Opaque layered gradient using design tokens
    background: `linear-gradient(135deg, hsl(var(--panorama-${i}-a)), hsl(var(--panorama-${i}-b)))`,
  });

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      <div className="h-full will-change-transform" style={containerStyle}>
        {Array.from({ length: segments }).map((_, idx) => {
          const i = idx + 1; // tokens are 1-indexed
          return (
            <section
              key={idx}
              className="inline-block align-top w-screen h-full"
              style={buildSegmentStyle(i)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PanoramicBackground;
