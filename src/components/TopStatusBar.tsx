import { useState } from 'react';
import { User, ChevronRight, ChevronDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopStatusBarProps {
  avatarUri?: string;
  username?: string;
  isPremium?: boolean;
  coins?: number;
  gems?: number;
  streak?: number;
  onPressMembership?: () => void;
  onPressCoin?: () => void;
  onPressGem?: () => void;
  onPressStreak?: () => void;
  onPressShop?: () => void;
  onSelectMenuItem?: (key: 'profile' | 'stats' | 'shop' | 'settings' | 'membership' | 'signout') => void;
}

const TopStatusBar = ({
  avatarUri,
  username = "SocialGym Player",
  isPremium = false,
  coins = 1250,
  gems = 8,
  streak = 5,
  onPressMembership,
  onPressCoin,
  onPressGem,
  onPressStreak,
  onPressShop,
  onSelectMenuItem
}: TopStatusBarProps) => {
  const [animatingCurrency, setAnimatingCurrency] = useState<'coins' | 'gems' | 'streak' | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

  const handleMenuItemClick = (key: 'profile' | 'stats' | 'shop' | 'settings' | 'membership' | 'signout') => {
    setIsProfileOpen(false);
    onSelectMenuItem?.(key);
  };

  return (
    <>
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
              {/* Username with Dropdown */}
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-1 text-left group transition-all duration-200 hover:scale-[1.02] max-w-full"
              >
                <h2 className="text-base font-semibold text-foreground truncate leading-tight">
                  {username}
                </h2>
                <ChevronDown className={cn(
                  "w-3 h-3 text-muted-foreground group-hover:text-foreground transition-all duration-300 flex-shrink-0",
                  isProfileOpen && "rotate-180"
                )} />
              </button>
              
              {/* Membership Pill - Bottom, Hugging Avatar */}
              <button
                onClick={handleMembershipClick}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 active:scale-98 w-fit mt-0.5",
                  "shadow-sm border backdrop-blur-sm",
                  isPremium 
                    ? "bg-gradient-to-r from-primary/80 to-primary text-primary-foreground border-primary/30 hover:from-primary hover:to-primary" 
                    : "bg-gradient-to-r from-slate-600/80 to-slate-700/80 text-white border-slate-500/30 hover:from-slate-500/80 hover:to-slate-600/80"
                )}
                style={{ 
                  height: '24px',
                  fontSize: '10px'
                }}
              >
                <span className="truncate max-w-[80px]">{isPremium ? "Premium" : "Get Membership"}</span>
                <div className={cn(
                  "w-2.5 h-2.5 rounded-full flex items-center justify-center flex-shrink-0",
                  isPremium ? "bg-white/30" : "bg-success"
                )}>
                  <ChevronRight className="w-1.5 h-1.5" />
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
                "flex items-center gap-2 px-2.5 py-1.5 rounded-full transition-all duration-200 active:scale-95 hover:scale-[1.02]",
                "bg-surface/80 backdrop-blur-sm border border-surface-border shadow-sm",
                animatingCurrency === 'coins' && "scale-105 bg-yellow-500/20 border-yellow-500/30 shadow-glow"
              )}
            >
              {/* Premium 3D Coin Icon */}
              <div className="w-4 h-4 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 shadow-inner">
                  <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-500">
                    <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-1 h-0.5 bg-yellow-100 rounded-full" />
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-yellow-600/50 rounded-full" />
                  </div>
                </div>
              </div>
              <span className="text-sm font-bold text-foreground">{coins.toLocaleString()}</span>
            </button>

            {/* Gems Pill */}
            <button
              onClick={() => handleCurrencyClick('gems', onPressGem)}
              className={cn(
                "flex items-center gap-2 px-2.5 py-1.5 rounded-full transition-all duration-200 active:scale-95 hover:scale-[1.02]",
                "bg-surface/80 backdrop-blur-sm border border-surface-border shadow-sm",
                animatingCurrency === 'gems' && "scale-105 bg-cyan-500/20 border-cyan-500/30 shadow-glow"
              )}
            >
              {/* Premium 3D Gem Icon */}
              <div className="w-4 h-4 relative">
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-cyan-200 via-cyan-400 to-cyan-700 shadow-inner transform rotate-45" 
                  style={{ 
                    clipPath: 'polygon(50% 0%, 85% 25%, 85% 75%, 50% 100%, 15% 75%, 15% 25%)',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                  }}
                >
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-1 bg-cyan-100/80" />
                </div>
              </div>
              <span className="text-sm font-bold text-foreground">{gems.toLocaleString()}</span>
            </button>

            {/* Streak Pill */}
            <button
              onClick={() => handleCurrencyClick('streak', onPressStreak)}
              className={cn(
                "flex items-center gap-2 px-2.5 py-1.5 rounded-full transition-all duration-200 active:scale-95 hover:scale-[1.02]",
                "bg-surface/80 backdrop-blur-sm border border-surface-border shadow-sm",
                animatingCurrency === 'streak' && "scale-105 bg-orange-500/20 border-orange-500/30 shadow-glow"
              )}
            >
              {/* Premium 3D Flame Icon */}
              <div className="w-4 h-4 relative">
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 shadow-inner" 
                  style={{ 
                    clipPath: 'polygon(50% 0%, 70% 30%, 85% 60%, 75% 90%, 50% 100%, 25% 90%, 15% 60%, 30% 30%)',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                  }}
                >
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-1 bg-yellow-100/90 rounded-full" />
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-0.5 bg-orange-200/60 rounded-full" />
                </div>
              </div>
              <span className="text-sm font-bold text-foreground">{streak.toLocaleString()}</span>
            </button>

            {/* Shop Button */}
            <button
              onClick={handleShopClick}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground transition-all duration-200 active:scale-95 hover:scale-[1.02] hover:shadow-glow-primary border border-primary/20"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Dropdown Menu */}
      <div 
        className={cn(
          "fixed left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border/50 shadow-xl transition-all duration-300 ease-out",
          isProfileOpen 
            ? "top-[73px] opacity-100 translate-y-0" 
            : "top-[73px] opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="px-4 py-4 space-y-2 max-w-6xl mx-auto">
          <button
            onClick={() => handleMenuItemClick('profile')}
            className="w-full flex items-center gap-4 px-4 py-4 text-lg font-medium text-foreground hover:bg-muted/60 rounded-xl transition-all duration-200 hover:scale-[1.01] bg-background/20"
          >
            <User className="w-6 h-6" />
            View Profile
          </button>
          
          <button
            onClick={() => handleMenuItemClick('membership')}
            className="w-full flex items-center gap-4 px-4 py-4 text-lg font-medium text-foreground hover:bg-muted/60 rounded-xl transition-all duration-200 hover:scale-[1.01] bg-background/20"
          >
            <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg" />
            {isPremium ? 'Manage Premium' : 'Get Membership'}
          </button>
          
          <button
            onClick={() => handleMenuItemClick('signout')}
            className="w-full flex items-center gap-4 px-4 py-4 text-lg font-medium text-destructive hover:bg-destructive/10 rounded-xl transition-all duration-200 hover:scale-[1.01] bg-background/20"
          >
            <div className="w-6 h-6 bg-gradient-to-br from-red-400 to-red-600 rounded-lg" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </>
  );
};

export default TopStatusBar;