import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import SegmentedProgress from './SegmentedProgress';
import StatsButton from './StatsButton';
import StatsSheet from './StatsSheet';

interface ProgressTopBarProps {
  title: string;
  chapterNumber: number;
  completedMissions: number;
  totalMissions: number;
  totalXP: number;
  icon: React.ComponentType<{ className?: string }>;
  onBack: () => void;
  className?: string;
}

const ProgressTopBar: React.FC<ProgressTopBarProps> = ({
  title,
  chapterNumber,
  completedMissions,
  totalMissions,
  totalXP,
  icon: CategoryIcon,
  onBack,
  className = ""
}) => {
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isMilestonesExpanded, setIsMilestonesExpanded] = useState(false);
  const remainingMissions = totalMissions - completedMissions;

  return (
    <>
      <div 
        className={cn(
          "fixed top-0 left-0 right-0 z-40 px-4 pt-3 pb-4",
          // Glass styling with backdrop blur
          "backdrop-blur-[20px] bg-[rgba(10,15,31,0.45)]",
          "border-b border-white/[0.06]",
          // Subtle shadow
          "shadow-[0_12px_32px_rgba(0,0,0,0.28)]",
          className
        )}
      >
        {/* Header Row - Back button only */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
        </div>

        {/* Title Stack and Stats Button - Above Progress Bar */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-left">
            <h2 className="text-[22px] font-semibold text-white tracking-[-0.01em] leading-tight">
              {completedMissions}/{totalMissions} Missions
            </h2>
            <p className="text-[13px] text-white/64 font-medium">
              {remainingMissions} remaining · Chapter {chapterNumber}
            </p>
          </div>
          
          {/* Stats Button */}
          <StatsButton 
            onPress={() => setIsStatsOpen(true)}
          />
        </div>

        {/* Segmented Progress */}
        <SegmentedProgress
          completed={completedMissions}
          total={totalMissions}
          showMilestones={isMilestonesExpanded}
          onToggleMilestones={() => setIsMilestonesExpanded(!isMilestonesExpanded)}
        />
      </div>

      {/* Stats Sheet */}
      <StatsSheet
        completedMissions={completedMissions}
        totalMissions={totalMissions}
        totalXP={totalXP}
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
      />
    </>
  );
};

export default ProgressTopBar;