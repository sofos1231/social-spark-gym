import { Trophy, Star, PlayCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ChapterStartCardProps {
  chapterNumber: number;
  categoryTitle: string;
  description: string;
  totalMissions: number;
  totalXP: number;
  onStartChapter: () => void;
  animationDelay?: number;
}

const ChapterStartCard = ({
  chapterNumber,
  categoryTitle,
  description,
  totalMissions,
  totalXP,
  onStartChapter,
  animationDelay = 0
}: ChapterStartCardProps) => {
  return (
    <Card 
      className="p-6 bg-gradient-to-br from-primary/10 to-primary-glow/5 border-primary/20 shadow-glow-primary animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="text-center space-y-4">
        {/* Chapter Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
          <Trophy className="w-4 h-4" />
          Chapter {chapterNumber}
        </div>
        
        {/* Title */}
        <h2 className="text-2xl font-display font-bold text-foreground">
          {categoryTitle}
        </h2>
        
        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
          {description}
        </p>
        
        {/* Chapter Stats */}
        <div className="flex items-center justify-center gap-6 py-2">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{totalMissions}</div>
            <div className="text-xs text-muted-foreground">Missions</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-lg font-bold text-primary flex items-center justify-center gap-1">
              <Star className="w-4 h-4" />
              {totalXP}
            </div>
            <div className="text-xs text-muted-foreground">Max XP</div>
          </div>
        </div>
        
        {/* Start Button */}
        <Button 
          onClick={onStartChapter}
          className="w-full mt-4"
          size="lg"
        >
          <PlayCircle className="w-5 h-5 mr-2" />
          Start Chapter
        </Button>
      </div>
    </Card>
  );
};

export default ChapterStartCard;