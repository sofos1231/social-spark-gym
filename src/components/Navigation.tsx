import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, BarChart3, User, ShoppingBag, Award } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/', icon: Home, label: 'Practice', emoji: '🏋️' },
    { path: '/stats', icon: BarChart3, label: 'Stats', emoji: '📊' },
    { path: '/badges', icon: Award, label: 'Badges', emoji: '🏆' },
    { path: '/shop', icon: ShoppingBag, label: 'Shop', emoji: '💰' },
    { path: '/profile', icon: User, label: 'Profile', emoji: '👤' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 backdrop-blur-lg">
      <div className="container-mobile">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'text-primary font-semibold scale-105' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <div className="relative">
                  <Icon size={20} />
                  {isActive && (
                    <div className="absolute -top-1 -right-1 text-xs">
                      {item.emoji}
                    </div>
                  )}
                </div>
                <span className="text-xs">{item.label}</span>
                {isActive && (
                  <div className="absolute -bottom-0.5 w-6 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;