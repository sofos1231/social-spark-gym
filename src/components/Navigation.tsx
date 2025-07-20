import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, BarChart3, User, ShoppingBag } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/', icon: Home, label: 'Practice', emoji: '🏋️' },
    { path: '/stats', icon: BarChart3, label: 'Stats', emoji: '📊' },
    { path: '/shop', icon: ShoppingBag, label: 'Shop', emoji: '💰' },
    { path: '/profile', icon: User, label: 'Profile', emoji: '👤' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl border-t border-white/10">
      <div 
        className="h-20"
        style={{ 
          background: 'linear-gradient(135deg, rgba(15,19,35,0.95) 0%, rgba(26,26,46,0.95) 50%, rgba(22,33,62,0.95) 100%)' 
        }}
      >
        <div className="flex items-center justify-around h-full px-4">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-300 relative
                  ${isActive 
                    ? 'text-white scale-110' 
                    : 'text-white/60 hover:text-white/80 hover:scale-105'
                  }
                `}
              >
                {/* Active glow effect */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-sm" />
                )}
                
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-primary shadow-lg shadow-primary/30' 
                      : 'bg-white/10 hover:bg-white/20'
                    }
                  `}>
                    <Icon size={20} />
                    {isActive && (
                      <div className="absolute -top-1 -right-1 text-lg animate-bounce-subtle">
                        {item.emoji}
                      </div>
                    )}
                  </div>
                  
                  <span className={`
                    text-xs font-medium transition-all duration-300
                    ${isActive ? 'font-bold' : ''}
                  `}>
                    {item.label}
                  </span>
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -bottom-0.5 w-8 h-1 bg-primary rounded-full shadow-lg shadow-primary/50" />
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