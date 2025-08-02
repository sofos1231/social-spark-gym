import { Play, Star, Crown, Diamond, Flame } from 'lucide-react';

interface MissionNodeAvailableProps {
  missionType: 'chat' | 'video' | 'boss' | 'premium';
  isCurrentMission?: boolean;
  onClick: () => void;
  animationDelay?: number;
}

const MissionNodeAvailable = ({ 
  missionType, 
  isCurrentMission = false, 
  onClick, 
  animationDelay = 0 
}: MissionNodeAvailableProps) => {
  const getIcon = () => {
    if (missionType === 'boss') return <Crown className="w-6 h-6 text-orange-400" />;
    if (missionType === 'premium') return <Diamond className="w-6 h-6 text-purple-400" />;
    if (missionType === 'video') return <Play className="w-6 h-6 text-blue-400" />;
    return <Star className="w-6 h-6 text-primary" />;
  };

  const getNodeStyle = () => {
    const baseClasses = "relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer border-2 transform hover:scale-110 active:scale-95";
    
    if (isCurrentMission) {
      return `${baseClasses} bg-gradient-to-br from-primary to-primary-glow border-primary shadow-glow-primary animate-pulse-glow`;
    }
    
    if (missionType === 'boss') {
      return `${baseClasses} bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-400/60 shadow-glow-orange hover:shadow-glow-orange-intense`;
    }
    if (missionType === 'premium') {
      return `${baseClasses} bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/60 shadow-glow-purple hover:shadow-glow-purple-intense`;
    }
    return `${baseClasses} bg-gradient-to-br from-primary/20 to-primary-glow/20 border-primary/60 shadow-glow-primary hover:shadow-glow-primary-intense`;
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
        
        {/* Special Effects for Boss Missions */}
        {missionType === 'boss' && (
          <>
            <div className="absolute -inset-3 rounded-full">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-orange-400/20 to-red-500/20 animate-spin-slow" />
            </div>
            <div className="absolute top-0 right-0 text-xs">
              <Flame className="w-3 h-3 text-orange-400 animate-bounce" />
            </div>
          </>
        )}
        
        {/* Premium Glow Effect */}
        {missionType === 'premium' && (
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 animate-pulse blur-sm" />
        )}
        
        {/* Current Mission Indicator */}
        {isCurrentMission && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-primary to-primary-glow rounded-full animate-ping" />
        )}
      </div>

      {/* Play Button Overlay for Current Mission */}
      {isCurrentMission && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center animate-bounce-subtle">
            <Play className="w-3 h-3 text-primary fill-current ml-0.5" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionNodeAvailable;