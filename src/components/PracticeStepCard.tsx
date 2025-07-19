import { useState, useEffect } from 'react';
import { Lock, CheckCircle2 } from 'lucide-react';

interface PracticeStepCardProps {
  id: string;
  title: string;
  icon: string;
  status: 'locked' | 'unlocked' | 'completed';
  theme: 'dating' | 'interview' | 'charisma' | 'speaking';
  order: number;
  onClick?: () => void;
}

const PracticeStepCard = ({
  id,
  title,
  icon,
  status,
  theme,
  order,
  onClick
}: PracticeStepCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Staggered entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, order * 100);

    return () => clearTimeout(timer);
  }, [order]);

  const getThemeClasses = () => {
    switch (theme) {
      case 'dating':
        return {
          card: 'bg-gradient-to-r from-dating-primary/90 to-dating-secondary/90',
          glow: 'shadow-[0_0_20px_hsl(var(--dating-primary)/0.4)]',
          border: 'border-dating-primary/30'
        };
      case 'interview':
        return {
          card: 'bg-gradient-to-r from-interview-primary/90 to-interview-secondary/90',
          glow: 'shadow-[0_0_20px_hsl(var(--interview-primary)/0.4)]',
          border: 'border-interview-primary/30'
        };
      case 'charisma':
        return {
          card: 'bg-gradient-to-r from-charisma-primary/90 to-charisma-secondary/90',
          glow: 'shadow-[0_0_20px_hsl(var(--charisma-primary)/0.4)]',
          border: 'border-charisma-primary/30'
        };
      case 'speaking':
        return {
          card: 'bg-gradient-to-r from-speaking-primary/90 to-speaking-secondary/90',
          glow: 'shadow-[0_0_20px_hsl(var(--speaking-primary)/0.4)]',
          border: 'border-speaking-primary/30'
        };
      default:
        return {
          card: 'bg-muted',
          glow: '',
          border: 'border-border'
        };
    }
  };

  const themeClasses = getThemeClasses();

  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
        return {
          wrapper: `${themeClasses.card} ${themeClasses.glow} border ${themeClasses.border}`,
          content: 'text-white',
          interactive: true
        };
      case 'unlocked':
        return {
          wrapper: `${themeClasses.card} border ${themeClasses.border} shadow-elevation`,
          content: 'text-white',
          interactive: true
        };
      case 'locked':
        return {
          wrapper: 'bg-muted/50 border border-border/30',
          content: 'text-muted-foreground',
          interactive: false
        };
      default:
        return {
          wrapper: 'bg-card border',
          content: 'text-foreground',
          interactive: false
        };
    }
  };

  const statusStyles = getStatusStyles();

  return (
    <div
      className={`transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      style={{ transitionDelay: `${order * 50}ms` }}
    >
      <div
        className={`relative p-4 rounded-xl backdrop-blur-sm transition-all duration-200 ${
          statusStyles.wrapper
        } ${
          statusStyles.interactive 
            ? 'cursor-pointer hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]' 
            : 'cursor-not-allowed'
        }`}
        onClick={statusStyles.interactive ? onClick : undefined}
      >
        {/* Step number indicator */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border-2 border-current flex items-center justify-center text-xs font-bold">
          {order}
        </div>

        <div className="flex items-center gap-3 ml-4">
          {/* Icon area */}
          <div className={`text-2xl ${statusStyles.content}`}>
            {status === 'completed' ? (
              <CheckCircle2 size={24} className="text-green-300" />
            ) : status === 'locked' ? (
              <Lock size={20} className="text-muted-foreground" />
            ) : (
              <span>{icon}</span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className={`font-display font-semibold text-base ${statusStyles.content}`}>
              {title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                status === 'completed' 
                  ? 'bg-green-500/20 text-green-300' 
                  : status === 'unlocked'
                  ? 'bg-yellow-500/20 text-yellow-300'
                  : 'bg-muted/20 text-muted-foreground'
              }`}>
                {status === 'completed' ? 'Mastered' : status === 'unlocked' ? 'Ready' : 'Locked'}
              </span>
            </div>
          </div>

          {/* Status indicator */}
          {status === 'completed' && (
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse-glow" />
          )}
          {status === 'unlocked' && (
            <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
          )}
        </div>

        {/* Glow effect for completed items */}
        {status === 'completed' && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-glow" />
        )}
      </div>
    </div>
  );
};

export default PracticeStepCard;