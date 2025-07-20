import { useNavigate } from 'react-router-dom';
import { Heart, Users, Briefcase, Mic, LucideIcon } from 'lucide-react';
import PracticeCard from '@/components/PracticeCard';
import StreakFireButton from '@/components/StreakFireButton';

interface CategoryData {
  id: string;
  title: string;
  icon: LucideIcon;
  theme: 'dating' | 'interview' | 'charisma' | 'speaking';
  xp: number;
  streak: number;
  completedMissions: number;
  totalMissions: number;
  route: string;
}

interface InfoCardData {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

const PracticeHub = () => {
  const navigate = useNavigate();

  const categories: CategoryData[] = [
    {
      id: 'dating',
      title: 'Dating & Romance',
      icon: Heart,
      theme: 'dating',
      xp: 1450,
      streak: 7,
      completedMissions: 12,
      totalMissions: 20,
      route: '/practice-road/dating'
    },
    {
      id: 'interviews',
      title: 'Job Interviews',
      icon: Briefcase,
      theme: 'interview',
      xp: 890,
      streak: 3,
      completedMissions: 5,
      totalMissions: 15,
      route: '/practice-road/interviews'
    },
    {
      id: 'charisma',
      title: 'Charisma & Social Manners',
      icon: Users,
      theme: 'charisma',
      xp: 2100,
      streak: 12,
      completedMissions: 18,
      totalMissions: 25,
      route: '/practice-road/charisma'
    },
    {
      id: 'speaking',
      title: 'Public Speaking',
      icon: Mic,
      theme: 'speaking',
      xp: 650,
      streak: 2,
      completedMissions: 4,
      totalMissions: 12,
      route: '/practice-road/speaking'
    }
  ];

  const infoCards: InfoCardData[] = [
    {
      id: 'insight',
      icon: '💡',
      title: 'AI Insight',
      subtitle: 'Focus on eye contact'
    },
    {
      id: 'progress',
      icon: '📈',
      title: 'Weekly XP',
      subtitle: '2,890 / 3,500'
    },
    {
      id: 'badges',
      icon: '🎖️',
      title: '8 Badges',
      subtitle: 'Achievement hunter'
    },
    {
      id: 'level',
      icon: '🏆',
      title: 'Level 3',
      subtitle: 'Rising Charmer'
    }
  ];

  const handleCategoryClick = (category: CategoryData) => {
    navigate(category.route);
  };

  const handleInfoCardClick = (cardId: string) => {
    if (cardId === 'badges') {
      navigate('/badges');
    } else if (cardId === 'level') {
      navigate('/level-milestones');
    }
  };

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
            Practice Hub
          </h1>
          <p className="text-lg text-muted-foreground font-display font-medium">
            Choose your training world
          </p>
        </div>
      </div>

      {/* Category Cards */}
      <div className="px-4 space-y-5 mb-8">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <PracticeCard
              id={category.id}
              title={category.title}
              icon={category.icon}
              theme={category.theme}
              xp={category.xp}
              streak={category.streak}
              completedMissions={category.completedMissions}
              totalMissions={category.totalMissions}
              onClick={() => handleCategoryClick(category)}
            />
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="px-4">
        <h2 className="text-xl font-display font-bold mb-4 text-foreground">Your Journey</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {infoCards.map((card, index) => {
            const getCardStyle = (cardId: string) => {
              switch (cardId) {
                case 'level':
                  return 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-xl shadow-orange-500/25';
                case 'badges':
                  return 'bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-xl shadow-purple-500/25';
                case 'progress':
                  return 'bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-xl shadow-emerald-500/25';
                case 'insight':
                  return 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/25';
                default:
                  return 'bg-white/10 text-white';
              }
            };

            // Special handling for progress card to show StreakFireButton
            if (card.id === 'progress') {
              return (
                <StreakFireButton
                  key={card.id}
                  streak={7}
                  weeklyXP={2890}
                  currentLevel={3}
                  levelTitle="Rising Charmer"
                />
              );
            }

            return (
              <div 
                key={card.id} 
                className={`
                  flex-shrink-0 animate-scale-in p-4 rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-300
                  ${getCardStyle(card.id)}
                  ${(card.id === 'badges' || card.id === 'level') ? 'cursor-pointer hover:scale-105 hover:shadow-2xl' : 'hover:scale-102'}
                `}
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
                onClick={() => handleInfoCardClick(card.id)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg filter drop-shadow-sm">{card.icon}</span>
                  <span className="text-sm font-bold drop-shadow-sm">{card.title}</span>
                </div>
                <div className="text-xs opacity-90 drop-shadow-sm">
                  {card.subtitle}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivational Footer */}
      <div className="mt-8 px-4">
        <div className="card-warm p-4 text-center animate-scale-in" style={{ animationDelay: '800ms' }}>
          <p className="text-sm font-display font-bold text-gradient-xp">
            "Every conversation is a chance to level up!" 💪
          </p>
        </div>
      </div>
    </div>
  );
};

export default PracticeHub;