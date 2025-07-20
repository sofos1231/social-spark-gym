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
      subtitle: ''
    },
    {
      id: 'progress',
      icon: '📈',
      title: 'Weekly XP',
      subtitle: ''
    },
    {
      id: 'badges',
      icon: '🎖️',
      title: '8 Badges',
      subtitle: ''
    },
    {
      id: 'level',
      icon: '🏆',
      title: 'Level 3',
      subtitle: ''
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
      style={{ background: 'var(--gradient-background)' }}
    >
      {/* Header */}
      <div className="section-container">
        <div className="text-center mb-8">
          <h1 className="heading-hero mb-3">
            Practice Hub
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Choose your training world
          </p>
        </div>
      </div>

      {/* Category Cards */}
      <div className="section-container-sm">
        <div className="space-y-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 120}ms` }}
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
      </div>

      {/* Stats Section */}
      <div className="section-container-sm">
        <h2 className="heading-section">Your Journey</h2>
        <div className="grid grid-cols-4 gap-4">
          {infoCards.map((card, index) => {
            const getCardStyle = (cardId: string) => {
              switch (cardId) {
                case 'level':
                  return 'bg-gradient-primary text-primary-foreground shadow-glow-primary/50';
                case 'badges':
                  return 'bg-gradient-secondary text-secondary-foreground shadow-glow-secondary/50';
                case 'progress':
                  return 'bg-gradient-success text-success-foreground shadow-glow-success/50';
                case 'insight':
                  return 'bg-card text-card-foreground shadow-elevation border border-border';
                default:
                  return 'bg-card text-card-foreground shadow-card';
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
                  animate-scale-in p-4 rounded-xl transition-all duration-200 h-20 w-full
                  ${getCardStyle(card.id)}
                  ${(card.id === 'badges' || card.id === 'level') ? 'cursor-pointer hover:scale-105 hover:shadow-elevation' : 'hover:scale-102'}
                `}
                style={{ animationDelay: `${(index + 4) * 120}ms` }}
                onClick={() => handleInfoCardClick(card.id)}
              >
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <span className="text-lg mb-1">{card.icon}</span>
                  <span className="text-sm font-semibold">{card.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivational Footer */}
      <div className="section-container-sm">
        <div className="card-secondary text-center animate-scale-in" style={{ animationDelay: '800ms' }}>
          <p className="text-sm font-semibold">
            <span className="text-gradient-xp">"Every conversation is a chance to level up!"</span> 💪
          </p>
        </div>
      </div>
    </div>
  );
};

export default PracticeHub;