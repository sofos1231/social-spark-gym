import React from 'react';

// SG/SparkSwipe/TokensPanel - Visual Design System Reference
export const SparkTokensPanel = () => {
  return (
    <div className="p-8 space-y-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Spark Swipe Design Tokens</h1>
      
      {/* Colors */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-20 h-20 rounded-lg mb-2" style={{ background: '#9A1B8F' }}></div>
            <p className="text-sm">#9A1B8F</p>
            <p className="text-xs text-gray-400">Magenta Start</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 rounded-lg mb-2" style={{ background: '#5B2E8C' }}></div>
            <p className="text-sm">#5B2E8C</p>
            <p className="text-xs text-gray-400">Purple Mid</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 rounded-lg mb-2" style={{ background: '#102346' }}></div>
            <p className="text-sm">#102346</p>
            <p className="text-xs text-gray-400">Navy End</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 rounded-lg mb-2" style={{ background: 'linear-gradient(135deg, #9BE8DA, #59C9B8)' }}></div>
            <p className="text-sm">Mint CTA</p>
            <p className="text-xs text-gray-400">#9BE8DA → #59C9B8</p>
          </div>
        </div>
      </section>

      {/* Glass Effects */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Glass Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="spark-glass p-4 text-center">
            <p className="font-medium">Card Glass</p>
            <p className="text-xs text-gray-300">blur(24px) + shadow</p>
          </div>
          <div className="spark-action-pill">
            <span>Action Pill</span>
          </div>
          <div className="spark-glass px-4 py-2 inline-block">
            <span className="text-sm">Chip Glass</span>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Typography</h2>
        <div className="space-y-2">
          <div className="text-3xl font-semibold">H1 30px/semibold</div>
          <div className="text-2xl font-semibold">H2 22px/semibold</div>
          <div className="text-base font-medium">Body 16px/medium</div>
          <div className="text-sm font-medium">Caption 13px/medium</div>
        </div>
      </section>

      {/* Shadows & Effects */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Shadows & Effects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 p-4 rounded-lg" style={{ boxShadow: '0 12px 28px rgba(0,0,0,.35)' }}>
            <p className="text-sm">Glass Shadow</p>
            <p className="text-xs text-gray-400">0 12px 28px rgba(0,0,0,.35)</p>
          </div>
          <div className="bg-green-500/20 p-4 rounded-lg" style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.6)' }}>
            <p className="text-sm">Match Glow</p>
            <p className="text-xs text-gray-400">Green + blur</p>
          </div>
          <div className="bg-red-500/20 p-4 rounded-lg" style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)' }}>
            <p className="text-sm">Pass Glow</p>
            <p className="text-xs text-gray-400">Red + blur</p>
          </div>
        </div>
      </section>

      {/* Animations */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Motion Specs</h2>
        <div className="space-y-2 text-sm">
          <div><strong>Card Toss:</strong> 240-320ms cubic-bezier(0.22,1,0.36,1)</div>
          <div><strong>Button Press:</strong> 120ms scale(0.96)</div>
          <div><strong>Progress Glow:</strong> 80ms ease-out</div>
          <div><strong>Confetti:</strong> 600ms ease-out</div>
          <div><strong>Orb Float:</strong> 4s ease-in-out infinite</div>
        </div>
      </section>

      {/* Interactive States */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Button States</h2>
        <div className="space-y-4">
          <button className="spark-mint-cta px-8 py-3">Primary CTA (Mint)</button>
          <button className="spark-action-pill">Action Pill</button>
          <button className="spark-glass px-4 py-2">Ghost Button</button>
        </div>
      </section>
    </div>
  );
};

export default SparkTokensPanel;