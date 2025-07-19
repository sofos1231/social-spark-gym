import { useState } from 'react';
import React from 'react';

interface PracticeCardProps {
  id: string;
  title: string;
  icon: React.ElementType;
  theme: 'dating' | 'interview' | 'charisma' | 'speaking';
  xp: number;
  streak: number;
  completedMissions: number;
  totalMissions: number;
  onClick: () => void;
}

const PracticeCard = ({
  id,
  title,
  icon: Icon,
  theme,
  xp,
  streak,
  completedMissions,
  totalMissions,
  onClick
}: PracticeCardProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [shimmerActive, setShimmerActive] = useState(false);

  const progressPercentage = Math.round((completedMissions / totalMissions) * 100);

  const handlePress = () => {
    setIsPressed(true);
    setShimmerActive(true);
    
    // Card sink animation
    setTimeout(() => {
      setIsPressed(false);
      onClick();
    }, 150);

    // Reset shimmer after animation
    setTimeout(() => {
      setShimmerActive(false);
    }, 800);
  };

  return (
    <div
      className={`category-card category-${theme} p-6 h-36 relative overflow-hidden cursor-pointer transition-all duration-200 ${
        isPressed ? 'scale-[0.98] translate-y-1' : ''
      } ${shimmerActive ? 'shimmer-active' : ''}`}
      onClick={handlePress}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Shimmer effect overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full transition-transform duration-700 ${
          shimmerActive ? 'translate-x-full' : ''
        }`}
        style={{ width: '200%' }}
      />
      
      {/* Card content */}
      <div className="relative z-10 h-full flex flex-col justify-between text-white">
        {/* Header row */}
        <div className="flex items-start justify-between">
          {/* Left side - Icon and title */}
          <div className="flex items-center gap-3 flex-1">
            <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
              <Icon size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-lg leading-tight">{title}</h3>
              <div className="flex items-center gap-2 text-sm opacity-90 mt-1">
                <span className="font-medium">{xp.toLocaleString()} XP</span>
              </div>
            </div>
          </div>

          {/* Right side - Streak and missions */}
          <div className="text-right ml-3">
            <div className="flex items-center gap-1 justify-end mb-1">
              <span className="text-yellow-300 text-sm">🔥</span>
              <span className="text-sm font-bold text-yellow-100">{streak}</span>
            </div>
            <div className="text-sm font-bold">
              <span className="text-white/90">{completedMissions}</span>
              <span className="text-white/60">/{totalMissions}</span>
            </div>
            <div className="text-xs opacity-75">missions</div>
          </div>
        </div>

        {/* Progress section */}
        <div className="space-y-2">
          <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-white/70 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm font-bold text-green-200">
              {progressPercentage}% complete
            </div>
            <div className="text-xs opacity-75">
              Level {Math.floor(xp / 500) + 1}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeCard;