import { Trophy, Flame, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface ProgressTopStickyBarProps {
  categoryTitle: string;
  chapterNumber: number;
  completedMissions: number;
  totalMissions: number;
  totalXP: number;
  streakCount?: number;
  onBackClick: () => void;
}

const ProgressTopStickyBar = ({
  categoryTitle,
  chapterNumber,
  completedMissions,
  totalMissions,
  totalXP,
  streakCount = 0,
  onBackClick
}: ProgressTopStickyBarProps) => {
  const progressPercentage = (completedMissions / totalMissions) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="px-4 py-3">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackClick}
            className="text-foreground hover:bg-muted/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center">
            <h1 className="text-lg font-display font-bold text-foreground">{categoryTitle}</h1>
            <p className="text-xs text-muted-foreground">Chapter {chapterNumber}</p>
          </div>
          
          <div className="w-16" />
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            {/* Completion Progress */}
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-foreground">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            
            {/* Streak */}
            {streakCount > 0 && (
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-medium text-foreground">
                  {streakCount}
                </span>
              </div>
            )}
            
            {/* XP Earned */}
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {totalXP} XP
              </span>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            {completedMissions}/{totalMissions} missions
          </div>
        </div>

        {/* Progress Bar */}
        <Progress 
          value={progressPercentage} 
          className="h-2 bg-muted"
        />
      </div>
    </div>
  );
};

export default ProgressTopStickyBar;