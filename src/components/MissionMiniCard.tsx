import { Clock, Zap, Lock, Crown, Diamond, Flame } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Mission {
  id: number;
  title: string;
  description: string;
  type: 'chat' | 'video' | 'boss' | 'premium';
  duration: string;
  xpReward: number;
  status: 'locked' | 'available' | 'completed' | 'current';
  difficulty: 'easy' | 'medium' | 'hard';
}

interface MissionMiniCardProps {
  mission: Mission;
  position: 'left' | 'right';
  onClick: () => void;
  animationDelay?: number;
}

const MissionMiniCard = ({ mission, position, onClick, animationDelay = 0 }: MissionMiniCardProps) => {
  const getMissionTypeIcon = () => {
    if (mission.type === 'boss') return <Crown className="w-3 h-3 text-orange-400" />;
    if (mission.type === 'premium') return <Diamond className="w-3 h-3 text-purple-400" />;
    if (mission.type === 'video') return <Flame className="w-3 h-3 text-blue-400" />;
    return null;
  };

  const getCardStyle = () => {
    const baseClasses = "p-3 max-w-[200px] cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95 border-0";
    
    if (mission.status === 'locked') {
      return `${baseClasses} bg-muted/10 opacity-50 backdrop-blur-sm`;
    }
    if (mission.status === 'completed') {
      return `${baseClasses} bg-gradient-to-br from-success/20 to-emerald-400/10 shadow-glow-success border border-success/20`;
    }
    if (mission.status === 'current') {
      return `${baseClasses} bg-gradient-to-br from-primary/20 to-primary-glow/10 shadow-glow-primary border border-primary/30 animate-pulse-glow`;
    }
    if (mission.type === 'boss') {
      return `${baseClasses} bg-gradient-to-br from-orange-400/20 to-red-500/10 shadow-glow-orange border border-orange-400/20`;
    }
    if (mission.type === 'premium') {
      return `${baseClasses} bg-gradient-to-br from-purple-400/20 to-pink-500/10 shadow-glow-purple border border-purple-400/20`;
    }
    return `${baseClasses} bg-card/60 shadow-card border border-border/30 backdrop-blur-md`;
  };

  const getTextAlignment = () => {
    return position === 'right' ? 'text-right' : 'text-left';
  };

  const getFlexDirection = () => {
    return position === 'right' ? 'justify-end' : 'justify-start';
  };

  return (
    <Card 
      className={getCardStyle()}
      onClick={onClick}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className={getTextAlignment()}>
        <div className={`flex items-center gap-2 mb-1 ${getFlexDirection()}`}>
          {position === 'right' && getMissionTypeIcon()}
          <h3 className="text-sm font-semibold text-foreground truncate">{mission.title}</h3>
          {position === 'left' && getMissionTypeIcon()}
          {mission.status === 'locked' && <Lock className="w-3 h-3 text-muted-foreground" />}
        </div>
        
        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{mission.description}</p>
        
        <div className={`flex items-center gap-3 text-xs ${getFlexDirection()}`}>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-3 h-3" />
            {mission.duration}
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-secondary" />
            <span className="font-medium text-secondary">{mission.xpReward} XP</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MissionMiniCard;