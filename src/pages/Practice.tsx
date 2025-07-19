import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Eye, ArrowRight } from 'lucide-react';
import SkillNode from '../components/SkillNode';
import ProgressBar from '../components/ProgressBar';

const Practice = () => {
  const navigate = useNavigate();
  const [userLevel] = useState(2);
  const [userXP] = useState(180);
  const [xpToNextLevel] = useState(200);

  const skills = [
    { title: 'Start a Conversation', status: 'completed' as const, icon: '💬' },
    { title: 'Be Playful', status: 'completed' as const, icon: '😄' },
    { title: 'Create Tension', status: 'current' as const, icon: '⚡' },
    { title: 'Be Direct', status: 'locked' as const, icon: '🎯' },
    { title: 'Advanced Charm', status: 'locked' as const, icon: '✨' },
  ];

  const isCloseToLevelUp = (xpToNextLevel - userXP) <= 30;

  return (
    <div className="min-h-screen pb-20" style={{ background: 'var(--gradient-background)' }}>
      {/* Header */}
      <div className="section-mobile">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2 text-gradient-primary">Today's Mission</h1>
          <p className="text-xl font-semibold flex items-center justify-center gap-2">
            <span className="text-2xl">❤️‍🔥</span>
            Flirting with Confidence
            <span className="text-2xl">😎</span>
          </p>
        </div>

        {/* Level Progress */}
        <div className={`card-warm p-5 mb-6 ${isCloseToLevelUp ? 'level-up-glow' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">Level {userLevel}</span>
              <span className="text-2xl animate-pulse">🔥</span>
            </div>
            <span className="xp-badge text-base font-bold">{userXP} XP</span>
          </div>
          <ProgressBar 
            current={userXP} 
            max={xpToNextLevel} 
            label={`Only ${xpToNextLevel - userXP} XP to Level ${userLevel + 1}! 🚀`}
            intense={true}
            size="lg"
          />
          <div className="mt-3 text-center">
            <p className="text-sm font-medium text-gradient-xp">
              {isCloseToLevelUp ? "🎉 You're so close to leveling up!" : `${xpToNextLevel - userXP} XP to Level ${userLevel + 1}! 🚀`}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-8">
          <button 
            onClick={() => navigate('/quick-drill')}
            className="w-full btn-primary flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Zap size={24} />
              <div className="text-left">
                <div className="font-semibold">Quick Drill</div>
                <div className="text-sm opacity-90">30-sec challenge</div>
              </div>
            </div>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button 
            onClick={() => navigate('/shadow-practice')}
            className="w-full btn-warning flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Eye size={24} />
              <div className="text-left">
                <div className="font-semibold">Shadow Practice</div>
                <div className="text-sm opacity-90">Freestyle mode</div>
              </div>
            </div>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Skill Tree */}
      <div className="px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gradient-intense">Your Progress Path</h2>
        
        <div className="flex flex-col items-center space-y-3">
          {skills.map((skill, index) => (
            <SkillNode
              key={skill.title}
              title={skill.title}
              status={skill.status}
              icon={skill.icon}
              isLast={index === skills.length - 1}
              onClick={() => {
                if (skill.status === 'current') {
                  navigate('/quick-drill');
                }
              }}
            />
          ))}
        </div>

        {/* Motivational Text */}
        <div className="mt-8 text-center">
          <div className="card-warm p-4 inline-block">
            <p className="text-base font-semibold text-gradient-xp">
              You're {xpToNextLevel - userXP} XP away from Level {userLevel + 1}! 🚀
            </p>
            <p className="text-sm text-accent mt-1">
              Keep pushing forward, legend! 💪
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;