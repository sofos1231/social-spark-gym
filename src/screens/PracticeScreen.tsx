import React from 'react';

const PracticeScreen = () => {
  return (
    <div className="rn-container min-h-screen pb-24 pt-16">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="rn-text-hero">Practice Hub</h1>
          <p className="rn-text-subtitle">Choose your skill to practice</p>
        </div>

        {/* Practice Categories */}
        <div className="space-y-4">
          <button className="rn-card w-full text-left hover:scale-105 transition-transform">
            <h3 className="rn-text-large text-white mb-2">
              Conversation Skills
            </h3>
            <p className="rn-text-subtitle">
              Master the art of engaging conversations
            </p>
          </button>

          <button className="rn-card w-full text-left hover:scale-105 transition-transform">
            <h3 className="rn-text-large text-white mb-2">
              Public Speaking
            </h3>
            <p className="rn-text-subtitle">
              Build confidence in front of audiences
            </p>
          </button>

          <button className="rn-card w-full text-left hover:scale-105 transition-transform">
            <h3 className="rn-text-large text-white mb-2">
              Interview Prep
            </h3>
            <p className="rn-text-subtitle">
              Ace your next job interview
            </p>
          </button>

          <button className="rn-card w-full text-left hover:scale-105 transition-transform">
            <h3 className="rn-text-large text-white mb-2">
              Dating Confidence
            </h3>
            <p className="rn-text-subtitle">
              Improve your dating conversations
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeScreen;