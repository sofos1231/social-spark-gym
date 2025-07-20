import { useState } from 'react';
import { TrendingUp, Flame, Clock, Trophy, Zap, Target, Brain, Heart, Sparkles } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';

const Stats = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month'>('week');

  const stats = {
    level: 3,
    levelTitle: "Rising Charmer",
    xp: 2890,
    xpToNext: 3500,
    streak: 7,
    todayTime: 45,
    weeklyXP: [220, 340, 180, 420, 310, 480, 290],
    weeklySocialScore: [72, 76, 68, 81, 74, 79, 77],
    totalSessions: 23,
    insights: [
      "Your confidence level peaked during afternoon sessions",
      "Humor usage improved by 25% this week",
      "Best performance: Dating scenarios (+40% success rate)"
    ]
  };

  const traits = [
    { name: "Confidence", value: 78, color: "from-orange-400 to-red-500", icon: "💪" },
    { name: "Humor", value: 65, color: "from-yellow-400 to-orange-500", icon: "😄" },
    { name: "Eye Contact", value: 82, color: "from-blue-400 to-indigo-500", icon: "👁️" },
    { name: "Body Language", value: 71, color: "from-green-400 to-emerald-500", icon: "🕺" },
    { name: "Voice Tone", value: 88, color: "from-purple-400 to-pink-500", icon: "🎵" },
    { name: "Emotional Intelligence", value: 74, color: "from-pink-400 to-rose-500", icon: "❤️" }
  ];

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxScore = Math.max(...stats.weeklySocialScore);
  const currentSocialScore = Math.round(traits.reduce((sum, trait) => sum + trait.value, 0) / traits.length);

  return (
    <div 
      className="min-h-screen pb-20"
      style={{ 
        background: 'linear-gradient(135deg, #0f1323 0%, #1a1a2e 50%, #16213e 100%)' 
      }}
    >
      {/* Header */}
      <div className="section-mobile">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold mb-3 text-gradient-intense">
            Your Progress
          </h1>
          <p className="text-lg text-muted-foreground font-display font-medium">
            Track your transformation journey
          </p>
        </div>
      </div>

      {/* Level & XP Banner */}
      <div className="px-4 mb-6">
        <div className="card-warm p-6 relative overflow-hidden animate-scale-in">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-warning flex items-center justify-center text-3xl font-bold text-white shadow-glow">
              {stats.level}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-display font-bold text-foreground mb-1">
                Level {stats.level}
              </h2>
              <p className="text-muted-foreground text-lg">{stats.levelTitle}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-muted-foreground">{stats.xp} XP</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{stats.xpToNext - stats.xp} to next level</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Level Progress</span>
              <span className="text-foreground font-medium">{Math.round((stats.xp / stats.xpToNext) * 100)}%</span>
            </div>
            <ProgressBar 
              current={stats.xp}
              max={stats.xpToNext}
              showNumbers={false}
              className="h-3"
              intense={true}
            />
          </div>
          
          {/* Decorative glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-warning/20 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Streak Card */}
          <div className="card-warm p-4 text-center animate-scale-in relative overflow-hidden" style={{animationDelay: '100ms'}}>
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-2xl font-bold text-gradient-xp mb-1">{stats.streak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl" />
          </div>

          {/* Today's Time */}
          <div className="card-warm p-4 text-center animate-scale-in relative overflow-hidden" style={{animationDelay: '200ms'}}>
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-2xl font-bold text-gradient-primary mb-1">{stats.todayTime}m</div>
            <div className="text-sm text-muted-foreground">Today's Practice</div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl" />
          </div>

          {/* Sessions */}
          <div className="card-warm p-4 text-center animate-scale-in relative overflow-hidden" style={{animationDelay: '300ms'}}>
            <div className="text-3xl mb-2">📚</div>
            <div className="text-2xl font-bold text-gradient-success mb-1">{stats.totalSessions}</div>
            <div className="text-sm text-muted-foreground">Total Sessions</div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl" />
          </div>

          {/* Weekly XP */}
          <div className="card-warm p-4 text-center animate-scale-in relative overflow-hidden" style={{animationDelay: '400ms'}}>
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-bold text-gradient-accent mb-1">{stats.weeklyXP.reduce((a, b) => a + b, 0)}</div>
            <div className="text-sm text-muted-foreground">Weekly XP</div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Social Score Chart */}
      <div className="px-4 mb-6">
        <div className="card-warm p-6 animate-scale-in" style={{animationDelay: '500ms'}}>
          <h3 className="text-xl font-display font-bold mb-2 text-foreground">Social Score Tracker</h3>
          <p className="text-sm text-muted-foreground mb-4">Combined score from all communication traits</p>
          
          <div className="flex items-center justify-center mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient-primary mb-1">{currentSocialScore}</div>
              <div className="text-sm text-muted-foreground">Current Score</div>
            </div>
          </div>
          
          <div className="flex items-end justify-between h-32 mb-4">
            {stats.weeklySocialScore.map((score, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-8 bg-gradient-primary rounded-t-lg transition-all duration-500 animate-scale-in relative overflow-hidden"
                  style={{ 
                    height: `${(score / maxScore) * 100}%`,
                    minHeight: '8px',
                    animationDelay: `${600 + index * 100}ms`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                </div>
                <div className="text-xs text-muted-foreground mt-2 font-medium">
                  {weekDays[index]}
                </div>
                <div className="text-xs text-foreground font-bold">
                  {score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Communication Traits */}
      <div className="px-4 mb-6">
        <div className="card-warm p-6 animate-scale-in" style={{animationDelay: '600ms'}}>
          <h3 className="text-xl font-display font-bold mb-4 text-foreground flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            Communication Traits
          </h3>
          
          <div className="space-y-4">
            {traits.map((trait, index) => (
              <div key={trait.name} className="space-y-2 animate-slide-up" style={{animationDelay: `${700 + index * 100}ms`}}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{trait.icon}</span>
                    <span className="font-medium text-foreground">{trait.name}</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">{trait.value}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${trait.color} transition-all duration-1000 ease-out relative overflow-hidden`}
                    style={{ width: `${trait.value}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="px-4 mb-6">
        <div className="card-warm p-6 animate-scale-in" style={{animationDelay: '700ms'}}>
          <h3 className="text-xl font-display font-bold mb-4 text-foreground flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-warning" />
            AI Insights
          </h3>
          
          <div className="space-y-3">
            {stats.insights.map((insight, index) => (
              <div 
                key={index} 
                className="p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 animate-slide-up"
                style={{animationDelay: `${800 + index * 100}ms`}}
              >
                <p className="text-sm text-foreground leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Motivational Footer */}
      <div className="px-4 py-8">
        <div className="card-warm p-6 text-center animate-scale-in" style={{animationDelay: '900ms'}}>
          <h3 className="text-lg font-display font-bold text-gradient-xp mb-2">
            You're building incredible momentum! 🚀
          </h3>
          <p className="text-sm text-muted-foreground">
            Keep practicing to unlock your full social potential
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;