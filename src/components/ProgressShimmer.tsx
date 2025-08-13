import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressShimmerProps {
  isActive?: boolean;
  direction?: 'horizontal' | 'vertical' | 'radial';
  intensity?: 'subtle' | 'normal' | 'strong';
  color?: 'primary' | 'success' | 'warning' | 'gold';
  className?: string;
}

const ProgressShimmer: React.FC<ProgressShimmerProps> = ({
  isActive = true,
  direction = 'horizontal',
  intensity = 'normal',
  color = 'primary',
  className = ""
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'from-emerald-400/30 via-emerald-300/60 to-emerald-400/30';
      case 'warning':
        return 'from-yellow-400/30 via-yellow-300/60 to-yellow-400/30';
      case 'gold':
        return 'from-yellow-300/40 via-yellow-200/70 to-yellow-300/40';
      default:
        return 'from-primary/30 via-primary/60 to-primary/30';
    }
  };

  const getIntensityClasses = () => {
    switch (intensity) {
      case 'subtle':
        return 'opacity-40';
      case 'strong':
        return 'opacity-80';
      default:
        return 'opacity-60';
    }
  };

  const getDirectionClasses = () => {
    switch (direction) {
      case 'vertical':
        return 'bg-gradient-to-b';
      case 'radial':
        return 'bg-radial-gradient';
      default:
        return 'bg-gradient-to-r';
    }
  };

  const getAnimationClasses = () => {
    if (!isActive) return '';
    
    switch (direction) {
      case 'vertical':
        return 'animate-shimmer-vertical';
      case 'radial':
        return 'animate-shimmer-radial';
      default:
        return 'animate-shimmer-horizontal';
    }
  };

  return (
    <div className={cn(
      "absolute inset-0 pointer-events-none overflow-hidden rounded-inherit",
      className
    )}>
      {/* Base shimmer layer */}
      <div className={cn(
        "absolute inset-0 translate-x-[-100%]",
        getDirectionClasses(),
        getColorClasses(),
        getIntensityClasses(),
        getAnimationClasses()
      )} />
      
      {/* Enhanced sparkle trail for gold */}
      {color === 'gold' && isActive && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/40 to-transparent translate-x-[-100%] animate-shimmer-horizontal animation-delay-200" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-shimmer-horizontal animation-delay-400" />
        </>
      )}
      
      {/* Particle trail effect */}
      {intensity === 'strong' && isActive && (
        <div className="absolute inset-0">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className={cn(
                "absolute w-1 h-1 rounded-full opacity-80",
                color === 'gold' ? 'bg-yellow-200' : 'bg-primary',
                "animate-shimmer-particles"
              )}
              style={{
                left: `${i * 12.5}%`,
                top: '50%',
                animationDelay: `${i * 100}ms`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Glow effect overlay */}
      <div className={cn(
        "absolute inset-0 translate-x-[-100%]",
        "bg-gradient-to-r from-transparent via-white/20 to-transparent",
        "mix-blend-overlay",
        isActive ? "animate-shimmer-glow" : ""
      )} />
    </div>
  );
};

export default ProgressShimmer;