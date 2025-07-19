import { useState } from 'react';
import { TrendingUp, Flame, Clock, Trophy, Zap } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';

const Stats = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month'>('week');

  const stats = {
    level: 2,
    xp: 180,
    xpToNext: 200,
    streak: 7,
    todayTime: 25,
    weeklyXP: [10, 15, 20, 8, 25, 30, 12],
    insights: [
      "You used humor effectively in 3 conversations",
      "Your confidence level increased by 15% this week",
      "Best practice time: 2:30 PM"
    ]
  };

  const leaderboard = [
    { name: "Alex M.", xp: 2847, avatar: "🦸‍♂️" },
    { name: "Sarah K.", xp: 2156, avatar: "🌟" },
    { name: "You", xp: 1890, avatar: "🔥" },
    { name: "Mike T.", xp: 1654, avatar: "⚡" },
    { name: "Emma L.", xp: 1432, avatar: "💫" }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="section-mobile">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Your Progress</h1>
          <p className="text-muted-foreground">
            Track your social skills journey 📊
          </p>
        </div>

        {/* Level & XP */}
        <div className="card-glow p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Level {stats.level}</h2>
              <p className="text-muted-foreground">Social Apprentice</p>
            </div>
            <div className="text-right">
              <div className="xp-badge text-lg">🔥 {stats.xp} XP</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.xpToNext - stats.xp} to Level {stats.level + 1}
              </p>
            </div>
          </div>
          
          <ProgressBar 
            current={stats.xp} 
            max={stats.xpToNext} 
            showNumbers={false}
            size="lg"
          />
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="card-elevated p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Flame className="text-warning mr-1" size={20} />
              <span className="text-2xl font-bold">{stats.streak}</span>
            </div>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </div>

          <div className="card-elevated p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="text-primary mr-1" size={20} />
              <span className="text-2xl font-bold">{stats.todayTime}m</span>
            </div>
            <p className="text-sm text-muted-foreground">Today</p>
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <div className="card-elevated p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <TrendingUp size={20} className="text-success" />
              Weekly XP
            </h3>
            
            <div className="flex gap-1 p-1 bg-muted rounded-lg">
              <button
                onClick={() => setTimeframe('week')}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  timeframe === 'week' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeframe('month')}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  timeframe === 'month' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                }`}
              >
                Month
              </button>
            </div>
          </div>

          <div className="flex items-end gap-2 h-24">
            {stats.weeklyXP.map((xp, index) => {
              const height = (xp / Math.max(...stats.weeklyXP)) * 100;
              const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-primary rounded-t transition-all duration-500 hover:opacity-80"
                    style={{ height: `${height}%` }}
                  />
                  <div className="text-xs text-muted-foreground mt-2">
                    {days[index]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Insights */}
        <div className="card-elevated p-4 mb-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Zap size={20} className="text-accent" />
            Latest Insights
          </h3>
          
          <div className="space-y-3">
            {stats.insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <span className="text-lg">🧠</span>
                <p className="text-sm text-foreground flex-1">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mini Leaderboard */}
        <div className="card-elevated p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Trophy size={20} className="text-warning" />
            Leaderboard
          </h3>
          
          <div className="space-y-2">
            {leaderboard.slice(0, 5).map((user, index) => (
              <div 
                key={index} 
                className={`
                  flex items-center gap-3 p-2 rounded-lg transition-colors
                  ${user.name === 'You' ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'}
                `}
              >
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm font-medium w-6 text-center">
                    #{index + 1}
                  </span>
                  <span className="text-lg">{user.avatar}</span>
                  <span className={`text-sm ${user.name === 'You' ? 'font-semibold text-primary' : ''}`}>
                    {user.name}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {user.xp.toLocaleString()} XP
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-success/10 rounded-lg text-center">
            <p className="text-sm text-success-foreground">
              🎉 You're progressing faster than 85% of users!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;