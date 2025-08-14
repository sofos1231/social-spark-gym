import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SegmentedProgressProps {
  completed: number;
  total: number;
  showMilestones?: boolean;
  onToggleMilestones?: () => void;
  className?: string;
}

const SegmentedProgress: React.FC<SegmentedProgressProps> = ({
  completed,
  total,
  showMilestones = false,
  onToggleMilestones,
  className = ""
}) => {
  const segments = Array.from({ length: total }, (_, i) => i < completed);
  const progressPercentage = (completed / total) * 100;

  return (
    <div className={cn("space-y-2", className)}>
      {/* Segmented Rail with Toggle Button */}
      <div className="relative">
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
        
        {/* Drag Down Button */}
        {onToggleMilestones && (
          <button
            onClick={onToggleMilestones}
            className={cn(
              "absolute -bottom-1 left-1/2 transform -translate-x-1/2 translate-y-full",
              "w-6 h-6 rounded-full",
              "backdrop-blur-[20px] bg-white/[0.08]",
              "border border-white/[0.12]",
              "flex items-center justify-center",
              "transition-all duration-200",
              "hover:bg-white/[0.12] hover:border-white/[0.16]",
              "active:scale-[0.95]"
            )}
          >
            <ChevronDown 
              className={cn(
                "w-3 h-3 text-white/70 transition-transform duration-200",
                showMilestones && "rotate-180"
              )} 
            />
          </button>
        )}
      </div>

      {/* Milestone Labels - Collapsible */}
      {showMilestones && (
        <div 
          className={cn(
            "flex justify-between text-xs font-medium pt-2",
            "animate-in slide-in-from-top-2 duration-200"
          )}
        >
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