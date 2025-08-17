import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Heart, Info, Flame, Star, MessageCircle, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// SG/SparkSwipe/* Components
const SparkProgressDots = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
  <div className="flex items-center gap-2">
    {Array.from({ length: totalSteps }, (_, i) => (
      <div 
        key={i} 
        className={i <= currentStep ? 'spark-progress-dot-active' : 'spark-progress-dot'}
      />
    ))}
  </div>
);

const SparkProfileCard = ({ 
  profile, 
  isTop = false, 
  dragState, 
  style,
  onDragStart,
  onDragMove,
  onDragEnd 
}: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isTop) return;
    setIsDragging(true);
    onDragStart?.(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isTop) return;
    onDragMove?.(e);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || !isTop) return;
    setIsDragging(false);
    onDragEnd?.(e);
  };

  return (
    <div 
      ref={cardRef}
      className={`spark-card w-80 h-96 p-6 ${isTop ? 'cursor-grab active:cursor-grabbing' : ''} ${isDragging ? 'spark-card-dragging' : ''}`}
      style={style}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Drag Overlays */}
      {isTop && dragState && (
        <div className={`spark-overlay spark-overlay-${dragState.type}`} style={{ opacity: dragState.opacity }}>
          <div className="text-center">
            <div className="text-4xl mb-2">
              {dragState.type === 'match' && '💚'}
              {dragState.type === 'pass' && '💔'}
              {dragState.type === 'super' && '💙'}
            </div>
            <div className="text-2xl font-bold text-white uppercase tracking-wider">
              {dragState.type === 'match' && 'Match'}
              {dragState.type === 'pass' && 'Pass'}
              {dragState.type === 'super' && 'Superlike'}
            </div>
          </div>
        </div>
      )}
      
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-3xl">
        {profile.avatar}
      </div>
      
      {/* Name */}
      <h3 className="text-2xl font-semibold text-center text-white mb-2">{profile.name}</h3>
      
      {/* Chips */}
      <div className="flex gap-2 justify-center mb-4">
        <div className="spark-glass px-3 py-1 text-sm text-white">{profile.vibe}</div>
        <div className="spark-glass px-3 py-1 text-sm text-white">{profile.difficulty}</div>
      </div>
      
      {/* Prompt */}
      <p className="text-center text-white/90 text-base leading-relaxed">{profile.prompt}</p>
    </div>
  );
};

const SparkActionBar = ({ onAction }: { onAction: (action: string) => void }) => (
  <div className="flex items-center justify-center gap-6">
    <button className="spark-action-pill text-red-400 hover:text-red-300" onClick={() => onAction('pass')}>
      <X size={24} />
    </button>
    <button className="spark-action-pill text-blue-400 hover:text-blue-300" onClick={() => onAction('info')}>
      <Info size={24} />
    </button>
    <button className="spark-action-pill text-green-400 hover:text-green-300" onClick={() => onAction('like')}>
      <Heart size={24} />
    </button>
  </div>
);

const SparkMatchModal = ({ isOpen, onClose, profile }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <div 
            key={i}
            className="absolute w-3 h-3 rounded-full animate-spark-confetti"
            style={{
              background: ['#9BE8DA', '#FF5B8A', '#FFB36B', '#C06BFF'][i % 4],
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 500}ms`
            }}
          />
        ))}
      </div>
      
      <div className="spark-glass max-w-sm w-full mx-4 p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-white mb-4">It's a Match!</h2>
        <p className="text-white/80 mb-6">You and {profile?.name} are ready to practice together.</p>
        
        <div className="space-y-3">
          <Button className="spark-mint-cta w-full" onClick={onClose}>
            Begin First Mission
          </Button>
          <button className="text-white/60 text-sm hover:text-white/80 transition-colors">
            Preview profile
          </button>
        </div>
      </div>
    </div>
  );
};

const SparkInfoSheet = ({ isOpen, onClose, profile }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/30 backdrop-blur-sm">
      <div className="spark-glass w-full max-w-md mx-4 mb-4 p-6 rounded-t-3xl">
        <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-6"></div>
        
        <div className="text-center">
          <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-4xl">
            {profile?.avatar}
          </div>
          
          <h3 className="text-2xl font-semibold text-white mb-2">{profile?.name}</h3>
          
          <div className="flex gap-2 justify-center mb-4">
            <div className="spark-glass px-3 py-1 text-sm text-white">{profile?.vibe}</div>
            <div className="spark-glass px-3 py-1 text-sm text-white">{profile?.difficulty}</div>
            <div className="spark-glass px-3 py-1 text-sm text-white">~2m</div>
          </div>
          
          <p className="text-white/80 mb-6">{profile?.prompt}</p>
          
          <Button 
            variant="ghost" 
            className="w-full text-white/60 hover:text-white"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

const SparkOrb = () => (
  <div className="relative w-32 h-32 mx-auto mb-8">
    <div className="w-full h-full rounded-full spark-orb"></div>
    <div className="absolute inset-4 rounded-full bg-white/20 blur-sm"></div>
  </div>
);

// Mock Data
const mockProfiles = [
  {
    id: 1,
    name: "Alex",
    avatar: "😊",
    vibe: "Witty",
    difficulty: "Easy",
    prompt: "Let's practice small talk at a coffee shop."
  },
  {
    id: 2,
    name: "Sam",
    avatar: "🌟",
    vibe: "Confident",
    difficulty: "Medium",
    prompt: "Help me nail this job interview conversation."
  },
  {
    id: 3,
    name: "Taylor",
    avatar: "💼",
    vibe: "Professional",
    difficulty: "Hard",
    prompt: "Practice networking at a business event."
  }
];

export default function SparkSwipe() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentScreen, setCurrentScreen] = useState('entry'); // entry, deck, match, end
  const [currentStep, setCurrentStep] = useState(0);
  const [profiles] = useState(mockProfiles);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [dragState, setDragState] = useState<any>(null);
  const [showHint, setShowHint] = useState(false);
  const [showInfoSheet, setShowInfoSheet] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<any>(null);

  // Show hint after 2s of inactivity
  useEffect(() => {
    if (currentScreen === 'deck') {
      const timer = setTimeout(() => setShowHint(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen, currentCardIndex]);

  const handleDragStart = (e: React.MouseEvent) => {
    setShowHint(false);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    let type = null;
    let opacity = 0;

    if (Math.abs(deltaX) > 96) {
      type = deltaX > 0 ? 'match' : 'pass';
      opacity = Math.min((Math.abs(deltaX) - 96) / 96, 1);
    } else if (deltaY < -120) {
      type = 'super';
      opacity = Math.min((Math.abs(deltaY) - 120) / 96, 1);
    }

    setDragState(type ? { type, opacity } : null);
  };

  const handleDragEnd = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    let action = null;
    
    if (deltaX > 96) action = 'like';
    else if (deltaX < -96) action = 'pass';
    else if (deltaY < -120) action = 'superlike';

    setDragState(null);

    if (action) {
      handleAction(action);
    }
  };

  const handleAction = (action: string) => {
    const currentProfile = profiles[currentCardIndex];
    
    switch (action) {
      case 'like':
        // Simulate match
        setMatchedProfile(currentProfile);
        setShowMatchModal(true);
        break;
        
      case 'pass':
        nextCard();
        break;
        
      case 'superlike':
        setMatchedProfile(currentProfile);
        setShowMatchModal(true);
        break;
        
      case 'info':
        setShowInfoSheet(true);
        break;
    }
  };

  const nextCard = () => {
    if (currentCardIndex < profiles.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowHint(false);
    } else {
      setCurrentScreen('end');
    }
  };

  const handleMatchModalClose = () => {
    setShowMatchModal(false);
    setMatchedProfile(null);
    setCurrentScreen('start-chat');
  };

  const startSwiping = () => {
    setCurrentScreen('deck');
    setCurrentStep(1);
  };

  const skipToMain = () => {
    navigate('/');
  };

  const beginMission = () => {
    navigate('/quick-drill');
  };

  // Screen Components
  const renderEntry = () => (
    <div className="text-center px-6">
      <SparkOrb />
      <h1 className="text-3xl font-semibold text-white mb-3 leading-tight">Spark Swipe</h1>
      <p className="text-white/80 text-base mb-8">Learn swiping in seconds.</p>
      <Button className="spark-mint-cta w-full mb-4" onClick={startSwiping}>
        Start Swiping
      </Button>
    </div>
  );

  const renderDeck = () => (
    <div className="px-6">
      {/* Card Stack */}
      <div className="relative flex justify-center mb-8 h-96">
        {profiles.slice(currentCardIndex, currentCardIndex + 3).map((profile, index) => (
          <SparkProfileCard
            key={profile.id}
            profile={profile}
            isTop={index === 0}
            dragState={index === 0 ? dragState : null}
            style={{
              position: 'absolute',
              zIndex: 3 - index,
              transform: `translateY(${index * 8}px) scale(${1 - index * 0.05})`,
              opacity: 1 - index * 0.2
            }}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          />
        ))}
        
        {/* Hint */}
        {showHint && currentCardIndex < profiles.length && (
          <div className="spark-hint-ghost">
            Try swiping <ArrowRight className="inline w-4 h-4 ml-1" />
          </div>
        )}
      </div>
      
      {/* Action Bar */}
      <SparkActionBar onAction={handleAction} />
      
      {/* Helper Text */}
      <p className="text-center text-white/60 text-sm mt-4">
        Swipe right to match • left to pass
      </p>
    </div>
  );

  const renderEnd = () => (
    <div className="text-center px-6">
      <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-4xl mx-auto mb-6">
        ✨
      </div>
      <h2 className="text-2xl font-semibold text-white mb-3">Nice!</h2>
      <p className="text-white/80 mb-2">You've unlocked your first chat.</p>
      
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="flex items-center gap-2 spark-glass px-3 py-2">
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-white text-sm">Day 1</span>
        </div>
        <div className="flex items-center gap-2 spark-glass px-3 py-2">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-white text-sm">+25 XP</span>
        </div>
      </div>
      
      <Button className="spark-mint-cta w-full" onClick={beginMission}>
        Begin First Mission
      </Button>
    </div>
  );

  const renderStartChat = () => (
    <div className="text-center px-6">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-4xl mx-auto mb-6">
        <MessageCircle className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-2xl font-semibold text-white mb-3">Ready to Chat!</h2>
      <p className="text-white/80 mb-8">Your conversation with {matchedProfile?.name} is ready.</p>
      
      <Button className="spark-mint-cta w-full" onClick={beginMission}>
        Begin First Mission
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen spark-background text-white relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-14">
        <div className="text-lg font-semibold">Spark Swipe</div>
        
        {/* Progress Dots */}
        {currentScreen !== 'entry' && (
          <SparkProgressDots currentStep={currentStep} totalSteps={7} />
        )}
        
        <button 
          className="text-white/60 hover:text-white text-sm transition-colors"
          onClick={skipToMain}
        >
          Skip
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-8">
        {currentScreen === 'entry' && renderEntry()}
        {currentScreen === 'deck' && renderDeck()}
        {currentScreen === 'end' && renderEnd()}
        {currentScreen === 'start-chat' && renderStartChat()}
      </div>
      
      {/* Modals and Sheets */}
      <SparkMatchModal 
        isOpen={showMatchModal} 
        onClose={handleMatchModalClose}
        profile={matchedProfile} 
      />
      
      <SparkInfoSheet 
        isOpen={showInfoSheet} 
        onClose={() => setShowInfoSheet(false)}
        profile={profiles[currentCardIndex]} 
      />
    </div>
  );
}