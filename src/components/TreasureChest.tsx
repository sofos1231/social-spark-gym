import React, { useState } from 'react';
import { Gift, Sparkles, Trophy, Gem } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TreasureChestProps {
  isUnlocked?: boolean;
  isOpening?: boolean;
  rewardType?: 'xp' | 'badge' | 'gem' | 'mystery';
  onOpen?: () => void;
  className?: string;
}

const TreasureChest: React.FC<TreasureChestProps> = ({
  isUnlocked = false,
  isOpening = false,
  rewardType = 'mystery',
  onOpen,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getRewardIcon = () => {
    switch (rewardType) {
      case 'xp': return Trophy;
      case 'badge': return Trophy;
      case 'gem': return Gem;
      default: return Gift;
    }
  };

  const RewardIcon = getRewardIcon();

  const getChestColor = () => {
    if (!isUnlocked) return 'from-slate-600 to-slate-700';
    if (isOpening) return 'from-yellow-400 to-yellow-500';
    return 'from-amber-600 to-amber-700';
  };

  return (
    <div 
      className={cn("relative cursor-pointer", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={isUnlocked ? onOpen : undefined}
    >
      {/* Magical Particles */}
      {isUnlocked && (
        <>
          <Sparkles className="absolute -top-2 -right-1 w-3 h-3 text-yellow-300 animate-bounce" />
          <Sparkles className="absolute -top-1 -left-2 w-2 h-2 text-amber-400 animate-bounce animation-delay-300" />
          <Sparkles className="absolute -bottom-1 right-0 w-2 h-2 text-yellow-200 animate-bounce animation-delay-600" />
        </>
      )}
      
      {/* Glow Effect for Unlocked */}
      {isUnlocked && (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-xl blur-lg animate-pulse" />
      )}
      
      {/* Main Chest Body */}
      <div className={cn(
        "relative w-16 h-12 rounded-lg",
        "bg-gradient-to-br", getChestColor(),
        "shadow-lg border-2",
        isUnlocked ? "border-amber-300/50" : "border-slate-500/50",
        "transform transition-all duration-300",
        isHovered && isUnlocked ? "scale-105 rotate-1" : "",
        isOpening ? "animate-bounce" : ""
      )}>
        {/* Chest Lid */}
        <div className={cn(
          "absolute -top-1 left-0 right-0 h-4 rounded-t-lg",
          "bg-gradient-to-br", getChestColor(),
          "border-2 border-b-0",
          isUnlocked ? "border-amber-300/50" : "border-slate-500/50",
          "transform transition-all duration-500",
          isOpening ? "rotate-x-45 origin-bottom" : ""
        )}>
          {/* Lid Highlight */}
          <div className="absolute inset-1 rounded-t bg-gradient-to-br from-white/20 to-transparent" />
          
          {/* Lock/Handle */}
          <div className={cn(
            "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2",
            "w-3 h-2 rounded-sm",
            isUnlocked ? "bg-yellow-300" : "bg-slate-400",
            "border border-opacity-50"
          )} />
        </div>
        
        {/* Body Highlights */}
        <div className="absolute inset-2 rounded bg-gradient-to-br from-white/10 to-transparent" />
        
        {/* Corner Reinforcements */}
        <div className="absolute top-2 left-1 w-1 h-6 bg-black/20 rounded-full" />
        <div className="absolute top-2 right-1 w-1 h-6 bg-black/20 rounded-full" />
        
        {/* Treasure Peek (when opening) */}
        {isOpening && (
          <div className="absolute inset-2 flex items-center justify-center">
            <RewardIcon className="w-4 h-4 text-yellow-300 animate-bounce" />
          </div>
        )}
      </div>
      
      {/* Base Shadow */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-12 h-1 bg-black/20 rounded-full blur-sm" />
      
      {/* Unlock Indicator */}
      {isUnlocked && !isOpening && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-success text-success-foreground text-xs px-2 py-1 rounded-full font-bold animate-pulse">
          Ready!
        </div>
      )}
    </div>
  );
};

export default TreasureChest;