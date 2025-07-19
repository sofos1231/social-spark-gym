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

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="section-mobile">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Today's Mission</h1>
          <p className="text-lg text-primary font-semibold">
            Flirting with Confidence 💫
          </p>
        </div>

        {/* Level Progress */}
        <div className="card-elevated p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Level {userLevel}</span>
            <span className="xp-badge">🔥 {userXP} XP</span>
          </div>
          <ProgressBar 
            current={userXP} 
            max={xpToNextLevel} 
            label={`${xpToNextLevel - userXP} XP to Level ${userLevel + 1}`}
          />
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
        <h2 className="text-lg font-semibold mb-4 text-center">Your Progress Path</h2>
        
        <div className="flex flex-col items-center space-y-2">
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
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            You're 20 XP away from Level 3! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default Practice;