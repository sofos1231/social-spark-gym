import { useEffect, useState } from 'react';
import { Zap, Star } from 'lucide-react';

interface XPBurstOverlayProps {
  xp: number;
  onComplete: () => void;
  position?: { x: number; y: number };
  showStreakBonus?: boolean;
  streakMultiplier?: number;
}

const XPBurstOverlay = ({ 
  xp, 
  onComplete, 
  position = { x: 50, y: 50 },
  showStreakBonus = false,
  streakMultiplier = 1
}: XPBurstOverlayProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate particle positions
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 40 - 20,
      y: Math.random() * 40 - 20,
      delay: i * 50
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  const totalXP = Math.round(xp * streakMultiplier);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {/* XP Burst Animation */}
      <div 
        className="relative"
        style={{ 
          left: `${position.x - 50}%`, 
          top: `${position.y - 50}%` 
        }}
      >
        {/* Main XP Text */}
        <div className="animate-xp-burst text-center">
          <div className="text-4xl font-bold text-gold animate-scale-bounce mb-2">
            +{totalXP}
          </div>
          <div className="flex items-center justify-center gap-1 text-lg text-gold">
            <Zap className="w-5 h-5" />
            <span className="font-semibold">XP</span>
          </div>
        </div>

        {/* Streak Bonus */}
        {showStreakBonus && streakMultiplier > 1 && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in-up">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-glow-orange">
              🔥 {streakMultiplier}x Streak Bonus!
            </div>
          </div>
        )}

        {/* Particle Burst */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 animate-particle-explode"
            style={{
              left: '50%',
              top: '50%',
              animationDelay: `${particle.delay}ms`,
              transform: `translate(${particle.x}px, ${particle.y}px)`
            }}
          >
            <Star className="w-full h-full text-gold fill-current" />
          </div>
        ))}

        {/* Expanding Ring Effect */}
        <div className="absolute inset-0 -m-8">
          <div className="w-full h-full rounded-full border-2 border-gold/50 animate-ring-expand" />
        </div>
        <div className="absolute inset-0 -m-12">
          <div className="w-full h-full rounded-full border border-gold/30 animate-ring-expand animation-delay-200" />
        </div>
      </div>
    </div>
  );
};

export default XPBurstOverlay;