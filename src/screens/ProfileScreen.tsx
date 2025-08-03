import React from 'react';

const ProfileScreen = () => {
  return (
    <div className="rn-container min-h-screen pb-24 pt-16">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-[#8B5CF6] flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">JD</span>
          </div>
          <h1 className="rn-text-hero">John Doe</h1>
          <p className="rn-text-subtitle">Level 12 Communicator</p>
        </div>

        {/* Profile Options */}
        <div className="space-y-4">
          <button className="rn-card w-full text-left hover:scale-105 transition-transform">
            <h3 className="rn-text-large text-white">Account Settings</h3>
          </button>

          <button className="rn-card w-full text-left hover:scale-105 transition-transform">
            <h3 className="rn-text-large text-white">Notification Preferences</h3>
          </button>

          <button className="rn-card w-full text-left hover:scale-105 transition-transform">
            <h3 className="rn-text-large text-white">Privacy Settings</h3>
          </button>

          <button className="rn-card w-full text-left hover:scale-105 transition-transform">
            <h3 className="rn-text-large text-white">Help & Support</h3>
          </button>

          <button className="w-full p-4 rounded-xl bg-[#EF4444] text-white font-semibold hover:scale-105 transition-transform">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;