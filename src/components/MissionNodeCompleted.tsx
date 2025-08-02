import { CheckCircle, Star, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MissionNodeCompletedProps {
  missionType: 'chat' | 'video' | 'boss' | 'premium';
  xpReward: number;
  onClick: () => void;
  animationDelay?: number;
  showBadge?: boolean;
}

const MissionNodeCompleted = ({ 
  missionType, 
  xpReward, 
  onClick, 
  animationDelay = 0,
  showBadge = false 
}: MissionNodeCompletedProps) => {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (showBadge) {
      const timer = setTimeout(() => setShowParticles(true), animationDelay);
      return () => clearTimeout(timer);
    }
  }, [showBadge, animationDelay]);

  const getIcon = () => {
    if (missionType === 'boss') return <Trophy className="w-6 h-6 text-gold" />;
    if (missionType === 'premium') return <Star className="w-6 h-6 text-gradient-purple" />;
    return <CheckCircle className="w-6 h-6 text-success" />;
  };

  const getNodeStyle = () => {
    const baseClasses = "relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer transform hover:scale-110 active:scale-95";
    
    if (missionType === 'boss') {
      return `${baseClasses} bg-gradient-to-br from-gold to-orange-400 shadow-glow-gold border-2 border-gold/50`;
    }
    if (missionType === 'premium') {
      return `${baseClasses} bg-gradient-to-br from-purple-500 to-pink-500 shadow-glow-purple border-2 border-purple-400/50`;
    }
    return `${baseClasses} bg-gradient-to-br from-success to-emerald-400 shadow-glow-success border-2 border-success/50`;
  };

  return (
    <div className="relative">
      {/* Mission Node */}
      <div 
        className={getNodeStyle()}
        onClick={onClick}
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        {getIcon()}
        
        {/* Ambient Glow */}
        <div className="absolute -inset-2 rounded-full opacity-40 animate-pulse">
          {missionType === 'boss' && (
            <div className="w-full h-full rounded-full bg-gradient-to-r from-gold/30 to-orange-400/30 blur-sm" />
          )}
          {missionType === 'premium' && (
            <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 blur-sm" />
          )}
          {missionType !== 'boss' && missionType !== 'premium' && (
            <div className="w-full h-full rounded-full bg-gradient-to-r from-success/30 to-emerald-400/30 blur-sm" />
          )}
        </div>
      </div>

      {/* XP Badge Popup */}
      {showBadge && (
        <div className="absolute -top-6 -right-2 animate-in zoom-in duration-500 animate-bounce-subtle">
          <div className="bg-gradient-to-r from-gold to-orange-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-glow-gold border border-gold/50">
            +{xpReward}XP
          </div>
        </div>
      )}

      {/* Particle Burst Effect */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gold rounded-full animate-particle-burst"
              style={{
                top: '50%',
                left: '50%',
                animationDelay: `${i * 50}ms`,
                transform: `rotate(${i * 60}deg)`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MissionNodeCompleted;