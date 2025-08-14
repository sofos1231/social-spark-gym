import { useState, useEffect } from 'react';
import { Coins, Gem, Flame, Trophy, Plus } from 'lucide-react';
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

  const handleShopClick = () => {
    // Navigate to shop when + button is clicked
    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    console.log('Opening shop...');
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

  return null;
};

export default TopStatusBar;