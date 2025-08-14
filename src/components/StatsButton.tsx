import React from 'react';
import { BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsButtonProps {
  onPress: () => void;
  className?: string;
}

const StatsButton: React.FC<StatsButtonProps> = ({
  onPress,
  className = ""
}) => {
  return (
    <button
      onClick={onPress}
      className={cn(
        // Glass base styling
        "px-4 py-2 rounded-full",
        "backdrop-blur-[20px] bg-white/[0.06]",
        "border border-white/[0.08]",
        
        // Content styling
        "flex items-center gap-2",
        "text-sm font-medium text-white",
        
        // Hover and press states
        "transition-all duration-200",
        "hover:bg-white/[0.1] hover:border-white/[0.12]",
        "hover:shadow-[0_0_20px_rgba(139,92,246,0.35)]",
        "active:scale-[0.98] active:shadow-[0_0_30px_rgba(139,92,246,0.5)]",
        
        // Focus states
        "focus:outline-none focus:ring-2 focus:ring-white/20",
        
        className
      )}
    >
      <div className="w-4 h-4 rounded-sm bg-gradient-to-br from-[#8B5CF6] to-[#A855F7] p-0.5 shadow-sm">
        <BarChart3 className="w-full h-full text-white" strokeWidth={2.5} />
      </div>
      <span>Stats</span>
    </button>
  );
};

export default StatsButton;