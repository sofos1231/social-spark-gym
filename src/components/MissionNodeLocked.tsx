import { Lock, Crown, Diamond } from 'lucide-react';

interface MissionNodeLockedProps {
  missionType: 'chat' | 'video' | 'boss' | 'premium';
  animationDelay?: number;
}

const MissionNodeLocked = ({ missionType, animationDelay = 0 }: MissionNodeLockedProps) => {
  const getIcon = () => {
    if (missionType === 'boss') return <Crown className="w-5 h-5 text-muted-foreground/60" />;
    if (missionType === 'premium') return <Diamond className="w-5 h-5 text-muted-foreground/60" />;
    return <Lock className="w-5 h-5 text-muted-foreground/60" />;
  };

  const getNodeStyle = () => {
    const baseClasses = "relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border-2";
    
    if (missionType === 'boss') {
      return `${baseClasses} bg-muted/20 border-muted/30 shadow-subtle`;
    }
    if (missionType === 'premium') {
      return `${baseClasses} bg-muted/20 border-muted/30 shadow-subtle`;
    }
    return `${baseClasses} bg-muted/10 border-muted/20 shadow-subtle`;
  };

  return (
    <div className="relative">
      {/* Mission Node */}
      <div 
        className={getNodeStyle()}
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        {getIcon()}
        
        {/* Subtle Coming Soon Glow */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-muted/10 to-muted/5 opacity-50 animate-pulse" />
      </div>

      {/* Lock Indicator */}
      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-muted/80 rounded-full flex items-center justify-center">
        <Lock className="w-3 h-3 text-muted-foreground" />
      </div>
    </div>
  );
};

export default MissionNodeLocked;