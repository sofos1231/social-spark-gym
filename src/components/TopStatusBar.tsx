import { useState, useEffect } from 'react';
import { Coins, Gem, Flame, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const TopStatusBar = () => {
  const [user] = useState({
    level: 5,
    currentXP: 750,
    nextLevelXP: 1000,
    coins: 1250,
    gems: 8,
    streak: 5,
    isLevelingUp: false
  });

  const [animatingCurrency, setAnimatingCurrency] = useState<'coins' | 'gems' | null>(null);
  const [streakBurst, setStreakBurst] = useState(false);

  const xpProgress = (user.currentXP / user.nextLevelXP) * 100;
  const streakMultiplier = Math.min(10 + (user.streak * 2), 50); // 10% base + 2% per day, max 50%

  const handleCurrencyClick = (type: 'coins' | 'gems') => {
    setAnimatingCurrency(type);
    setTimeout(() => setAnimatingCurrency(null), 300);
    
    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleStreakClick = () => {
    setStreakBurst(true);
    setTimeout(() => setStreakBurst(false), 600);
    
    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate([50, 50, 50]);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl">
      <div 
        className="px-4 py-3 border-b"
        style={{ 
          background: 'var(--gradient-background)',
          borderColor: 'hsl(var(--border) / 0.3)'
        }}
      >
        {/* Main Status Row */}
        <div className="flex items-center justify-between gap-2">
          {/* Level & XP Progress */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div 
              className={`
                relative flex items-center justify-center w-12 h-12 rounded-xl font-bold text-sm transition-all duration-300
                ${user.isLevelingUp ? 'animate-pulse-glow' : ''}
              `}
              style={{ 
                background: 'var(--gradient-primary)',
                boxShadow: user.isLevelingUp ? 'var(--shadow-glow-primary)' : 'var(--shadow-elevation)'
              }}
            >
              <Trophy size={16} className="text-primary-foreground mr-1" />
              <span className="text-primary-foreground font-display font-bold">{user.level}</span>
              {user.isLevelingUp && (
                <div className="absolute inset-0 rounded-xl animate-ping opacity-75" 
                     style={{ background: 'var(--gradient-primary)' }} />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-muted-foreground">Level {user.level}</span>
                <span className="text-xs font-bold text-foreground">
                  {user.currentXP}/{user.nextLevelXP} XP
                </span>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${xpProgress}%`,
                    background: 'var(--gradient-primary)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Currency Section */}
          <div className="flex items-center gap-2">
            {/* Coins */}
            <div 
              onClick={() => handleCurrencyClick('coins')}
              className={`
                flex items-center gap-1.5 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 active:scale-95
                ${animatingCurrency === 'coins' ? 'animate-bounce-subtle' : ''}
              `}
              style={{ 
                background: 'hsl(var(--card) / 0.8)',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-sm">
                <Coins size={14} className="text-white" />
              </div>
              <span className="text-sm font-bold text-foreground min-w-[2.5rem] text-right">
                {user.coins.toLocaleString()}
              </span>
            </div>

            {/* Gems */}
            <div 
              onClick={() => handleCurrencyClick('gems')}
              className={`
                flex items-center gap-1.5 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 active:scale-95
                ${animatingCurrency === 'gems' ? 'animate-bounce-subtle' : ''}
              `}
              style={{ 
                background: 'hsl(var(--card) / 0.8)',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-sm">
                <Gem size={14} className="text-white" />
              </div>
              <span className="text-sm font-bold text-foreground min-w-[1.5rem] text-right">
                {user.gems}
              </span>
            </div>

            {/* Streak */}
            <div 
              onClick={handleStreakClick}
              className={`
                flex items-center gap-1.5 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 active:scale-95 relative overflow-hidden
                ${streakBurst ? 'animate-pulse-glow' : ''}
              `}
              style={{ 
                background: 'var(--gradient-secondary)',
                boxShadow: 'var(--shadow-glow-secondary)'
              }}
            >
              {streakBurst && (
                <>
                  <div className="absolute inset-0 animate-ping bg-secondary opacity-75 rounded-xl" />
                  <div className="absolute -top-2 -left-2 text-xl animate-bounce-in">🔥</div>
                  <div className="absolute -top-2 -right-2 text-xl animate-bounce-in" style={{animationDelay: '100ms'}}>💥</div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-lg animate-bounce-in" style={{animationDelay: '200ms'}}>✨</div>
                </>
              )}
              
              <div className="relative z-10 flex items-center gap-1.5">
                <Flame size={14} className="text-secondary-foreground" />
                <span className="text-sm font-bold text-secondary-foreground">
                  {user.streak}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Streak Bonus Indicator */}
        {user.streak > 0 && (
          <div className="mt-2 flex justify-center">
            <div 
              className="px-2 py-1 rounded-full text-xs font-semibold animate-pulse-subtle"
              style={{ 
                background: 'var(--gradient-xp)',
                color: 'hsl(var(--secondary-foreground))'
              }}
            >
              🔥 +{streakMultiplier}% XP Bonus
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopStatusBar;