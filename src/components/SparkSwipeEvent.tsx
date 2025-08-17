import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Zap, ArrowRight, Calendar, Users, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SparkSwipeEventProps {
  className?: string;
}

const SparkSwipeEvent: React.FC<SparkSwipeEventProps> = ({ className }) => {
  const navigate = useNavigate();
  const [isGlowing, setIsGlowing] = useState(false);
  const [participantCount, setParticipantCount] = useState(1247);

  // Animate glow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 2000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Simulate increasing participant count
  useEffect(() => {
    const interval = setInterval(() => {
      setParticipantCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleJoinEvent = () => {
    navigate('/spark-swipe');
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Special Event Card */}
      <div className={cn(
        "spark-glass relative overflow-hidden transition-all duration-500",
        isGlowing && "animate-pulse-glow"
      )}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 30% 20%, rgba(255, 91, 138, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(156, 232, 218, 0.3) 0%, transparent 50%)'
          }}></div>
        </div>

        {/* Header with Badge */}
        <div className="relative p-6">
          {/* Special Event Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">
                Live Event
              </span>
            </div>
            <div className="flex items-center gap-1 text-white/60 text-sm">
              <Calendar className="w-4 h-4" />
              <span>Limited Time</span>
            </div>
          </div>

          {/* Event Title */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
              🎯 Spark Swipe Challenge
            </h2>
            <p className="text-white/80 text-base leading-relaxed">
              Practice social skills through Tinder-style interactions. Swipe, match, and level up your conversation game!
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Participants */}
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm font-medium">
                  {participantCount.toLocaleString()} joined
                </span>
              </div>
              
              {/* XP Reward */}
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-white text-sm font-medium">
                  +50 XP Bonus
                </span>
              </div>
            </div>

            {/* Trending Indicator */}
            <div className="flex items-center gap-1 bg-red-500/20 px-3 py-1 rounded-full">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <span className="text-red-400 text-xs font-semibold">TRENDING</span>
            </div>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-mint-400"></div>
              <span className="text-white/70 text-sm">Match & Practice</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-mint-400"></div>
              <span className="text-white/70 text-sm">Real-time Feedback</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-mint-400"></div>
              <span className="text-white/70 text-sm">Level Up System</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-mint-400"></div>
              <span className="text-white/70 text-sm">Social Mastery</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={handleJoinEvent}
            className="spark-mint-cta w-full group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Join Spark Swipe
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            
            {/* Button shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </Button>

          {/* Quick Action */}
          <div className="mt-3 text-center">
            <button 
              className="text-white/60 hover:text-white/80 text-sm transition-colors flex items-center justify-center gap-1 mx-auto group"
              onClick={() => navigate('/quick-drill')}
            >
              <Zap className="w-4 h-4" />
              Quick 30s Preview
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SparkSwipeEvent;