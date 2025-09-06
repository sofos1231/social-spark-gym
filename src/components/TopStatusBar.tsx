import { useState, useEffect } from 'react';
import { Coins, Gem, Flame, User, ChevronRight, Plus } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface TopStatusBarProps {
  avatarUri?: string;
  username?: string;
  isPremium?: boolean;
  coins?: number;
  gems?: number;
  streak?: number;
  level?: number;
  currentXP?: number;
  nextLevelXP?: number;
  onPressMembership?: () => void;
  onPressCoin?: () => void;
  onPressGem?: () => void;
  onPressStreak?: () => void;
  onPressShop?: () => void;
}

const TopStatusBar = ({
  avatarUri,
  username = "SocialGym Player",
  isPremium = false,
  coins = 1250,
  gems = 8,
  streak = 5,
  level = 5,
  currentXP = 750,
  nextLevelXP = 1000,
  onPressMembership,
  onPressCoin,
  onPressGem,
  onPressStreak,
  onPressShop
}: TopStatusBarProps) => {
  const [animatingCurrency, setAnimatingCurrency] = useState<'coins' | 'gems' | 'streak' | null>(null);
  const xpProgress = (currentXP / nextLevelXP) * 100;

  const handleCurrencyClick = (type: 'coins' | 'gems' | 'streak', callback?: () => void) => {
    setAnimatingCurrency(type);
    setTimeout(() => setAnimatingCurrency(null), 300);
    
    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    callback?.();
  };

  const handleMembershipClick = () => {
    if (navigator.vibrate) {
      navigator.vibrate([50, 50]);
    }
    onPressMembership?.();
  };

  const handleShopClick = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    onPressShop?.();
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center justify-between px-4 py-3 max-w-6xl mx-auto">
        {/* Left Section - Avatar & Profile */}
        <div className="flex items-center gap-3 flex-1 max-w-[60%]">
          {/* Clean Avatar - No Ring/Badge */}
          <div className="relative flex-shrink-0">
            <div className="w-11 h-11 rounded-full bg-muted/20 flex items-center justify-center overflow-hidden">
              {avatarUri ? (
                <img 
                  src={avatarUri} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          </div>

          {/* Username & Membership Stack */}
          <div className="flex flex-col justify-center min-w-0 flex-1">
            {/* Username - Top */}
            <h2 className="text-sm font-semibold text-foreground truncate leading-tight">
              {username}
            </h2>
            
            {/* Membership Pill - Bottom, Hugging Avatar */}
            <button
              onClick={handleMembershipClick}
              className={cn(
                "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 active:scale-98 w-fit mt-1",
                "shadow-sm border backdrop-blur-sm",
                isPremium 
                  ? "bg-gradient-primary text-primary-foreground border-primary/20" 
                  : "bg-gradient-to-r from-slate-600 to-slate-700 text-white border-slate-500/30 hover:from-slate-500 hover:to-slate-600"
              )}
              style={{ 
                maxHeight: '28px',
                fontSize: '11px'
              }}
            >
              <span className="truncate">{isPremium ? "Premium" : "Get Membership"}</span>
              <div className={cn(
                "w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0",
                isPremium ? "bg-white/20" : "bg-success"
              )}>
                <ChevronRight className="w-2 h-2" />
              </div>
            </button>
          </div>
        </div>

        {/* Right Section - Currency Pills */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Coins Pill */}
          <button
            onClick={() => handleCurrencyClick('coins', onPressCoin)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 active:scale-95",
              "bg-white/6 backdrop-blur-sm border border-white/10 shadow-sm",
              animatingCurrency === 'coins' && "scale-105 bg-yellow-500/20 border-yellow-500/30"
            )}
          >
            {/* Premium 3D Coin Icon Placeholder */}
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-sm">
              <div className="w-2 h-2 rounded-full bg-yellow-200/80" />
            </div>
            <span className="text-sm font-bold text-foreground">{coins.toLocaleString()}</span>
          </button>

          {/* Gems Pill */}
          <button
            onClick={() => handleCurrencyClick('gems', onPressGem)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 active:scale-95",
              "bg-white/6 backdrop-blur-sm border border-white/10 shadow-sm",
              animatingCurrency === 'gems' && "scale-105 bg-cyan-500/20 border-cyan-500/30"
            )}
          >
            {/* Premium 3D Gem Icon Placeholder */}
            <div className="w-4 h-4 bg-gradient-to-br from-cyan-300 via-cyan-400 to-cyan-600 transform rotate-45 shadow-sm" 
                 style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
            <span className="text-sm font-bold text-foreground">{gems}</span>
          </button>

          {/* Streak Pill */}
          <button
            onClick={() => handleCurrencyClick('streak', onPressStreak)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 active:scale-95",
              "bg-white/6 backdrop-blur-sm border border-white/10 shadow-sm",
              animatingCurrency === 'streak' && "scale-105 bg-orange-500/20 border-orange-500/30"
            )}
          >
            {/* Premium 3D Flame Icon Placeholder */}
            <div className="w-4 h-4 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-orange-600 via-orange-500 to-yellow-400 rounded-full shadow-sm" 
                   style={{ clipPath: 'polygon(50% 0%, 80% 40%, 100% 100%, 0% 100%, 20% 40%)' }} />
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-200 rounded-full" />
            </div>
            <span className="text-sm font-bold text-foreground">{streak}</span>
          </button>

          {/* Shop Button */}
          <button
            onClick={handleShopClick}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground transition-all duration-200 active:scale-95 hover:shadow-glow-primary border border-primary/20"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopStatusBar;