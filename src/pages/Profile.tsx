import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Calendar, Settings, Crown, 
  Bell, Shield, HelpCircle, LogOut, Share2, Trophy, Star, Target
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const userInfo = {
    name: "Jordan Smith",
    email: "jordan.smith@email.com",
    level: 3,
    levelTitle: "Rising Charmer",
    xp: 2890,
    joinDate: "October 2024",
    subscription: "Free",
    avatar: "🔥",
    totalBadges: 8,
    weeklyXP: 1240,
    streak: 7
  };

  const achievements = [
    { icon: "🏆", title: "First Steps", description: "Completed your first practice", unlocked: true },
    { icon: "🔥", title: "On Fire", description: "7-day practice streak", unlocked: true },
    { icon: "💬", title: "Smooth Talker", description: "Perfect score in dating scenario", unlocked: true },
    { icon: "🎯", title: "Precision Master", description: "100% accuracy in eye contact drill", unlocked: false },
    { icon: "⚡", title: "Power User", description: "50 hours of practice", unlocked: false },
    { icon: "👑", title: "Social Royalty", description: "Reach Level 10", unlocked: false },
  ];

  const statsCards = [
    { title: "Total XP", value: userInfo.xp.toLocaleString(), icon: "⚡", gradient: "from-yellow-400 to-orange-500" },
    { title: "Badges Earned", value: userInfo.totalBadges, icon: "🎖️", gradient: "from-purple-400 to-pink-500" },
    { title: "Current Streak", value: `${userInfo.streak} days`, icon: "🔥", gradient: "from-orange-400 to-red-500" },
    { title: "This Week", value: `${userInfo.weeklyXP} XP`, icon: "📈", gradient: "from-green-400 to-emerald-500" }
  ];

  return (
    <div 
      className="min-h-screen pb-20 pt-24"
      style={{ 
        background: 'linear-gradient(135deg, #0f1323 0%, #1a1a2e 50%, #16213e 100%)' 
      }}
    >
      {/* Header */}
      <div className="section-mobile">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold mb-3 text-gradient-intense">
            Your Profile
          </h1>
          <p className="text-lg text-muted-foreground font-display font-medium">
            Your social mastery dashboard
          </p>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="px-4 mb-6">
        <div className="card-warm p-6 animate-scale-in relative overflow-hidden">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-warning flex items-center justify-center text-3xl shadow-glow">
              {userInfo.avatar}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-display font-bold text-foreground">{userInfo.name}</h2>
              <p className="text-muted-foreground mb-2">{userInfo.email}</p>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                  Level {userInfo.level}
                </div>
                <span className="text-sm text-muted-foreground">{userInfo.levelTitle}</span>
              </div>
            </div>
            <button className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors">
              <Share2 size={20} className="text-muted-foreground" />
            </button>
          </div>

          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            Edit Profile
          </button>
          
          {/* Decorative glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 mb-6">
        <h3 className="text-xl font-display font-bold mb-4 text-foreground">Your Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          {statsCards.map((stat, index) => (
            <div
              key={stat.title}
              className="card-warm p-4 text-center animate-scale-in relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-xl`} />
              <div className="relative z-10">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-4 mb-6">
        <div className="card-warm p-6 animate-scale-in" style={{animationDelay: '200ms'}}>
          <h3 className="text-xl font-display font-bold mb-4 text-foreground flex items-center gap-2">
            <Trophy className="w-6 h-6 text-warning" />
            Recent Achievements
          </h3>
          
          <div className="space-y-3">
            {achievements.slice(0, 3).map((achievement, index) => (
              <div 
                key={achievement.title}
                className={`
                  flex items-center gap-3 p-3 rounded-xl transition-all duration-300
                  ${achievement.unlocked 
                    ? 'bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50' 
                    : 'bg-muted/30 opacity-60'
                  }
                `}
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground">{achievement.title}</div>
                  <div className="text-sm text-muted-foreground">{achievement.description}</div>
                </div>
                {achievement.unlocked && (
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => navigate('/badges')}
            className="w-full mt-4 bg-muted/50 hover:bg-muted text-foreground py-2 rounded-lg text-sm font-medium transition-colors"
          >
            View All Achievements
          </button>
        </div>
      </div>

      {/* Subscription Status */}
      <div className="px-4 mb-6">
        <div className="card-warm p-4 animate-scale-in relative overflow-hidden" style={{animationDelay: '300ms'}}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                <Crown size={24} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-foreground">Subscription Status</p>
                <p className="text-sm text-muted-foreground">{userInfo.subscription} Plan</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/upgrade')}
              className="bg-gradient-warning text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Upgrade
            </button>
          </div>
        </div>
      </div>

      {/* Quick Settings */}
      <div className="px-4 mb-6">
        <div className="card-warm p-6 animate-scale-in" style={{animationDelay: '400ms'}}>
          <h3 className="text-xl font-display font-bold mb-4 text-foreground">Quick Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Practice Reminders</p>
                  <p className="text-sm text-muted-foreground">Daily motivation</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors text-left">
              <Settings size={20} className="text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium text-foreground">Account Settings</p>
                <p className="text-sm text-muted-foreground">Manage your profile</p>
              </div>
              <span className="text-muted-foreground">›</span>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors text-left">
              <HelpCircle size={20} className="text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium text-foreground">Help & Support</p>
                <p className="text-sm text-muted-foreground">Get assistance</p>
              </div>
              <span className="text-muted-foreground">›</span>
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="px-4 mb-8">
        <div className="card-warm p-6 animate-scale-in" style={{animationDelay: '500ms'}}>
          <h3 className="text-lg font-display font-bold mb-4 text-destructive">Account Management</h3>
          
          <div className="space-y-3">
            <button className="w-full text-left p-3 hover:bg-destructive/10 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Export My Data</p>
                  <p className="text-sm text-muted-foreground">Download your practice history</p>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-3 hover:bg-destructive/10 rounded-xl transition-colors text-destructive">
              <div className="flex items-center gap-3">
                <LogOut size={20} />
                <div>
                  <p className="font-medium">Sign Out</p>
                  <p className="text-sm text-muted-foreground">Sign out of your account</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <div className="px-4 py-8">
        <div className="card-warm p-6 text-center animate-scale-in" style={{animationDelay: '600ms'}}>
          <h3 className="text-lg font-display font-bold text-gradient-xp mb-2">
            Keep growing, Social Warrior! 💪
          </h3>
          <p className="text-sm text-muted-foreground">
            Your confidence journey is just getting started
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;