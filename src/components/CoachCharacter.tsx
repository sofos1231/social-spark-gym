import React, { useState, useEffect } from 'react';
import { MessageCircle, ThumbsUp, Target, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CoachCharacterProps {
  message?: string;
  mood?: 'encouraging' | 'celebrating' | 'coaching' | 'excited';
  showSpeechBubble?: boolean;
  position?: 'floating' | 'corner' | 'inline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CoachCharacter: React.FC<CoachCharacterProps> = ({
  message = "You're doing great!",
  mood = 'encouraging',
  showSpeechBubble = true,
  position = 'floating',
  size = 'md',
  className = ""
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const getMoodColor = () => {
    switch (mood) {
      case 'celebrating': return 'from-yellow-400 to-orange-400';
      case 'coaching': return 'from-blue-400 to-indigo-400';
      case 'excited': return 'from-purple-400 to-pink-400';
      default: return 'from-emerald-400 to-green-400';
    }
  };

  const getMoodIcon = () => {
    switch (mood) {
      case 'celebrating': return ThumbsUp;
      case 'coaching': return Target;
      case 'excited': return Zap;
      default: return MessageCircle;
    }
  };

  const MoodIcon = getMoodIcon();

  const positionClasses = {
    floating: 'fixed bottom-20 right-4 z-50',
    corner: 'absolute top-4 right-4',
    inline: 'relative'
  };

  return (
    <div className={cn(positionClasses[position], className)}>
      {/* Speech Bubble */}
      {showSpeechBubble && message && (
        <div className="absolute bottom-full mb-2 right-0 max-w-48 p-3 bg-card border border-border rounded-2xl shadow-lg animate-scale-in">
          <p className="text-sm font-medium text-foreground">{message}</p>
          {/* Speech Bubble Tail */}
          <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-border" />
          <div className="absolute top-full right-6 translate-y-[-1px] w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-card" />
        </div>
      )}
      
      {/* Character Avatar */}
      <div className={cn(
        sizeClasses[size],
        "relative rounded-full bg-gradient-to-br", getMoodColor(),
        "shadow-lg border-2 border-white/20",
        "flex items-center justify-center",
        "transform transition-all duration-300",
        isAnimating ? "animate-bounce scale-110" : "hover:scale-105",
        "cursor-pointer"
      )}>
        {/* Inner Glow */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
        
        {/* Character Face/Icon */}
        <div className="relative z-10 flex items-center justify-center">
          <MoodIcon className={cn(
            size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-9 h-9' : 'w-7 h-7',
            "text-white drop-shadow-sm"
          )} />
        </div>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
        
        {/* Mood Indicator Pulse */}
        {mood === 'excited' && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 animate-ping" />
        )}
      </div>
      
      {/* Floating Particles */}
      {mood === 'celebrating' && (
        <>
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-300 rounded-full animate-bounce animation-delay-100" />
          <div className="absolute -top-2 right-0 w-1 h-1 bg-orange-300 rounded-full animate-bounce animation-delay-300" />
          <div className="absolute top-1 -right-2 w-1 h-1 bg-yellow-400 rounded-full animate-bounce animation-delay-500" />
        </>
      )}
      
      {/* Base Shadow */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-8 h-1 bg-black/10 rounded-full blur-sm" />
    </div>
  );
};

export default CoachCharacter;