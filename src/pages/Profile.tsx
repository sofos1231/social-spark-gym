import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Calendar, Settings, Crown, 
  Bell, Shield, HelpCircle, LogOut 
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const userInfo = {
    name: "Jordan Smith",
    email: "jordan.smith@email.com",
    level: 2,
    joinDate: "October 2024",
    subscription: "Free",
    avatar: "🔥"
  };

  const settingsItems = [
    {
      icon: Bell,
      title: "Notifications",
      subtitle: "Practice reminders & achievements",
      action: (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      )
    },
    {
      icon: Shield,
      title: "Privacy Policy",
      subtitle: "How we protect your data",
      action: "chevron"
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      subtitle: "Get assistance",
      action: "chevron"
    },
    {
      icon: Settings,
      title: "Account Settings",
      subtitle: "Manage your account",
      action: "chevron"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="section-mobile">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">
            Manage your SocialGym account 👤
          </p>
        </div>

        {/* User Info Card */}
        <div className="card-elevated p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-2xl">
              {userInfo.avatar}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{userInfo.name}</h2>
              <p className="text-muted-foreground text-sm">{userInfo.email}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="xp-badge text-xs">Level {userInfo.level}</span>
                <span className="text-xs text-muted-foreground">
                  Since {userInfo.joinDate}
                </span>
              </div>
            </div>
          </div>

          <button className="w-full bg-muted text-muted-foreground py-2 rounded-lg text-sm hover:bg-muted/80 transition-colors">
            Edit Profile
          </button>
        </div>

        {/* Subscription Status */}
        <div className="card-elevated p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="text-warning" size={24} />
              <div>
                <p className="font-semibold">Subscription Status</p>
                <p className="text-sm text-muted-foreground">
                  {userInfo.subscription} Plan
                </p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/upgrade')}
              className="btn-warning px-4 py-2 text-sm"
            >
              Upgrade to PRO
            </button>
          </div>
        </div>

        {/* Settings */}
        <div className="card-elevated p-4 mb-6">
          <h3 className="font-semibold mb-4">Settings</h3>
          
          <div className="space-y-1">
            {settingsItems.map((item, index) => {
              const Icon = item.icon;
              
              return (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                >
                  <Icon size={20} className="text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                  </div>
                  <div>
                    {item.action === "chevron" ? (
                      <span className="text-muted-foreground">›</span>
                    ) : (
                      item.action
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Coach Section */}
        <div className="card-elevated p-4 mb-6">
          <h3 className="font-semibold mb-3">AI Coach</h3>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl">🤖</div>
            <div className="flex-1">
              <p className="font-medium">Coach Alex</p>
              <p className="text-sm text-muted-foreground">
                Your supportive confidence trainer
              </p>
            </div>
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">
              Change
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div className="card-elevated p-4 mb-6">
          <h3 className="font-semibold mb-4 text-destructive">Data Management</h3>
          
          <div className="space-y-3">
            <button className="w-full text-left p-3 hover:bg-muted/50 rounded-lg transition-colors">
              <p className="font-medium">Export My Data</p>
              <p className="text-sm text-muted-foreground">Download your practice history</p>
            </button>
            
            <button className="w-full text-left p-3 hover:bg-destructive/10 rounded-lg transition-colors text-destructive">
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">Permanently remove your account</p>
            </button>
          </div>
        </div>

        {/* Sign Out */}
        <button className="w-full flex items-center justify-center gap-2 p-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;