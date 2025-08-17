import React from 'react';
import { X, Heart, Info, Flame, Star, MessageCircle } from 'lucide-react';

// SG/SparkSwipe/Components Library
export const SparkComponentsPanel = () => {
  return (
    <div className="spark-background min-h-screen p-8 space-y-8">
      <h1 className="text-3xl font-bold text-white">Spark Swipe Components</h1>
      
      {/* Progress Dots */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">SG/SparkSwipe/ProgressDots</h2>
        <div className="flex items-center gap-2">
          <div className="spark-progress-dot-active"></div>
          <div className="spark-progress-dot-active"></div>
          <div className="spark-progress-dot"></div>
          <div className="spark-progress-dot"></div>
          <div className="spark-progress-dot"></div>
        </div>
      </section>

      {/* Profile Card */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">SG/SparkSwipe/ProfileCard</h2>
        <div className="spark-card w-80 h-96 p-6 mx-auto">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-3xl">
            😊
          </div>
          <h3 className="text-2xl font-semibold text-center text-white mb-2">Alex</h3>
          <div className="flex gap-2 justify-center mb-4">
            <div className="spark-glass px-3 py-1 text-sm text-white">Witty</div>
            <div className="spark-glass px-3 py-1 text-sm text-white">Easy</div>
          </div>
          <p className="text-center text-white/90 text-base">Let's practice small talk at a coffee shop.</p>
        </div>
      </section>

      {/* Overlay Labels */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">SG/SparkSwipe/OverlayLabels</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="spark-overlay spark-overlay-match opacity-80 w-32 h-32 relative">
            <div className="text-center">
              <div className="text-2xl mb-2">💚</div>
              <div className="text-lg font-bold text-white">MATCH</div>
            </div>
          </div>
          <div className="spark-overlay spark-overlay-pass opacity-80 w-32 h-32 relative">
            <div className="text-center">
              <div className="text-2xl mb-2">💔</div>
              <div className="text-lg font-bold text-white">PASS</div>
            </div>
          </div>
          <div className="spark-overlay spark-overlay-super opacity-80 w-32 h-32 relative">
            <div className="text-center">
              <div className="text-2xl mb-2">💙</div>
              <div className="text-lg font-bold text-white">SUPER</div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Bar */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">SG/SparkSwipe/ActionBar</h2>
        <div className="flex items-center justify-center gap-6">
          <button className="spark-action-pill text-red-400">
            <X size={24} />
          </button>
          <button className="spark-action-pill text-blue-400">
            <Info size={24} />
          </button>
          <button className="spark-action-pill text-green-400">
            <Heart size={24} />
          </button>
        </div>
      </section>

      {/* Primary CTA */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">SG/SparkSwipe/PrimaryCTA</h2>
        <button className="spark-mint-cta px-8 py-4 w-full max-w-sm mx-auto block">
          Begin First Mission
        </button>
      </section>

      {/* Info Sheet */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">SG/SparkSwipe/InfoSheet</h2>
        <div className="spark-glass w-full max-w-md mx-auto p-6 rounded-t-3xl">
          <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-6"></div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-2xl">
              😊
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Alex</h3>
            <p className="text-white/80 text-sm">Practice partner details...</p>
          </div>
        </div>
      </section>

      {/* Match Modal */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">SG/SparkSwipe/MatchModal</h2>
        <div className="spark-glass max-w-sm w-full mx-auto p-8 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-4">It's a Match!</h2>
          <p className="text-white/80 mb-6">You and Alex are ready to practice together.</p>
          <button className="spark-mint-cta w-full">Begin First Mission</button>
        </div>
      </section>

      {/* Toast */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">SG/SparkSwipe/Toast</h2>
        <div className="spark-glass px-4 py-3 w-fit mx-auto">
          <p className="text-white text-sm">Reconnecting...</p>
        </div>
      </section>

      {/* Hint Ghost Button */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">SG/SparkSwipe/HintGhostButton</h2>
        <div className="relative w-64 h-32 mx-auto bg-white/5 rounded-lg">
          <div className="spark-hint-ghost">
            Try swiping →
          </div>
        </div>
      </section>

      {/* 3D Orb */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">SG/SparkSwipe/Orb</h2>
        <div className="relative w-32 h-32 mx-auto">
          <div className="w-full h-full rounded-full spark-orb"></div>
          <div className="absolute inset-4 rounded-full bg-white/20 blur-sm"></div>
        </div>
      </section>

      {/* State Variations */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Component States</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-white/80 text-sm mb-2">Default Button</p>
            <button className="spark-mint-cta px-4 py-2 w-full">Default</button>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-2">Pressed (96%)</p>
            <button className="spark-mint-cta px-4 py-2 w-full scale-96">Pressed</button>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-2">Disabled</p>
            <button className="spark-mint-cta px-4 py-2 w-full opacity-50" disabled>Disabled</button>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-2">Loading</p>
            <button className="spark-mint-cta px-4 py-2 w-full">Loading...</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SparkComponentsPanel;