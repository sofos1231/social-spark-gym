import { useState, useEffect } from 'react';
import { Share2, Download, MessageCircle, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface StreakFireButtonProps {
  streak: number;
  weeklyXP: number;
  currentLevel: number;
  levelTitle: string;
}

const StreakFireButton = ({ streak, weeklyXP, currentLevel, levelTitle }: StreakFireButtonProps) => {
  const [tapCount, setTapCount] = useState(0);
  const [isExploding, setIsExploding] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [flameSize, setFlameSize] = useState(1);
  const [isShaking, setIsShaking] = useState(false);

  const handleTap = () => {
    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);
    
    // Increase flame size with each tap
    setFlameSize(1 + (newTapCount * 0.2));
    
    // Start shaking after 3 taps
    if (newTapCount >= 3) {
      setIsShaking(true);
    }

    // Trigger explosion after 7 taps
    if (newTapCount >= 7) {
      triggerExplosion();
    }

    // Reset tap count after 2 seconds of inactivity
    setTimeout(() => {
      if (tapCount === newTapCount - 1) {
        setTapCount(0);
        setFlameSize(1);
        setIsShaking(false);
      }
    }, 2000);
  };

  const triggerExplosion = () => {
    setIsExploding(true);
    
    // Create fire emoji explosion effect
    const container = document.querySelector('.fire-explosion-container');
    if (container) {
      for (let i = 0; i < 12; i++) {
        const emoji = document.createElement('div');
        emoji.innerHTML = '🔥';
        emoji.style.position = 'absolute';
        emoji.style.fontSize = '24px';
        emoji.style.zIndex = '50';
        emoji.style.pointerEvents = 'none';
        emoji.style.left = '50%';
        emoji.style.top = '50%';
        emoji.style.transform = 'translate(-50%, -50%)';
        emoji.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        container.appendChild(emoji);

        // Animate explosion
        setTimeout(() => {
          const angle = (i / 12) * 360;
          const distance = 80 + Math.random() * 40;
          const radian = (angle * Math.PI) / 180;
          const x = Math.cos(radian) * distance;
          const y = Math.sin(radian) * distance;
          
          emoji.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0.5) rotate(${angle}deg)`;
          emoji.style.opacity = '0';
        }, 50);

        // Remove emoji after animation
        setTimeout(() => {
          emoji.remove();
        }, 1100);
      }
    }

    // Show share modal after explosion
    setTimeout(() => {
      setIsExploding(false);
      setShowShareModal(true);
      setTapCount(0);
      setFlameSize(1);
      setIsShaking(false);
    }, 1000);
  };

  const handleShare = (platform: string) => {
    const message = `🔥 I'm on a ${streak}-day streak in SocialGym! Building confidence one conversation at a time. 💪`;
    
    switch (platform) {
      case 'instagram':
        // In a real app, this would open Instagram with the story template
        navigator.share?.({ text: message });
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'download':
        // In a real app, this would download the streak card as an image
        alert('Streak card downloaded! 📸');
        break;
      default:
        navigator.share?.({ text: message });
    }
    setShowShareModal(false);
  };

  return (
    <>
      {/* Fire Explosion Container */}
      <div className="fire-explosion-container absolute inset-0 pointer-events-none" />
      
      {/* Streak Button */}
      <div 
        className={`
          relative cursor-pointer transition-all duration-300
          ${isShaking ? 'animate-bounce-subtle' : ''}
          ${tapCount > 0 ? 'scale-105' : 'hover:scale-105'}
        `}
        onClick={handleTap}
      >
        <div className={`
          flex-shrink-0 animate-scale-in p-4 rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-300
          bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-xl shadow-orange-500/25
          hover:shadow-2xl relative overflow-hidden
        `}>
          {/* Background Heat Effect */}
          {tapCount > 3 && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-600 animate-pulse opacity-50" />
          )}
          
          {/* Main Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span 
                className="text-lg filter drop-shadow-sm transition-all duration-300"
                style={{ 
                  transform: `scale(${flameSize})`,
                  filter: tapCount > 0 ? 'drop-shadow(0 0 8px rgba(255,165,0,0.8))' : 'drop-shadow-sm'
                }}
              >
                🔥
              </span>
              <span className="text-sm font-bold drop-shadow-sm">
                {streak} Day Streak
              </span>
            </div>
            <div className="text-xs opacity-90 drop-shadow-sm">
              Keep the fire burning!
            </div>
          </div>

          {/* Flame Glow Effect */}
          {tapCount > 0 && (
            <div 
              className="absolute inset-0 rounded-xl"
              style={{
                background: 'radial-gradient(circle, rgba(255,165,0,0.4) 0%, rgba(255,69,0,0.2) 50%, transparent 70%)',
                transform: `scale(${1 + tapCount * 0.1})`,
                animation: tapCount > 5 ? 'pulse 0.5s infinite' : 'none'
              }}
            />
          )}
        </div>

        {/* Tap Counter Display */}
        {tapCount > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-warning rounded-full flex items-center justify-center text-xs font-bold text-white animate-xp-pop">
            {tapCount}
          </div>
        )}
      </div>

      {/* Share Modal */}
      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="mx-4 rounded-xl border-0 bg-gradient-to-br from-orange-50 to-red-50 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-display font-bold text-gradient-xp">
              🔥 You're on Fire! 🔥
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Streak Card */}
            <div className="bg-gradient-to-br from-orange-400 to-red-500 p-6 rounded-xl text-white text-center relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-4xl mb-2">🔥</div>
                <h3 className="text-2xl font-bold mb-1">{streak} Day Streak!</h3>
                <p className="text-orange-100 mb-4">Keep going, Social Warrior!</p>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold">{weeklyXP}</div>
                    <div className="text-xs text-orange-200">Weekly XP</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">Level {currentLevel}</div>
                    <div className="text-xs text-orange-200">{levelTitle}</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">{streak}</div>
                    <div className="text-xs text-orange-200">Day Streak</div>
                  </div>
                </div>
              </div>
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-2 left-4 text-2xl">🔥</div>
                <div className="absolute top-8 right-8 text-lg">🔥</div>
                <div className="absolute bottom-4 left-8 text-xl">🔥</div>
                <div className="absolute bottom-8 right-4 text-lg">🔥</div>
              </div>
            </div>

            {/* Share Options */}
            <div className="space-y-3">
              <h4 className="font-semibold text-center text-foreground">Share Your Achievement</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => handleShare('instagram')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram Story
                </Button>
                
                <Button
                  onClick={() => handleShare('whatsapp')}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                
                <Button
                  onClick={() => handleShare('download')}
                  variant="outline"
                  className="col-span-2"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Save Image
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StreakFireButton;