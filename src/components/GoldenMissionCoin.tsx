import React from 'react';
import { CheckCircle, Crown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GoldenMissionCoinProps {
  size?: 'sm' | 'md' | 'lg';
  showSparkles?: boolean;
  isPerfect?: boolean;
  className?: string;
}

const GoldenMissionCoin: React.FC<GoldenMissionCoinProps> = ({
  size = 'md',
  showSparkles = true,
  isPerfect = false,
  className = ""
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16', 
    lg: 'w-20 h-20'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9'
  };

  return (
    <div className={cn("relative", className)}>
      {/* Sparkle Particles */}
      {showSparkles && (
        <>
          <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 animate-pulse" />
          <Sparkles className="absolute -bottom-1 -left-1 w-2 h-2 text-yellow-200 animate-pulse animation-delay-500" />
          <Sparkles className="absolute top-1/2 -left-2 w-2 h-2 text-yellow-400 animate-pulse animation-delay-1000" />
        </>
      )}
      
      {/* Main Coin */}
      <div className={cn(
        sizeClasses[size],
        "relative rounded-full flex items-center justify-center",
        "bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500",
        "shadow-[0_6px_20px_rgba(250,204,21,0.4),inset_0_1px_0_rgba(255,255,255,0.4)]",
        "border-2 border-yellow-200/50",
        "transform transition-all duration-300 hover:scale-105 hover:rotate-3",
        "before:absolute before:inset-1 before:rounded-full",
        "before:bg-gradient-to-br before:from-yellow-200/30 before:to-transparent",
        "after:absolute after:inset-0 after:rounded-full",
        "after:bg-gradient-to-t after:from-yellow-600/20 after:via-transparent after:to-yellow-100/20"
      )}>
        {/* Inner Glow Ring */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-100/40 to-yellow-300/20 animate-pulse" />
        
        {/* Check or Crown Icon */}
        <div className="relative z-10 flex items-center justify-center">
          {isPerfect ? (
            <Crown className={cn(iconSizes[size], "text-yellow-800 drop-shadow-sm")} />
          ) : (
            <CheckCircle className={cn(iconSizes[size], "text-yellow-800 drop-shadow-sm")} />
          )}
        </div>
        
        {/* Metallic Shine Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-60" />
        
        {/* Rotating Rim Highlight */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-yellow-100/50 to-transparent animate-spin-slow opacity-40" />
      </div>
      
      {/* Shadow/Glow Base */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-yellow-400/30 rounded-full blur-sm animate-pulse" />
    </div>
  );
};

export default GoldenMissionCoin;