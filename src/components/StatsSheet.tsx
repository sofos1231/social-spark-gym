import React from 'react';
import { X, Flame, TrendingUp, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KpiTileProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
}

const KpiTile: React.FC<KpiTileProps> = ({ title, value, icon, trend }) => (
  <div className="bg-white/[0.06] backdrop-blur-[20px] border border-white/[0.08] rounded-2xl p-4">
    <div className="flex items-center justify-between mb-2">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#A855F7] p-1.5">
        {icon}
      </div>
      {trend && (
        <span className="text-xs font-medium text-emerald-400">
          {trend}
        </span>
      )}
    </div>
    <div className="text-2xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-white/64">{title}</div>
  </div>
);

interface StatsSheetProps {
  chapterId?: string;
  completedMissions: number;
  totalMissions: number;
  totalXP: number;
  onClose: () => void;
  isOpen: boolean;
}

const StatsSheet: React.FC<StatsSheetProps> = ({
  completedMissions,
  totalMissions,
  totalXP,
  onClose,
  isOpen
}) => {
  if (!isOpen) return null;

  const completionPercentage = Math.round((completedMissions / totalMissions) * 100);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-black/35 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "bg-[rgba(10,15,31,0.85)] backdrop-blur-[20px]",
        "border-t border-white/[0.08]",
        "rounded-t-3xl p-6 pb-8",
        "transition-all duration-300",
        isOpen ? "translate-y-0" : "translate-y-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Chapter Stats</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white hover:bg-white/[0.1] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <KpiTile
            title="Completion"
            value={`${completionPercentage}%`}
            icon={<Target className="w-full h-full text-white" />}
            trend="+12%"
          />
          <KpiTile
            title="Missions"
            value={`${completedMissions}/${totalMissions}`}
            icon={<TrendingUp className="w-full h-full text-white" />}
          />
          <KpiTile
            title="Total XP"
            value={totalXP.toString()}
            icon={<Flame className="w-full h-full text-white" />}
            trend="+45"
          />
          <KpiTile
            title="Confidence"
            value="78%"
            icon={<Target className="w-full h-full text-white" />}
            trend="+8%"
          />
        </div>

        {/* Trends Row */}
        <div className="space-y-4 mb-6">
          <div className="bg-white/[0.06] backdrop-blur-[20px] border border-white/[0.08] rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white/64">XP per day (7d)</span>
              <div className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-medium text-white">5 day streak</span>
              </div>
            </div>
            <div className="h-8 bg-gradient-to-r from-[#8B5CF6]/20 to-[#A855F7]/20 rounded-lg"></div>
          </div>
        </div>

        {/* Footer */}
        <div className="space-y-3">
          <button className="w-full py-3 text-center text-sm font-medium text-[#8B5CF6] hover:text-[#A855F7] transition-colors">
            View full stats →
          </button>
          
          <div className="flex gap-2 justify-center">
            {['All', 'This chapter', 'Last 7d'].map((filter, index) => (
              <button
                key={filter}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                  index === 1
                    ? "bg-[#8B5CF6] text-white"
                    : "bg-white/[0.06] text-white/64 hover:bg-white/[0.1] hover:text-white"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsSheet;