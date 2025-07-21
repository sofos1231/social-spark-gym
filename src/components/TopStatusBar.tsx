import { Flame, Coins, Gem, Plus, TrendingUp } from 'lucide-react';

interface TopStatusBarProps {
  streak?: number;
  coins?: number;
  gems?: number;
  level?: number;
  currentXP?: number;
  nextLevelXP?: number;
}

const TopStatusBar = ({ 
  streak = 12, 
  coins = 8740, 
  gems = 1320, 
  level = 7,
  currentXP = 2450,
  nextLevelXP = 3000
}: TopStatusBarProps) => {
  const xpProgress = (currentXP / nextLevelXP) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl">
      <div 
        className="h-16 border-b border-border/20 px-4"
        style={{ background: 'var(--gradient-background)' }}
      >
        <div className="flex items-center justify-between h-full max-w-screen-xl mx-auto">
          
          {/* Left: Level & XP Progress */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-primary">
                <TrendingUp size={16} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground leading-none">Level {level}</span>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-primary transition-all duration-700 ease-out rounded-full shadow-glow-primary/50" 
                      style={{ width: `${xpProgress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground leading-none">{Math.round(xpProgress)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Currency & Streak */}
          <div className="flex items-center gap-4">
            
            {/* Day Streak */}
            <div className="flex items-center gap-1.5 bg-card-secondary/80 px-3 py-1.5 rounded-full border border-border/30">
              <Flame size={14} className="text-accent-orange" />
              <span className="text-sm font-bold text-foreground">{streak}d</span>
            </div>

            {/* Coins */}
            <div className="flex items-center gap-1.5 bg-card-secondary/80 px-3 py-1.5 rounded-full border border-border/30">
              <Coins size={14} className="text-accent-yellow" />
              <span className="text-sm font-bold text-foreground">{coins.toLocaleString()}</span>
              <button className="w-4 h-4 rounded-full bg-accent-yellow/20 hover:bg-accent-yellow/30 flex items-center justify-center transition-colors">
                <Plus size={10} className="text-accent-yellow" />
              </button>
            </div>

            {/* Gems */}
            <div className="flex items-center gap-1.5 bg-card-secondary/80 px-3 py-1.5 rounded-full border border-border/30">
              <Gem size={14} className="text-accent-purple" />
              <span className="text-sm font-bold text-foreground">{gems.toLocaleString()}</span>
              <button className="w-4 h-4 rounded-full bg-accent-purple/20 hover:bg-accent-purple/30 flex items-center justify-center transition-colors">
                <Plus size={10} className="text-accent-purple" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TopStatusBar;