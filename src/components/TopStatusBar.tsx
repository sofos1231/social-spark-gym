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
  const [showXPBonusPopup, setShowXPBonusPopup] = useState(false);

  const xpProgress = (user.currentXP / user.nextLevelXP) * 100;
  const streakMultiplier = Math.min(10 + (user.streak * 2), 50); // 10% base + 2% per day, max 50%
  const hasXPBonus = user.streak > 0;

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

  const handleTrophyClick = () => {
    if (hasXPBonus) {
      setShowXPBonusPopup(true);
      // Auto-dismiss after 2.5 seconds
      setTimeout(() => setShowXPBonusPopup(false), 2500);
      
      // Simulate haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
    }
  };

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showXPBonusPopup) {
        setShowXPBonusPopup(false);
      }
    };

    if (showXPBonusPopup) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showXPBonusPopup]);

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
        <div className="flex items-center justify-between gap-4">
          {/* Level & XP Progress */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="relative">
              <div 
                onClick={handleTrophyClick}
                className={`
                  relative flex items-center justify-center w-14 h-14 rounded-xl font-bold text-sm transition-all duration-300
                  ${user.isLevelingUp ? 'animate-pulse-glow' : ''}
                  ${hasXPBonus ? 'cursor-pointer hover:scale-105' : ''}
                `}
                style={{ 
                  background: 'var(--gradient-primary)',
                  boxShadow: user.isLevelingUp ? 'var(--shadow-glow-primary)' : 'var(--shadow-elevation)'
                }}
              >
                <Trophy size={18} className="text-primary-foreground mr-1" />
                <span className="text-primary-foreground font-display font-bold">{user.level}</span>
                {user.isLevelingUp && (
                  <div className="absolute inset-0 rounded-xl animate-ping opacity-75" 
                       style={{ background: 'var(--gradient-primary)' }} />
                )}
              </div>
              
              {/* Green XP Bonus Glow */}
              {hasXPBonus && (
                <div 
                  className="absolute inset-0 rounded-xl animate-pulse pointer-events-none"
                  style={{ 
                    boxShadow: '0 0 20px 3px rgba(34, 197, 94, 0.4), 0 0 30px 6px rgba(34, 197, 94, 0.2)',
                    border: '2px solid rgba(34, 197, 94, 0.6)'
                  }}
                />
              )}

              {/* XP Bonus Popup */}
              {showXPBonusPopup && hasXPBonus && (
                <div 
                  className="absolute -top-24 left-1/2 transform -translate-x-1/2 z-[60] animate-fade-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div 
                    className="relative px-4 py-3 rounded-2xl backdrop-blur-xl border border-green-400/30 shadow-2xl min-w-[200px] text-center"
                    style={{
                      background: 'rgba(34, 197, 94, 0.1)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(34, 197, 94, 0.3)'
                    }}
                  >
                    {/* Arrow pointing down */}
                    <div 
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45"
                      style={{
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        borderTop: 'none',
                        borderLeft: 'none'
                      }}
                    />
                    
                    <div className="relative z-10">
                      <div className="text-sm font-bold text-green-400 mb-1 flex items-center justify-center gap-1">
                        🔥 You have a +{streakMultiplier}% XP Bonus!
                      </div>
                      <div className="text-xs text-green-300">
                        Earn more XP while this is active.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-muted-foreground">Level {user.level}</span>
                <span className="text-xs font-bold text-foreground">
                  {user.currentXP}/{user.nextLevelXP} XP
                </span>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-2.5 overflow-hidden">
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
          <div className="flex items-center gap-3">
            {/* Coins */}
            <div 
              onClick={() => handleCurrencyClick('coins')}
              className={`
                flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 active:scale-95
                ${animatingCurrency === 'coins' ? 'animate-bounce-subtle' : ''}
              `}
              style={{ 
                background: 'hsl(var(--card) / 0.9)',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-sm">
                <Coins size={16} className="text-white" />
              </div>
              <span className="text-sm font-bold text-foreground min-w-[3rem] text-left">
                {user.coins.toLocaleString()}
              </span>
            </div>

            {/* Gems */}
            <div 
              onClick={() => handleCurrencyClick('gems')}
              className={`
                flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 active:scale-95
                ${animatingCurrency === 'gems' ? 'animate-bounce-subtle' : ''}
              `}
              style={{ 
                background: 'hsl(var(--card) / 0.9)',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-sm">
                <Gem size={16} className="text-white" />
              </div>
              <span className="text-sm font-bold text-foreground min-w-[1.5rem] text-left">
                {user.gems}
              </span>
            </div>

            {/* Streak */}
            <div 
              onClick={handleStreakClick}
              className={`
                flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 active:scale-95 relative overflow-hidden
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
              
              <div className="relative z-10 flex items-center gap-2">
                <Flame size={16} className="text-secondary-foreground" />
                <span className="text-sm font-bold text-secondary-foreground">
                  {user.streak}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopStatusBar;