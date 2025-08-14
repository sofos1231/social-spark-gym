import React from 'react';
import { cn } from '@/lib/utils';

interface SegmentedProgressProps {
  completed: number;
  total: number;
  showMilestones?: boolean;
  className?: string;
}

const SegmentedProgress: React.FC<SegmentedProgressProps> = ({
  completed,
  total,
  showMilestones = true,
  className = ""
}) => {
  const segments = Array.from({ length: total }, (_, i) => i < completed);
  const progressPercentage = (completed / total) * 100;

  return (
    <div className={cn("space-y-2", className)}>
      {/* Segmented Rail */}
      <div className="flex gap-1">
        {segments.map((isCompleted, index) => (
          <div
            key={index}
            className={cn(
              "h-2 flex-1 rounded-full transition-all duration-300",
              isCompleted
                ? "bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] shadow-sm animate-shimmer-subtle"
                : "bg-white/14"
            )}
            style={{
              animationDelay: isCompleted ? `${index * 90}ms` : '0ms'
            }}
          />
        ))}
      </div>

      {/* Milestone Labels */}
      {showMilestones && (
        <div className="flex justify-between text-xs font-medium">
          <span className="text-white/64">Start</span>
          <span className={cn(
            "transition-colors duration-300",
            progressPercentage >= 50 ? "text-white" : "text-white/64"
          )}>
            Halfway
          </span>
          <span className={cn(
            "transition-colors duration-300",
            progressPercentage === 100 ? "text-white font-semibold" : "text-white/64"
          )}>
            Complete
          </span>
        </div>
      )}
    </div>
  );
};

export default SegmentedProgress;