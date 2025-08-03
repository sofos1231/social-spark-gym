import React from 'react';

const ShopScreen = () => {
  return (
    <div className="rn-container min-h-screen pb-24 pt-16">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="rn-text-hero">Shop</h1>
          <p className="rn-text-subtitle">Upgrade your learning experience</p>
        </div>

        {/* Shop Items */}
        <div className="space-y-4">
          <div className="rn-card">
            <h3 className="rn-text-large text-white mb-2">Premium Access</h3>
            <p className="rn-text-subtitle mb-4">
              Unlock all features and premium content
            </p>
            <button className="rn-button-primary w-full">
              $9.99/month
            </button>
          </div>

          <div className="rn-card">
            <h3 className="rn-text-large text-white mb-2">XP Booster</h3>
            <p className="rn-text-subtitle mb-4">
              Double your XP for 24 hours
            </p>
            <button className="rn-button-secondary w-full">
              500 XP
            </button>
          </div>

          <div className="rn-card">
            <h3 className="rn-text-large text-white mb-2">Streak Freeze</h3>
            <p className="rn-text-subtitle mb-4">
              Protect your streak for one day
            </p>
            <button className="rn-button-outline w-full">
              200 XP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopScreen;