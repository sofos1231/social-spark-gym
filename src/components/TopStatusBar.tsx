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
        <div className="flex items-center gap-3 flex-1">
          {/* Avatar with XP Ring */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-primary p-0.5">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                {avatarUri ? (
                  <img 
                    src={avatarUri} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-foreground" />
                )}
              </div>
            </div>
            {/* XP Progress Ring Overlay */}
            <svg className="absolute inset-0 w-12 h-12 -rotate-90" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r="20"
                stroke="hsl(var(--muted))"
                strokeWidth="2"
                fill="none"
                opacity="0.3"
              />
              <circle
                cx="22"
                cy="22"
                r="20"
                stroke="hsl(var(--secondary))"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${xpProgress * 1.256} 125.6`}
                className="transition-all duration-300"
              />
            </svg>
            {/* Level Badge */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-secondary border-2 border-background flex items-center justify-center">
              <span className="text-xs font-bold text-secondary-foreground">{level}</span>
            </div>
          </div>

          {/* Username & Membership */}
          <div className="flex flex-col justify-center min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-foreground truncate">
              {username}
            </h2>
            <button
              onClick={handleMembershipClick}
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 active:scale-95 w-fit",
                isPremium 
                  ? "bg-gradient-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-accent"
              )}
            >
              <span>{isPremium ? "Premium" : "Get Membership"}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Section - Currency Group */}
        <div className="flex items-center gap-2">
          {/* Coins */}
          <button
            onClick={() => handleCurrencyClick('coins', onPressCoin)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/60 border border-border/50 backdrop-blur-sm transition-all duration-200 active:scale-95",
              animatingCurrency === 'coins' && "scale-105 bg-secondary/20"
            )}
          >
            <Coins className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-bold text-foreground">{coins.toLocaleString()}</span>
          </button>

          {/* Gems */}
          <button
            onClick={() => handleCurrencyClick('gems', onPressGem)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/60 border border-border/50 backdrop-blur-sm transition-all duration-200 active:scale-95",
              animatingCurrency === 'gems' && "scale-105 bg-primary/20"
            )}
          >
            <Gem className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-foreground">{gems}</span>
          </button>

          {/* Streak */}
          <button
            onClick={() => handleCurrencyClick('streak', onPressStreak)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/60 border border-border/50 backdrop-blur-sm transition-all duration-200 active:scale-95",
              animatingCurrency === 'streak' && "scale-105 bg-secondary/20"
            )}
          >
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-bold text-foreground">{streak}</span>
          </button>

          {/* Shop Button */}
          <button
            onClick={handleShopClick}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground transition-all duration-200 active:scale-95 hover:shadow-glow-primary"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopStatusBar;