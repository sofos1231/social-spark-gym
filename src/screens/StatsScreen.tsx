import React from 'react';

const StatsScreen = () => {
  return (
    <div className="rn-container min-h-screen pb-24 pt-16">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="rn-text-hero">Your Progress</h1>
          <p className="rn-text-subtitle">Track your improvement journey</p>
        </div>

        {/* Stats Cards */}
        <div className="space-y-4">
          <div className="rn-card">
            <h3 className="rn-text-large text-white mb-2">Total XP</h3>
            <p className="text-3xl font-bold text-[#F97316]">2,480</p>
          </div>

          <div className="rn-card">
            <h3 className="rn-text-large text-white mb-2">Current Streak</h3>
            <p className="text-3xl font-bold text-[#10B981]">7 days</p>
          </div>

          <div className="rn-card">
            <h3 className="rn-text-large text-white mb-2">Skills Practiced</h3>
            <p className="text-3xl font-bold text-[#8B5CF6]">12</p>
          </div>

          <div className="rn-card">
            <h3 className="rn-text-large text-white mb-2">Hours Practiced</h3>
            <p className="text-3xl font-bold text-white">24.5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsScreen;