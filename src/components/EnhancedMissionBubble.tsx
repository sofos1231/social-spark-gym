import React, { useState } from 'react';
import { LucideIcon, Lock, Crown, Gem, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import GoldenMissionCoin from './GoldenMissionCoin';
import ProgressShimmer from './ProgressShimmer';

interface Mission {
  id: number;
  title: string;
  description: string;
  type: 'chat' | 'video' | 'boss' | 'premium';
  duration: string;
  xpReward: number;
  status: 'locked' | 'available' | 'completed' | 'current';
  difficulty: 'easy' | 'medium' | 'hard';
}

interface EnhancedMissionBubbleProps {
  mission: Mission;
  icon: LucideIcon;
  position: { x: number; y: number };
  onTap: (mission: Mission) => void;
  showNewTag?: boolean;
  streakBonus?: boolean;
  isUnlocking?: boolean;
  showCelebration?: boolean;
}

const EnhancedMissionBubble: React.FC<EnhancedMissionBubbleProps> = ({
  mission,
  icon: Icon,
  position,
  onTap,
  showNewTag = false,
  streakBonus = false,
  isUnlocking = false,
  showCelebration = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Show golden coin for completed missions
  if (mission.status === 'completed') {
    return (
      <div
        className="absolute pointer-events-auto animate-scale-in"
        style={{
          left: `${position.x}%`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
        onClick={() => onTap(mission)}
      >
        <GoldenMissionCoin 
          size="md"
          showSparkles={showCelebration}
          isPerfect={mission.xpReward >= 200}
          className="animate-coin-flip"
        />
        
        {/* Mission Title */}
        <div className="mt-4 text-center max-w-[100px]">
          <h3 className="text-sm font-bold text-success leading-tight font-display">
            {mission.title}
          </h3>
        </div>
      </div>
    );
  }

  const getBubbleStyles = () => {
    const baseClasses = "relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer transform";
    
    switch (mission.status) {
      case 'current':
        return cn(
          baseClasses,
          "bg-gradient-to-br from-primary-glow via-primary to-primary/90",
          "shadow-[0_8px_32px_rgba(var(--primary-rgb)/0.4),0_0_0_4px_rgba(var(--primary-rgb)/0.1)]",
          "border-2 border-primary/30",
          "animate-pulse-glow",
          "hover:scale-110 hover:shadow-[0_12px_40px_rgba(var(--primary-rgb)/0.5)]",
          streakBonus && "after:content-[''] after:absolute after:-inset-3 after:rounded-full after:bg-gradient-conic after:from-yellow-400 after:via-orange-400 after:to-yellow-400 after:animate-spin-slow after:-z-10 after:opacity-60"
        );
      case 'available':
        return cn(
          baseClasses,
          "bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700",
          "shadow-[0_6px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]",
          "border-2 border-slate-400/20",
          "hover:scale-105 hover:shadow-[0_8px_32px_rgba(var(--primary-rgb)/0.2)]",
          "hover:border-primary/40 hover:from-slate-400 hover:to-slate-600"
        );
      case 'locked':
      default:
        return cn(
          baseClasses,
          "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900",
          "shadow-[0_4px_16px_rgba(0,0,0,0.2)]",
          "border-2 border-slate-600/30",
          "opacity-60 cursor-not-allowed",
          "hover:scale-100" // Override hover scale for locked
        );
    }
  };

  const getTypeEnhancement = () => {
    if (mission.type === 'boss') {
      return (
        <div className="absolute -inset-2 rounded-full bg-gradient-conic from-orange-400 via-red-500 to-orange-400 animate-spin-slow opacity-70 -z-10" />
      );
    }
    if (mission.type === 'premium') {
      return (
        <div className="absolute -inset-2 rounded-full bg-gradient-conic from-purple-400 via-pink-500 to-purple-400 animate-spin-slow opacity-60 -z-10" />
      );
    }
    return null;
  };

  const getStatusIcon = () => {
    if (mission.status === 'locked') return Lock;
    if (mission.type === 'boss') return Crown;
    if (mission.type === 'premium') return Gem;
    return Icon;
  };

  const StatusIcon = getStatusIcon();

  return (
    <div
      className="absolute pointer-events-auto"
      style={{
        left: `${position.x}%`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Unlock Animation */}
      {isUnlocking && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 animate-ping" />
      )}
      
      {/* Type Enhancement Ring */}
      {getTypeEnhancement()}
      
      {/* Main Mission Bubble */}
      <div
        className={cn(
          getBubbleStyles(),
          isUnlocking && "animate-treasure-unlock"
        )}
        onClick={() => onTap(mission)}
      >
        {/* Inner Gradient Overlay */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent" />
        
        {/* Progress Shimmer for Current Mission */}
        {mission.status === 'current' && (
          <ProgressShimmer 
            isActive={true}
            direction="radial"
            intensity="normal"
            color="primary"
            className="rounded-full"
          />
        )}
        
        {/* Mission Icon */}
        <StatusIcon className={cn(
          "relative z-10 drop-shadow-sm",
          mission.status === 'current' ? "w-9 h-9 text-white" : 
          mission.status === 'available' ? "w-8 h-8 text-white" :
          "w-7 h-7 text-slate-400"
        )} />
        
        {/* Lock Overlay */}
        {mission.status === 'locked' && (
          <div className="absolute inset-0 rounded-full bg-slate-900/50 flex items-center justify-center">
            <div className="w-6 h-6 bg-slate-500 rounded-sm opacity-80" />
          </div>
        )}
        
        {/* Difficulty Indicator */}
        {mission.status !== 'locked' && (
          <div className={cn(
            "absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs",
            mission.difficulty === 'easy' && "bg-green-500",
            mission.difficulty === 'medium' && "bg-yellow-500", 
            mission.difficulty === 'hard' && "bg-red-500"
          )}>
            {mission.difficulty === 'easy' && '●'}
            {mission.difficulty === 'medium' && '●●'}
            {mission.difficulty === 'hard' && '●●●'}
          </div>
        )}
        
        {/* NEW Tag */}
        {showNewTag && mission.status === 'available' && (
          <div className="absolute -top-4 -right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg animate-bounce-subtle">
            NEW!
          </div>
        )}
        
        {/* Trending Fire Effect */}
        {mission.status === 'current' && streakBonus && (
          <div className="absolute -top-3 -right-2 text-orange-400 animate-bounce">
            🔥
          </div>
        )}
      </div>

      {/* Mission Title */}
      <div className="mt-4 text-center max-w-[120px]">
        <h3 className={cn(
          "text-sm font-bold leading-tight font-display",
          mission.status === 'current' ? "text-primary" :
          mission.status === 'available' ? "text-foreground" :
          "text-muted-foreground"
        )}>
          {mission.title}
        </h3>
      </div>
      
      {/* Base Shadow */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-16 h-2 bg-black/10 rounded-full blur-md" />
    </div>
  );
};

export default EnhancedMissionBubble;