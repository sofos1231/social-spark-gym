import React, { useEffect, useState } from 'react';
import { Sparkles, Trophy, Star, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CelebrationOverlayProps {
  isVisible: boolean;
  celebrationType?: 'mission' | 'chapter' | 'milestone' | 'perfect';
  onComplete?: () => void;
  duration?: number;
  className?: string;
}

const CelebrationOverlay: React.FC<CelebrationOverlayProps> = ({
  isVisible,
  celebrationType = 'mission',
  onComplete,
  duration = 3000,
  className = ""
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; delay: number; size: number; color: string; icon: string }>>([]);

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      generateParticles();

      const timer = setTimeout(() => {
        setShowConfetti(false);
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onComplete]);

  const generateParticles = () => {
    const particleCount = celebrationType === 'chapter' ? 25 : 15;
    const colors = ['text-yellow-300', 'text-orange-300', 'text-pink-300', 'text-purple-300', 'text-blue-300'];
    const icons = ['✨', '⭐', '🎉', '💫', '🌟'];
    
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      delay: Math.random() * 1000,
      size: Math.random() * 0.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      icon: icons[Math.floor(Math.random() * icons.length)]
    }));
    
    setParticles(newParticles);
  };

  const getCelebrationConfig = () => {
    switch (celebrationType) {
      case 'chapter':
        return {
          title: '🏆 Chapter Complete!',
          subtitle: 'Amazing progress!',
          mainIcon: Trophy,
          bgColor: 'from-yellow-400/20 to-orange-400/20'
        };
      case 'milestone':
        return {
          title: '🎯 Milestone Reached!',
          subtitle: 'Keep up the momentum!',
          mainIcon: Star,
          bgColor: 'from-blue-400/20 to-purple-400/20'
        };
      case 'perfect':
        return {
          title: '💎 Perfect Score!',
          subtitle: 'Absolutely brilliant!',
          mainIcon: Sparkles,
          bgColor: 'from-purple-400/20 to-pink-400/20'
        };
      default:
        return {
          title: '✅ Mission Complete!',
          subtitle: 'Great job!',
          mainIcon: Star,
          bgColor: 'from-emerald-400/20 to-green-400/20'
        };
    }
  };

  const config = getCelebrationConfig();
  const MainIcon = config.mainIcon;

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center pointer-events-none",
      "bg-black/20 backdrop-blur-sm",
      className
    )}>
      {/* Confetti Particles */}
      {showConfetti && particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-2xl animate-confetti-fall pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10%`,
            animationDelay: `${particle.delay}ms`,
            transform: `scale(${particle.size})`,
            animationDuration: '3s'
          }}
        >
          {particle.icon}
        </div>
      ))}
      
      {/* Central Celebration */}
      <div className="pointer-events-none animate-scale-in">
        {/* Background Glow */}
        <div className={cn(
          "absolute inset-0 rounded-full blur-3xl animate-pulse",
          "bg-gradient-to-r", config.bgColor
        )} />
        
        {/* Main Content */}
        <div className="relative bg-card/90 backdrop-blur-md border border-border/50 rounded-3xl p-8 text-center shadow-2xl max-w-sm mx-4">
          {/* Main Icon */}
          <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center animate-bounce-subtle">
            <MainIcon className="w-8 h-8 text-white" />
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-display font-bold text-foreground mb-2 animate-fade-in">
            {config.title}
          </h2>
          
          {/* Subtitle */}
          <p className="text-muted-foreground font-medium animate-fade-in animation-delay-200">
            {config.subtitle}
          </p>
          
          {/* Decorative Elements */}
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-spin-slow" />
          </div>
          <div className="absolute -bottom-2 -left-2">
            <Star className="w-5 h-5 text-blue-400 animate-pulse" />
          </div>
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-3xl border-2 border-primary/30 animate-ping" />
        </div>
      </div>
      
      {/* Side Sparkles */}
      <div className="absolute top-1/4 left-1/4 animate-float">
        <Sparkles className="w-8 h-8 text-yellow-300" />
      </div>
      <div className="absolute top-1/3 right-1/4 animate-float animation-delay-500">
        <Star className="w-6 h-6 text-blue-300" />
      </div>
      <div className="absolute bottom-1/3 left-1/3 animate-float animation-delay-1000">
        <Heart className="w-7 h-7 text-pink-300" />
      </div>
    </div>
  );
};

export default CelebrationOverlay;