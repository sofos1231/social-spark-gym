import { useState } from 'react';
import { 
  Trophy, 
  MessageCircle, 
  Zap, 
  Heart, 
  BarChart3, 
  Brain,
} from 'lucide-react';
import StatTile from '../components/StatTile';
import StatPopup from '../components/StatPopup';

const Stats = () => {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const statTiles = [
    {
      id: 'confidence',
      title: 'Confidence',
      value: '92%',
      icon: Trophy,
      borderColor: 'border-yellow-400/40',
      glowColor: 'rgba(251, 191, 36, 0.4)',
      color: 'from-yellow-400/20 to-yellow-600/20',
      summary: 'Your confidence level has been consistently high this week, with strong vocal projection and assertive language patterns.',
      trend: 'Confidence peaked during afternoon meetings (↑8% vs morning sessions)',
      aiInsight: 'You tend to sound most confident when discussing technical topics. Try bringing this energy to casual conversations too!'
    },
    {
      id: 'filler-words',
      title: 'Filler Words',
      value: '4/min',
      icon: MessageCircle,
      borderColor: 'border-orange-400/40',
      glowColor: 'rgba(251, 146, 60, 0.4)',
      color: 'from-orange-400/20 to-red-600/20',
      summary: 'You say "um" and "like" about 4 times per minute, which is slightly above the ideal range of 2-3 per minute.',
      trend: 'Filler word usage decreased by 15% compared to last week (↓1 filler/min)',
      aiInsight: 'You tend to say "like" 90 times per session. Try pausing instead of filling silence - it actually makes you sound more authoritative!'
    },
    {
      id: 'energy',
      title: 'Energy Level',
      value: 'High',
      icon: Zap,
      borderColor: 'border-teal-400/40',
      glowColor: 'rgba(45, 212, 191, 0.4)',
      color: 'from-teal-400/20 to-teal-600/20',
      summary: 'Your vocal energy and enthusiasm are consistently high, making you engaging and dynamic in conversations.',
      trend: 'Energy levels peak around 2-4 PM, with slight dips in early morning calls',
      aiInsight: 'Your energy is contagious! You bring 25% more enthusiasm to group conversations than one-on-ones.'
    },
    {
      id: 'sentiment',
      title: 'Sentiment',
      value: '85%',
      icon: Heart,
      borderColor: 'border-pink-400/40',
      glowColor: 'rgba(244, 114, 182, 0.4)',
      color: 'from-pink-400/20 to-pink-600/20',
      summary: 'Your overall sentiment is very positive, with encouraging language and supportive tone throughout conversations.',
      trend: 'Positive sentiment increased by 5% this week, especially in team meetings',
      aiInsight: 'You use 40% more positive words during collaborative sessions. Your optimism really shines in teamwork!'
    },
    {
      id: 'xp-progress',
      title: 'XP Progress',
      value: '2,840',
      icon: BarChart3,
      borderColor: 'border-purple-400/40',
      glowColor: 'rgba(147, 51, 234, 0.4)',
      color: 'from-purple-400/20 to-purple-600/20',
      summary: 'You\'ve earned 2,840 XP this week through consistent practice and achieving communication milestones.',
      trend: 'XP gain accelerated by 30% with daily practice sessions (↑650 XP vs last week)',
      aiInsight: 'You\'re on track to reach Level 15 this month! Keep up the daily practice for bonus XP multipliers.'
    },
    {
      id: 'ai-insights',
      title: 'AI Insights',
      value: '12 New',
      icon: Brain,
      borderColor: 'border-gray-400/40',
      glowColor: 'rgba(156, 163, 175, 0.4)',
      color: 'from-gray-400/20 to-gray-600/20',
      summary: 'Our AI has identified 12 new patterns in your communication style, including improved eye contact and humor usage.',
      trend: 'AI detected 3x more humor attempts this week - your wit is developing!',
      aiInsight: 'You make eye contact 60% more during storytelling. This natural instinct is a huge strength - use it more often!'
    }
  ];

  return (
    <div 
      className="min-h-screen pb-20 pt-24 px-4"
      style={{ 
        background: 'linear-gradient(135deg, hsl(222, 84%, 5%) 0%, hsl(220, 30%, 8%) 50%, hsl(222, 84%, 5%) 100%)'
      }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Performance Dashboard
        </h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Your personal communication playground with AI-powered insights
        </p>
      </div>

      {/* 2x3 Stats Grid */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          {statTiles.map((tile, index) => (
            <StatTile
              key={tile.id}
              title={tile.title}
              value={tile.value}
              icon={tile.icon}
              borderColor={tile.borderColor}
              glowColor={tile.glowColor}
              onClick={() => setSelectedStat(tile.id)}
            />
          ))}
        </div>
      </div>

      {/* Popups */}
      {statTiles.map((tile) => (
        <StatPopup
          key={`popup-${tile.id}`}
          isOpen={selectedStat === tile.id}
          onClose={() => setSelectedStat(null)}
          title={tile.title}
          value={tile.value}
          icon={tile.icon}
          summary={tile.summary}
          trend={tile.trend}
          aiInsight={tile.aiInsight}
          color={tile.color}
        />
      ))}
    </div>
  );
};

export default Stats;