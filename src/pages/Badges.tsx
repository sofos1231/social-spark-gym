import { useState } from 'react';
import { Lock, Star, Crown, Trophy, Target, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

interface BadgeData {
  id: string;
  name: string;
  description: string;
  category: 'xp' | 'social' | 'practice' | 'community';
  unlocked: boolean;
  tier?: number;
  maxTier?: number;
  progress?: number;
  maxProgress?: number;
  icon: string;
  reward?: string;
}

const badges: BadgeData[] = [
  // XP & Progression
  { id: 'daily-grinder-1', name: 'Daily Grinder I', description: 'Complete practice 3 days in a row', category: 'xp', unlocked: true, tier: 1, maxTier: 5, icon: '🔥', reward: '+50 XP' },
  { id: 'daily-grinder-2', name: 'Daily Grinder II', description: 'Complete practice 7 days in a row', category: 'xp', unlocked: true, tier: 2, maxTier: 5, icon: '🔥', reward: '+100 XP' },
  { id: 'daily-grinder-3', name: 'Daily Grinder III', description: 'Complete practice 14 days in a row', category: 'xp', unlocked: false, tier: 3, maxTier: 5, icon: '🔥', reward: '+200 XP' },
  { id: 'weekly-warrior-1', name: 'Weekly Warrior I', description: 'Complete 5 practice sessions in a week', category: 'xp', unlocked: true, tier: 1, maxTier: 5, icon: '⚔️', reward: '+75 XP' },
  { id: 'streak-beast', name: 'Streak Beast', description: 'Maintain a 30-day streak', category: 'xp', unlocked: false, progress: 18, maxProgress: 30, icon: '🔥', reward: '+500 XP' },
  
  // Social Skills
  { id: 'smooth-talker', name: 'Smooth Talker', description: 'Score A+ in charisma training', category: 'social', unlocked: true, icon: '💫', reward: 'Unlock smooth voice filter' },
  { id: 'interview-ace', name: 'Interview Ace', description: 'Pass professional interview simulation', category: 'social', unlocked: false, progress: 2, maxProgress: 3, icon: '👔', reward: 'Interview tips guide' },
  { id: 'flirt-pro', name: 'Flirt Like a Pro', description: 'Master romantic conversation skills', category: 'social', unlocked: false, icon: '💕', reward: 'Dating confidence course' },
  { id: 'eye-contact-master', name: 'Eye Contact Master', description: 'Perfect eye contact in 10 sessions', category: 'social', unlocked: true, icon: '👁️', reward: '+25 Confidence XP' },
  
  // Practice & Missions
  { id: 'shadow-master', name: 'Shadow Master', description: 'Complete 10 Shadow Practice sessions', category: 'practice', unlocked: true, icon: '🥷', reward: 'Advanced shadow techniques' },
  { id: 'challenge-crusher', name: 'Challenge Crusher', description: 'Score perfect on 3 consecutive challenges', category: 'practice', unlocked: false, progress: 1, maxProgress: 3, icon: '💪', reward: '+100 XP' },
  { id: 'quick-drill-master', name: 'Quick Drill Master', description: 'Complete 50 quick practice drills', category: 'practice', unlocked: false, progress: 32, maxProgress: 50, icon: '⚡', reward: 'Speed training unlock' },
  
  // Community
  { id: 'social-gym-og', name: 'SocialGym OG', description: 'Early adopter badge', category: 'community', unlocked: true, icon: '🏆', reward: 'Exclusive OG badge' },
  { id: 'player-of-week', name: 'Player of the Week', description: 'Top the weekly leaderboard', category: 'community', unlocked: false, icon: '👑', reward: 'Leaderboard crown' },
  { id: 'community-helper', name: 'Community Helper', description: 'Help 5 other users improve', category: 'community', unlocked: false, progress: 2, maxProgress: 5, icon: '🤝', reward: 'Helper status' },
];

const categories = [
  { id: 'all', name: 'All Badges', icon: Trophy, color: 'text-primary' },
  { id: 'xp', name: 'XP & Progress', icon: Zap, color: 'text-xp' },
  { id: 'social', name: 'Social Skills', icon: Star, color: 'text-success' },
  { id: 'practice', name: 'Practice', icon: Target, color: 'text-warning' },
  { id: 'community', name: 'Community', icon: Crown, color: 'text-accent' },
];

const BadgeCard = ({ badge }: { badge: BadgeData }) => {
  const isLocked = !badge.unlocked;
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'xp': return 'from-purple-400 to-purple-600';
      case 'social': return 'from-emerald-400 to-emerald-600';
      case 'practice': return 'from-orange-400 to-orange-600';
      case 'community': return 'from-blue-400 to-blue-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };
  
  const getCategoryGlow = (category: string) => {
    switch (category) {
      case 'xp': return 'shadow-purple-500/50';
      case 'social': return 'shadow-emerald-500/50';
      case 'practice': return 'shadow-orange-500/50';
      case 'community': return 'shadow-blue-500/50';
      default: return 'shadow-gray-500/50';
    }
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
          isLocked 
            ? 'opacity-60' 
            : `hover:shadow-2xl ${getCategoryGlow(badge.category)}`
        }`}>
          {/* Main badge card with gradient background */}
          <div className={`
            relative p-6 rounded-2xl border-2 transition-all duration-300
            ${isLocked 
              ? 'bg-white/10 border-white/20 backdrop-blur-sm' 
              : `bg-gradient-to-br ${getCategoryColor(badge.category)} border-white/40 backdrop-blur-sm shadow-xl`
            }
          `}>
            
            {/* Glow effect for unlocked badges */}
            {!isLocked && (
              <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(badge.category)} rounded-2xl blur-xl opacity-30 -z-10`} />
            )}
            
            {/* Lock overlay for locked badges */}
            {isLocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl backdrop-blur-sm">
                <div className="bg-white/20 p-3 rounded-full">
                  <Lock size={24} className="text-white" />
                </div>
              </div>
            )}
            
            {/* Badge content */}
            <div className="text-center relative z-10">
              <div className={`text-4xl mb-3 ${isLocked ? 'grayscale' : 'drop-shadow-lg'}`}>
                {badge.icon}
              </div>
              <h3 className="font-bold text-white text-sm mb-2 drop-shadow-md">{badge.name}</h3>
              
              {/* Tier indicators */}
              {badge.tier && badge.maxTier && (
                <div className="flex justify-center gap-1 mb-3">
                  {Array.from({ length: badge.maxTier }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        i < badge.tier 
                          ? 'bg-white shadow-lg' 
                          : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              )}
              
              {/* Progress bar for badges with progress */}
              {badge.progress !== undefined && badge.maxProgress && (
                <div className="mt-3">
                  <div className="bg-white/20 rounded-full h-2 mb-2 overflow-hidden">
                    <div 
                      className="h-full bg-white rounded-full transition-all duration-500 shadow-lg"
                      style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-white/90 font-medium">
                    {badge.progress}/{badge.maxProgress}
                  </p>
                </div>
              )}
              
              {/* Unlocked indicator with sparkle effect */}
              {badge.unlocked && !isLocked && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <span className="text-amber-500 text-sm font-bold">✨</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="max-w-sm mx-auto bg-gradient-to-br from-white to-gray-50 border-2 border-white/50 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex flex-col items-center gap-4">
              <div className={`
                text-5xl p-4 rounded-full transition-all duration-300
                ${isLocked 
                  ? 'grayscale bg-gray-100' 
                  : `bg-gradient-to-br ${getCategoryColor(badge.category)} shadow-xl`
                }
              `}>
                {badge.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{badge.name}</h2>
                <Badge 
                  variant={isLocked ? 'outline' : 'default'} 
                  className={`${!isLocked ? `bg-gradient-to-r ${getCategoryColor(badge.category)} text-white border-none shadow-lg` : ''}`}
                >
                  {isLocked ? 'Locked' : 'Unlocked'}
                </Badge>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-2 text-gray-800">Description</h3>
            <p className="text-gray-600">{badge.description}</p>
          </div>
          
          {/* Tier progression */}
          {badge.tier && badge.maxTier && (
            <div>
              <h3 className="font-bold mb-3 text-gray-800">Tier Progress</h3>
              <div className="flex justify-center gap-3">
                {Array.from({ length: badge.maxTier }, (_, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full border-3 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      i < badge.tier 
                        ? `bg-gradient-to-br ${getCategoryColor(badge.category)} border-white text-white shadow-lg` 
                        : 'border-gray-300 text-gray-400 bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Current progress */}
          {badge.progress !== undefined && badge.maxProgress && (
            <div>
              <h3 className="font-bold mb-3 text-gray-800">Progress</h3>
              <div className="bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${getCategoryColor(badge.category)} rounded-full transition-all duration-500 shadow-inner`}
                  style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                />
              </div>
              <p className="text-center text-sm text-gray-600 font-medium">
                {badge.progress} / {badge.maxProgress}
              </p>
            </div>
          )}
          
          {/* Reward */}
          {badge.reward && (
            <div>
              <h3 className="font-bold mb-2 text-gray-800">Reward</h3>
              <div className={`bg-gradient-to-r ${getCategoryColor(badge.category)} p-4 rounded-xl shadow-lg`}>
                <p className="text-sm font-medium text-white">{badge.reward}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Badges = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredBadges = selectedCategory === 'all' 
    ? badges 
    : badges.filter(badge => badge.category === selectedCategory);
  
  const unlockedCount = badges.filter(badge => badge.unlocked).length;
  const totalCount = badges.length;

  return (
    <div 
      className="min-h-screen pb-20 pt-24"
      style={{ 
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 25%, #eab308 50%, #f59e0b 75%, #fbbf24 100%)'
      }}
    >
      <div className="section-mobile">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-display font-bold mb-3 text-white drop-shadow-lg">
            Badges
          </h1>
          <p className="text-white/90 mb-4 font-display font-medium">
            Track your milestones and mastery 🏆
          </p>
          <div className="bg-white/20 backdrop-blur-sm p-3 inline-block rounded-lg border border-white/30">
            <span className="text-sm font-semibold text-white">
              {unlockedCount}/{totalCount} badges unlocked
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    isSelected 
                      ? 'bg-white text-amber-600 shadow-lg' 
                      : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredBadges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>

        {/* Motivational Footer */}
        <div className="mt-8 text-center">
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg border border-white/30">
            <h3 className="font-bold mb-2 text-white">Keep Growing! 🌱</h3>
            <p className="text-white/90 text-sm">
              Each badge represents a step forward in your social confidence journey. 
              What will you unlock next?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Badges;